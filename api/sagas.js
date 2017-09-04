import { takeEvery, delay, takeLatest } from 'redux-saga'
import { put, call, select, race } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'

import { requestPending, requestSuccess, requestError, requestCacheUsed, stopPollApiRequest } from './actions'
import { REQUEST, POLL_REQUEST, FETCH_TIMEOUT, REFRESH_JWT } from './constants'
import { selectPollingInterval, selectTimeSinceLastFetch, selectResponse } from './selectors'
import { apifetch, formatUrl } from './utils'
import { deserializeEJSON } from './eJSON'
import { logout, setUserGroups } from '../auth/actions'
import authEndpoints from '../auth/endpoints'

export default function configureApiSagas({ Sentry, jwtStore, baseURL, endpoints }) {
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
  function* fetchSaga(args) {
    const { response, timeout } = yield race({
      response: call(apifetch, { ...args, baseURL }),
      timeout: call(delay, FETCH_TIMEOUT),
    })
    if (timeout) throw new Error('API request timed out')
    return response
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
    if (config.cache) {
      const cacheAge = yield select(selectTimeSinceLastFetch, { endpoint, params })
      if (cacheAge && cacheAge < config.cache) {
        yield put(requestCacheUsed(endpoint, params))
        return yield select(selectResponse, { endpoint, params })
      }
    }
    const url = yield call(formatUrl, config.url, params)
    yield put(requestPending(endpoint, params))

    let method
    if (!config.token) method = insecureFetch
    else if (config.logout !== false) method = secureApiSaga
    else method = secureFetch

    try {
      const response = yield call(
        method,
        { url, method: config.method, payload },
      )
      yield put(requestSuccess(endpoint, params, response))
      return response
    }
    catch (e) {
      yield put(requestError(endpoint, params, e))
      // No action type indicates saga was called directly so errors should be handled
      // by caller. Otherwise errors should be swallowed (after dispatching REQUEST_ERROR)
      if (!type || type === POLL_REQUEST) throw e
    }
  }

  function* apiPoll(action) {
    const { endpoint, params } = action.meta
    let interval = action.meta.interval
    while (interval) {
      try {
        yield call(apiRequest, action)
        yield call(delay, interval)
        interval = yield select(selectPollingInterval, { endpoint, params })
      }
      catch (e) {
        yield put(stopPollApiRequest(endpoint, params))
        interval = false
        Sentry.captureMessage(`Polling endpoint, ${action.meta.endpoint}, returned an error. Polling will be stopped.`)
      }
    }
  }

  function* watcher() {
    yield [
      takeEvery(POLL_REQUEST, apiPoll),
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
