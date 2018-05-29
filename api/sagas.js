import { delay } from 'redux-saga'
import { put, all, call, select, race, cancel, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import { fromJS, Map } from 'immutable'

import { requestPending, requestSuccess, requestError, requestCacheUsed, setPollInterval, batchRequestSuccess, batchRequestFailed } from './actions'
import { BATCH_REQUEST, REQUEST, POLL_REQUEST, REFRESH_JWT } from './constants'
import { selectPollingInterval, selectTimeSinceLastFetch, selectResponse, selectPending } from './selectors'
import { apifetch, formatUrl } from './utils'
import { logout } from '../auth/actions'
import authEndpoints from '../auth/endpoints'
import { extractJWTAndSaveInfo } from '../auth/utils'


export default function configureApiSagas({
  Sentry, jwtStore, baseURL, endpoints, defaultParams = {}, defaultTimeout = 0,
}) {
  function* refreshJWT() {
    const url = 'api/v3/auth/refresh_token/'
    const method = 'POST'
    try {
      const oldToken = yield call(jwtStore.get)
      const payload = {
        token: oldToken.password,
      }
      const response = yield call(secureFetch, { url, method, payload })

      const email = oldToken.username

      yield call(extractJWTAndSaveInfo, Sentry, jwtStore, email, response)
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
      if (!token || status === 401 || status === 403)
        try { // First try to get a new token and reperform request.
          yield call(refreshJWT)
          return yield call(secureFetch, args)
        }
        catch (jwterr) {
          Sentry.captureMessage('Could not perform request after re-fetching JWT')
          yield put(logout())
        }

      throw error
    }
  }

  // If param is a selector yield select(it) otherwise return the supplied value
  function* processParams(params = {}) {
    const selectors = Object.entries(params).filter(param => typeof param[1] === 'function')
    const p = { ...params }
    for (let i = 0; i < selectors.length; i += 1)
      p[selectors[i][0]] = yield select(selectors[i][1])

    return p
  }

  function* processPayload(payload = {}) {
    // TODO: Allow processing of nested selectors (currently only handles selectors at top level)
    const selectors = Object.entries(payload).filter(entry => typeof entry[1] === 'function')
    const p = { ...payload }
    for (let i = 0; i < selectors.length; i += 1)
      p[selectors[i][0]] = yield select(selectors[i][1])

    return p
  }

  function* apiRequest(action) {
    const { meta, type } = action
    const { endpoint } = meta
    const config = authEndpoints[endpoint] || endpoints[endpoint]
    if (!config) throw new Error(`No endpoint configuration found for: ${endpoint}`)
    const params = yield call(processParams, meta.params)
    const defaults = yield call(processParams, defaultParams)
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
    const url = yield call(formatUrl, config.url, params, defaults)
    yield put(requestPending(endpoint, params, storeKey))

    let method
    if (!config.token) method = insecureFetch
    else if (config.logout !== false) method = secureApiSaga
    else method = secureFetch

    try {
      let response = yield call(
        method,
        {
          url, method: config.method, payload, timeout: config.timeout,
        },
      )
      if (config.storeMethod)
        response = config.storeMethod(
          yield select(selectResponse, requestKey),
          fromJS(response),
          params,
        )

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
    while (interval)
      try {
        const isPending = yield select(selectPending, requestKey)
        if (!isPending) yield call(apiRequest, action)
        yield call(delay, interval)
        interval = yield select(selectPollingInterval, requestKey)
      }
      catch (e) {
        interval = false
        yield put(setPollInterval(endpoint, params, interval, storeKey))
        Sentry.captureMessage(`Polling endpoint, ${action.meta.endpoint}, returned an error. Polling will be stopped.`)
      }
  }

  function* apiBatchRequest(action) {
    /*
      Convert the list of actions to a list of call side effect wrapped actions but
      without the type key so that any errors are thrown (see line 141)
    */
    try {
      const requests = action.payload.map(({ payload, meta }) =>
        call(apiRequest, { payload, meta }))
      yield all(requests)
      yield put(batchRequestSuccess(action.meta.storeKey))
    }
    catch (e) {
      yield put(batchRequestFailed(action.meta.storeKey, e))
    }
  }

  /*
    To mirror the reducer in that, for a given request key ({ endpoint, params } or storeKey)
    there is only one api state, response, error and polling state associated with that request
    The apiPollRegister ensures there is only one polling saga for a given request by cancelling
    any exisiting tasks with the same key
  */
  let apiPollRegister = Map()

  function* forkApiPoll(action) {
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
    yield all([
      takeEvery(POLL_REQUEST, forkApiPoll),
      takeEvery(REQUEST, apiRequest),
      takeEvery(BATCH_REQUEST, apiBatchRequest),
      takeLatest(REFRESH_JWT, refreshJWT),
    ])
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
