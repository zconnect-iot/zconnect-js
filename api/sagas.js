import { takeEvery, delay, takeLatest } from 'redux-saga'
import { put, call, select, race, cancel, fork } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import { fromJS, Map } from 'immutable'

import { requestPending, requestSuccess, requestError, requestCacheUsed, setPollInterval } from './actions'
import { REQUEST, POLL_REQUEST, REFRESH_JWT } from './constants'
import { selectPollingInterval, selectTimeSinceLastFetch, selectResponse, selectPending } from './selectors'
import { apifetch, formatUrl } from './utils'
import { deserializeEJSON } from './eJSON'
import { logout, setUserGroups } from '../auth/actions'
import authEndpoints from '../auth/endpoints'

export default function configureApiSagas({ Sentry, jwtStore, baseURL, endpoints, defaultTimeout = 0 }) {
  function* refreshJWT() {
    const url = 'api/v1/users/refresh_token'
    const method = 'GET'
    try {
      const oldToken = yield call(jwtStore.get)
      const response = yield call(secureFetch, { url, method })

      const email = oldToken.username

      // Securely store login token
      yield call(jwtStore.set, email, response.token)

      const JWTokenDecoded = deserializeEJSON(jwtDecode(response.token))
      const userGroups = JWTokenDecoded.aud
      const userID = JWTokenDecoded.oid.oid

      // Log the user in with Sentry too
      Sentry.setUserContext({ email, userID, username: '', extra: {} })

      yield put(setUserGroups(userGroups))
    }
    catch (error) {
      yield call(Sentry.captureException, error)
    }
  }

  // Main fetch saga (used by all following methods) wraps apifetch in race timeout
  function* fetchSaga({ timeout, ...args }) {
    if (timeout === 0 ||
      (!timeout && defaultTimeout === 0)) return yield call(apifetch, { ...args, baseURL })
    const result = yield race({
      response: call(apifetch, { ...args, baseURL }),
      timeout: call(delay, timeout || defaultTimeout),
    })
    if (result.timeout) throw new Error('API request timed out')
    return result.response
  }

  // Fetch methods - 3 options: Token + Logout if 401/403, Token + No logout, No token
  function* secureFetch(args) {
    const token = yield call(jwtStore.get)
    return yield call(fetchSaga, { ...args, token: token.password })
  }

  function* insecureFetch(args) {
    return yield call(fetchSaga, args)
  }

  function* secureApiSaga(args) {
    let token = ''
    try {
      token = yield call(jwtStore.get)
       // if token undefined next line will be a reference error
      return yield call(secureFetch, args)
    }
    catch (error) {
      const status = error.response && error.response.status
      if (!token || status === 401 || status === 403) {
        try {  // First try to get a new token and reperform request.
          yield call(refreshJWT)
          return yield call(secureFetch, args)
        }
        catch (jwterr) {
          Sentry.captureMessage('Could not perform request after re-fetching JWT')
          yield put(logout())
        }
      }
      throw error
    }
  }

  // If param is a selector yield select(it) otherwise return the supplied value
  function* processParams(params = {}) {
    const selectors = Object.entries(params).filter(param => typeof param[1] === 'function')
    const p = { ...params }
    for (let i = 0; i < selectors.length; i += 1) {
      p[selectors[i][0]] = yield select(selectors[i][1])
    }
    return p
  }

  function* processPayload(payload = {}) {
    // TODO: Allow processing of nested selectors (currently only handles selectors at top level)
    const selectors = Object.entries(payload).filter(entry => typeof entry[1] === 'function')
    const p = { ...payload }
    for (let i = 0; i < selectors.length; i += 1) {
      p[selectors[i][0]] = yield select(selectors[i][1])
    }
    return p
  }

  function* apiRequest(action) {
    const { meta, type } = action
    const { endpoint } = meta
    const config = authEndpoints[endpoint] || endpoints[endpoint]
    if (!config) throw new Error(`No endpoint configuration found for: ${endpoint}`)
    const params = yield call(processParams, meta.params)
    const payload = yield call(processPayload, action.payload)
    const { storeKey } = config
    const requestKey = { endpoint, params, storeKey }
    if (config.cache) {
      const cacheAge = yield select(selectTimeSinceLastFetch, requestKey)
      if (cacheAge && cacheAge < config.cache) {
        yield put(requestCacheUsed(endpoint, params))
        return yield select(selectResponse, requestKey)
      }
    }
    const url = yield call(formatUrl, config.url, params)
    yield put(requestPending(endpoint, params, storeKey))

    let method
    if (!config.token) method = insecureFetch
    else if (config.logout !== false) method = secureApiSaga
    else method = secureFetch

    try {
      let response = yield call(
        method,
        { url, method: config.method, payload, timeout: config.timeout },
      )
      if (config.storeMethod) {
        response = config.storeMethod(
          yield select(selectResponse, requestKey),
          fromJS(response),
          params,
        )
      }
      yield put(requestSuccess(endpoint, params, response, config.storeKey))
      return response
    }
    catch (e) {
      yield put(requestError(endpoint, params, e, storeKey))
      // No action type indicates saga was called directly so errors should be handled
      // by caller. Otherwise errors should be swallowed (after dispatching REQUEST_ERROR)
      if (!type || type === POLL_REQUEST) throw e
    }
  }

  function* apiPoll(action) {
    const { endpoint, params, storeKey } = action.meta
    const requestKey = { endpoint, params, storeKey }
    let interval = action.meta.interval
    yield put(setPollInterval(endpoint, params, interval, storeKey))
    while (interval) {
      try {
        const isPending = yield select(selectPending, requestKey)
        if (!isPending) yield call(apiRequest, action)
        yield call(delay, interval)
        interval = yield select(selectPollingInterval, requestKey)
      }
      catch (e) {
        console.log(e);
        interval = false
        yield put(setPollInterval(endpoint, params, interval, storeKey))
        Sentry.captureMessage(`Polling endpoint, ${action.meta.endpoint}, returned an error. Polling will be stopped.`)
      }
    }
  }

  /*
    To mirror the reducer in that, for a given request key ({ endpoint, params } or storeKey)
    there is only one api state, response, error and polling state associated with that request
    The apiPollRegister ensures there is only one polling saga for a given request by cancelling
    any exisiting tasks with the same key
  */
  let apiPollRegister = Map()

  function* spawnApiPoll(action) {
    const { endpoint, params } = action.meta
    const config = endpoints[endpoint] || {}
    const { storeKey } = config
    const requestKey = storeKey || { endpoint, params }
    if (apiPollRegister.get(requestKey)) yield cancel(apiPollRegister.get(requestKey))
    apiPollRegister = apiPollRegister.set(
      requestKey,
      yield fork(apiPoll, { ...action, meta: { ...action.meta, storeKey } }),
    )
  }

  function* watcher() {
    yield [
      takeEvery(POLL_REQUEST, spawnApiPoll),
      takeEvery(REQUEST, apiRequest),
      takeLatest(REFRESH_JWT, refreshJWT),
    ]
  }

  return {
    secureApiSaga,
    fetchSaga,
    secureFetch,
    refreshJWT,
    insecureFetch,
    processParams, // Only exposed for testing
    processPayload,
    apiRequest,
    apiPoll,
    watcher,
  }
}
