import {
  BATCH_REQUEST,
  BATCH_REQUEST_SUCCESS,
  BATCH_REQUEST_FAILED,
  REQUEST,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  REQUEST_RESET,
  REQUEST_CACHE_USED,
  POLL_REQUEST,
  SET_POLL_INTERVAL,
  REFRESH_JWT,
} from './constants'

export const requestPending = (endpoint, params = {}, storeKey) => ({
  type: REQUEST_PENDING,
  meta: {
    endpoint,
    params,
    storeKey,
  },
})

export const requestSuccess = (endpoint, params = {}, payload, storeKey) => ({
  type: REQUEST_SUCCESS,
  meta: {
    endpoint,
    params,
    storeKey,
  },
  payload,
})

export const requestError = (endpoint, params = {}, error, storeKey) => ({
  type: REQUEST_ERROR,
  meta: {
    endpoint,
    params,
    storeKey,
  },
  payload: error,
  error: true,
})

export const apiReset = (endpoint, params = {}, storeKey) => ({
  type: REQUEST_RESET,
  meta: {
    endpoint,
    params,
    storeKey,
  },
})

export const apiRequest = (endpoint, params = {}, payload = {}) => ({
  type: REQUEST,
  meta: {
    endpoint,
    params,
  },
  payload,
})

export const apiBatchRequest = (id, payload = {}) => ({
  type: BATCH_REQUEST,
  meta: {
    id,
  },
  payload,
})

export const batchRequestSuccess = id => ({
  type: BATCH_REQUEST_SUCCESS,
  meta: {
    id,
  },
})

export const batchRequestFailed = id => ({
  type: BATCH_REQUEST_FAILED,
  meta: {
    id,
  },
})

export const requestCacheUsed = (endpoint, params = {}, storeKey) => ({
  type: REQUEST_CACHE_USED,
  meta: {
    endpoint,
    params,
    storeKey,
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

export const stopPollApiRequest = (endpoint, params = {}, storeKey) =>
  setPollInterval(endpoint, params, false, storeKey)

export const setPollInterval = (endpoint, params, interval, storeKey) => ({
  type: SET_POLL_INTERVAL,
  meta: {
    endpoint,
    params,
    storeKey,
    interval,
  },
})

export const refreshJWT = () => ({ type: REFRESH_JWT })
