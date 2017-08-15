import {
  REQUEST,
  REQUEST_FETCHING,
  REQUEST_FETCHED,
  REQUEST_FAILED,
  REQUEST_CACHE_USED,
  POLL_REQUEST,
  STOP_POLL_REQUEST,
} from './constants'

export const requestFetching = (endpoint, params = {}) => ({
  type: REQUEST_FETCHING,
  meta: {
    endpoint,
    params,
  },
})

export const requestFetched = (endpoint, params = {}, payload) => ({
  type: REQUEST_FETCHED,
  meta: {
    endpoint,
    params,
  },
  payload,
})

export const requestFailed = (endpoint, params = {}, error) => ({
  type: REQUEST_FAILED,
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
