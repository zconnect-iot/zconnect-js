import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'
import XDate from 'xdate'

import { selectLocaleCode } from '../locale/selectors'
import translations from '../locale/translations'

export const selectAPIDomain = state => state.get('api')

const emptyMap = Map()

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
  request => request.get('response', emptyMap),
)

/*
* Error selectors
*/
export const selectErrorResponse = createSelector(
  selectRequest,
  request => request.getIn(['error', 'response'], emptyMap),
)

export const selectErrorStatus = createSelector(
  selectErrorResponse,
  error => error.get('status'),
)

export const selectErrorJSON = createSelector(
  selectErrorResponse,
  error => error.get('json', emptyMap),
)

export const selectErrorDetail = createSelector(
  selectErrorJSON,
  json => json.get('detail', ''),
)

export const selectErrorCode = createSelector(
  selectErrorJSON,
  json => json.get('code', ''),
)

export const selectErrorMessage = createSelector(
  selectErrorCode,
  selectErrorDetail,
  selectLocaleCode,
  (code, detail, locale) => translations[locale][code] || detail || translations[locale].server,
)
