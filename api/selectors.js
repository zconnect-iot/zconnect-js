import { createSelector } from 'reselect'
import { Map, fromJS } from 'immutable'
import XDate from 'xdate'

export const selectAPIDomain = state => state.get('api')

const selectEndpointFromProps = (_, props = {}) => props.endpoint

const selectStoreKeyFromProps = (_, props = {}) => props.storeKey

const selectParamsFromProps = (_, { params = {} } = {}) => params

const selectRequestKeyFromProps = createSelector(
  selectEndpointFromProps,
  selectParamsFromProps,
  selectStoreKeyFromProps,
  (endpoint, params, storeKey) => storeKey || fromJS({ endpoint, params }),
)

const initialState = fromJS({
  state: { pending: false, success: false, error: false },
  error: {},
  polling: false,
})

// If a request hasn't been made yet there will be nothing in the store so this
// returns a default/initial state until a request is made to populate the state
export const selectRequest = createSelector(
  selectAPIDomain,
  selectRequestKeyFromProps,
  (requests, key) => requests.get(key, initialState),
)

export const selectAPIState = createSelector(
  selectRequest,
  request => request.get('state', initialState.get('state')),
)

export const selectSuccess = createSelector(
  selectAPIState,
  state => state.get('success'),
)

export const selectError = createSelector(
  selectAPIState,
  state => state.get('error'),
)

export const selectPending = createSelector(
  selectAPIState,
  state => state.get('pending'),
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

export const selectAPIErrorMessage = createSelector(
  selectErrorResponseTitle,
  selectErrorResponseDescription,
  (title, description) => title && description ? `API Error - ${title} - ${description}` :
    description || title || 'An unknown fetch error occurred'
)
