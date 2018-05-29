import { fromJS, Iterable } from 'immutable'
import { transformError } from './utils'
import {
  REQUEST_ERROR, REQUEST_SUCCESS, REQUEST_PENDING, SET_POLL_INTERVAL, REQUEST_RESET,
  BATCH_REQUEST, BATCH_REQUEST_FAILED, BATCH_REQUEST_SUCCESS,
} from './constants'
import { RESET_AUTH_API } from '../auth/constants'

const apiStates = fromJS({
  initial: {
    pending: false,
    error: false,
    success: false,
  },
  pending: {
    pending: true,
    error: false,
    success: false,
  },
  success: {
    pending: false,
    error: false,
    success: true,
  },
  error: {
    pending: false,
    error: true,
    success: false,
  },
})

export default function requestReducer(state = fromJS({}), action) {
  // The Map for using as the key under which to store the request state..
  // Should be just { endpoint, params } so other meta keys like interval are filtered out
  let request = fromJS(action.meta || {})
    .filter((value, key) => ['endpoint', 'params'].indexOf(key) !== -1)
  if (action.meta && action.meta.storeKey) request = action.meta.storeKey

  switch (action.type) {
    case REQUEST_PENDING:
      return state
        .setIn([request, 'state'], apiStates.get('pending'))

    case REQUEST_SUCCESS: {
      const response = fromJS(action.payload)
      // Could return Immutable or primitive hence following if condition
      const lastResponse = state.getIn([request, 'response'])
      if (response === lastResponse ||
        (Iterable.isIterable(response) && response.equals(lastResponse))) return state
        .setIn([request, 'state'], apiStates.get('success'))
        .setIn([request, 'updated'], new Date().toISOString())
      return state
        .setIn([request, 'response'], response)
        .setIn([request, 'state'], apiStates.get('success'))
        .setIn([request, 'updated'], new Date().toISOString())
    }

    case REQUEST_ERROR:
      return state
        .setIn([request, 'error'], fromJS(transformError(action.payload)))
        .setIn([request, 'state'], apiStates.get('error'))
        .setIn([request, 'polling'], false)

    case REQUEST_RESET:
      return state
        .setIn([request, 'state'], apiStates.get('initial'))
        .setIn([request, 'updated'], null)
        .setIn([request, 'polling'], false)

    case SET_POLL_INTERVAL:
      return state
        .setIn([request, 'polling'], action.meta.interval)

    case RESET_AUTH_API:
      return state
        .setIn([fromJS({ endpoint: 'login', params: {} }), 'state'], apiStates.get('initial'))
        .setIn([fromJS({ endpoint: 'register', params: {} }), 'state'], apiStates.get('initial'))
        .setIn([fromJS({ endpoint: 'resetPassword', params: {} }), 'state'], apiStates.get('initial'))

    case BATCH_REQUEST:
      return state
        .setIn([request, 'state', 'pending'], true)
        .setIn([request, 'state', 'success'], false)
        .setIn([request, 'state', 'error'], false)

    case BATCH_REQUEST_SUCCESS:
      return state
        .setIn([request, 'state', 'pending'], false)
        .setIn([request, 'state', 'success'], true)

    case BATCH_REQUEST_FAILED:
      return state
        .setIn([request, 'state', 'pending'], false)
        .setIn([request, 'state', 'error'], true)
        .setIn([request, 'error'], fromJS(transformError(action.payload)))
    // The error stored here will be a duplicate of the one stored for the specific request
    // that caused it

    default:
      return state
  }
}
