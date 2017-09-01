import {
  REQUEST,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  REQUEST_CACHE_USED,
  POLL_REQUEST,
  STOP_POLL_REQUEST,
  REFRESH_JWT,
} from './constants'

export const requestPending = (endpoint, params = {}) => ({
  type: REQUEST_PENDING,
  meta: {
    endpoint,
    params,
  },
})

export const requestSuccess = (endpoint, params = {}, payload) => ({
  type: REQUEST_SUCCESS,
  meta: {
    endpoint,
    params,
  },
  payload,
})

export const requestError = (endpoint, params = {}, error) => ({
  type: REQUEST_ERROR,
  meta: {
    endpoint,
    params,
  },
  payload: error,
  error: true,
})

export const apiRequest = (endpoint, params = {}, payload = {}) => ({
  type: REQUEST,
  meta: {
    endpoint,
    params,
  },
  payload,
})

export const requestCacheUsed = (endpoint, params = {}) => ({
  type: REQUEST_CACHE_USED,
  meta: {
    endpoint,
    params,
  },
})

export const pollApiRequest = (endpoint, params = {}, payload = {}, interval) => ({
  type: POLL_REQUEST,
  meta: {
    endpoint,
    params,
    interval,
  },
  payload,
})

export const stopPollApiRequest = (endpoint, params = {}) => ({
  type: STOP_POLL_REQUEST,
  meta: {
    endpoint,
    params,
  },
})

export const refreshJWT = () => ({ type: REFRESH_JWT })
