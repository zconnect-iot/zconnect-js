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

const selectRequest = createSelector(
  selectAPIDomain,
  selectMetaFromProps,
  (requests, meta) => requests.get(meta, Map()),
)

const selectState = createSelector(
  selectRequest,
  request => request.get('state', Map()),
)

const selectSuccess = createSelector(
  selectState,
  state => state.get('success', false),
)

const selectError = createSelector(
  selectState,
  state => state.get('error', false),
)

const selectPending = createSelector(
  selectState,
  state => state.get('pending', false),
)

export const selectAPIState = createSelector(
  selectError,
  selectSuccess,
  selectPending,
  (error, success, pending) => ({ error, success, pending }),
)

export const selectPollingInterval = createSelector(
  selectRequest,
  request => request.get('polling', false),
)

export const selectLastFetchedTime = createSelector(
  selectRequest,
  request => request.get('updated'),
)

export const selectTimeNow = () => new XDate()

export const selectTimeSinceLastFetch = createSelector(
  selectLastFetchedTime,
  selectTimeNow,
  (lastFetch, now) => (lastFetch ? new XDate(lastFetch).diffMilliseconds(now) : null),
)

export const selectResponse = createSelector(
  selectRequest,
  request => request.get('response'),
)

/*
* Error selectors
*/
export const selectErrorObject = createSelector(
  selectRequest,
  request => request.get('error', Map()),
)

export const selectErrorTitle = createSelector(
  selectErrorObject,
  error => error.get('title'),
)

export const selectErrorDescription = createSelector(
  selectErrorObject,
  error => error.get('description'),
)

export const selectErrorResponseTitle = createSelector(
  selectErrorObject,
  error => error.getIn(['response', 'json', 'title']),
)

export const selectErrorResponseDescription = createSelector(
  selectErrorObject,
  error => error.getIn(['response', 'json', 'description']),
)

export const selectErrorResponseStatus = createSelector(
  selectErrorObject,
  error => error.getIn(['response', 'status']),
)
