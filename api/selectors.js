import { createSelector } from 'reselect'
import { Map, fromJS } from 'immutable'
import XDate from 'xdate'

export const selectAPIDomain = state => state.get('api')

const selectEndpointFromProps = (_, props = {}) => props.endpoint

const selectParamsFromProps = (_, { params = {} } = {}) => params

const selectMetaFromProps = createSelector(
  selectEndpointFromProps,
  selectParamsFromProps,
  (endpoint, params) => fromJS({ endpoint, params }),
)

const selectRequestDomain = createSelector(
  selectAPIDomain,
  selectMetaFromProps,
  (requests, meta) => requests.get(meta, Map()),
)

export const selectRequestSuccess = createSelector(
  selectRequestDomain,
  request => request.get('success', false),
)

export const selectRequestError = createSelector(
  selectRequestDomain,
  request => request.get('error', false),
)

export const selectRequestPending = createSelector(
  selectRequestDomain,
  request => request.get('pending', false),
)

export const selectRequestPollingInterval = createSelector(
  selectRequestDomain,
  request => request.get('polling', false),
)

export const selectLastFetchedTime = createSelector(
  selectRequestDomain,
  request => request.get('updated'),
)

export const selectTimeNow = () => new XDate()

export const selectTimeSinceLastFetch = createSelector(
  selectLastFetchedTime,
  selectTimeNow,
  (lastFetch, now) => (lastFetch ? new XDate(lastFetch).diffMilliseconds(now) : null),
)

export const selectRequestAPIState = createSelector(
  selectRequestError,
  selectRequestSuccess,
  selectRequestPending,
  (error, success, pending) => ({ error, success, pending }),
)

export const selectRequestResponse = createSelector(
  selectRequestDomain,
  request => request.get('response'),
)

export const selectRequestErrorObject = createSelector(
  selectRequestDomain,
  request => request.get('errorResponse', Map()),
)
