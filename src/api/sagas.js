import { takeEvery, delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'

import { requestFetching, requestFetched, requestFailed, requestCacheUsed, stopPollApiRequest } from './actions'
import { REQUEST, POLL_REQUEST, STOP_POLL_REQUEST } from './constants'
import { selectRequestPollingInterval, selectTimeSinceLastFetch, selectRequestResponse } from './selectors'
import { apifetch } from './utils'
import { logout } from '../auth/actions'

export default function configureApiSagas({ Sentry, jwtStore, baseURL, endpoints }, refreshJWT) {
  function* secureApiSagaNoLogout(...args) {
    const token = yield call(jwtStore.get)
    return yield call(apifetch, baseURL, ...args, token.password)
  }

  function* secureApiSaga(...args) {
    let token = ''
    try {
      token = yield call(jwtStore.get)
       // if token undefined next line will be a reference error
      const response = yield call(apifetch, baseURL, ...args, token.password)
      return response
    }
    catch (error) {
      const status = error.response && error.response.status
      if (!token || status === 401 || status === 403) {
        try {  // First try to get a new token and reperform request.
          yield call(refreshJWT)
          return yield* secureApiSagaNoLogout(...args)
        }
        catch (jwterr) {
          Sentry.captureMessage('Could not perform request after re-fetching JWT')
          yield put(logout())
        }
      }
      throw error
    }
  }

  function formatUrl(url, params = {}) {
    const used = {}
    const formattedUrl = url.replace(/\$\{([a-zA-Z0-9_]*)\}/g, (match, param) => {
      if (!params[param]) throw new Error(`Required parameter, ${param}, has not been provied`)
      used[param] = true
      return params[param]
    })
    const queryString = Object.entries(params)
      .filter(param => !used[param[0]])
      .map(param => `${param[0]}=${param[1]}`)
      .join('&')
    return queryString ? `${formattedUrl}?${queryString}` : formattedUrl
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

  function* apiRequest({ meta, payload = {} }) {
    const { endpoint } = meta
    const config = endpoints[endpoint]
    const params = yield call(processParams, meta.params)
    const cacheAge = yield select(selectTimeSinceLastFetch, { endpoint, params })
    if (cacheAge && cacheAge < config.cache) {
      yield put(requestCacheUsed(endpoint, params))
      return yield select(selectRequestResponse, { endpoint, params })
    }
    const url = formatUrl(config.url, params)
    yield put(requestFetching(endpoint, params))
    try {
      const response = yield call(secureApiSaga, url, config.method, payload)
      yield put(requestFetched(endpoint, params, response))
      return response
    }
    catch (e) {
      yield put(requestFailed(endpoint, params, e))
      throw e
    }
  }

  function* apiPoll(action) {
    if (action.type === STOP_POLL_REQUEST) return
    const { endpoint, params } = action.meta
    let interval = select(selectRequestPollingInterval, { endpoint, params })
    while (interval) {
      try {
        yield call(apiRequest().worker, action)
      }
      catch (e) {
        // The polling key in the request state will be set to false by the REQUEST_FAILED action
        // but this just adds a STOP_POLL_REQUEST to the redux history to aid debugging
        yield put(stopPollApiRequest(endpoint, params))
        console.warn(`Polling endpoint, ${action.meta.endpoint}, returned an error. Polling will be stopped.`)
      }
      interval = yield select(selectRequestPollingInterval, { endpoint, params })
      yield call(delay, interval)
    }
  }

  function* watcher() {
    yield [
      takeEvery([POLL_REQUEST, STOP_POLL_REQUEST], apiPoll),
      takeEvery(REQUEST, apiRequest),
    ]
  }

  return {
    secureApiSaga,
    secureApiSagaNoLogout,
    apiRequest,
    apiPoll,
    watcher,
  }
}
