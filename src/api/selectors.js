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

export const selectRequestFetched = createSelector(
  selectRequestDomain,
  request => request.get('success', false),
)

export const selectRequestFailed = createSelector(
  selectRequestDomain,
  request => request.get('error', false),
)

export const selectRequestPending = createSelector(
  selectRequestDomain,
  request => request.get('fetching', false),
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
  selectRequestFailed,
  selectRequestFetched,
  selectRequestPending,
  (error, success, fetching) => ({ error, success, fetching }),
)

export const selectRequestResponse = createSelector(
  selectRequestDomain,
  request => request.get('response'),
)

export const selectRequestError = createSelector(
  selectRequestDomain,
  request => request.get('errorResponse', Map()),
)

export const selectRequestErrorStatus = createSelector(
  selectRequestError,
  error => error.getIn(['response', 'status']),
)
