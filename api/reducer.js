import { fromJS, Map } from 'immutable'
import { transformError } from './utils'
import {
 REQUEST_ERROR, REQUEST_SUCCESS, REQUEST_PENDING, POLL_REQUEST, STOP_POLL_REQUEST, REQUEST_RESET,
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
  const request = fromJS(action.meta || {})
    .filter((value, key) => ['endpoint', 'params'].indexOf(key) !== -1)

  switch (action.type) {
    case REQUEST_PENDING:
      return state
        .setIn([request, 'state'], apiStates.get('pending'))

    case REQUEST_SUCCESS:
      return state
        .setIn([request, 'response'], fromJS(action.payload))
        .setIn([request, 'state'], apiStates.get('success'))
        .setIn([request, 'updated'], new Date().toISOString())

    case REQUEST_ERROR:
      return state
        .setIn([request, 'error'], fromJS(transformError(action.payload)))
        .setIn([request, 'state'], apiStates.get('error'))
        .setIn([request, 'polling'], false)

    case REQUEST_RESET:
      return state
        .setIn([request, 'state'], apiStates.get('initial'))
        .setIn([request, 'response'], Map())
        .setIn([request, 'error'], Map())
        .setIn([request, 'updated'], null)
        .setIn([request, 'polling'], false)

    case POLL_REQUEST:
      return state
        .setIn([request, 'polling'], action.meta.interval)

    case STOP_POLL_REQUEST:
      return state
        .setIn([request, 'polling'], false)

    case RESET_AUTH_API:
      return state
        .setIn([fromJS({ endpoint: 'login', params: {} }), 'state'], apiStates.get('initial'))
        .setIn([fromJS({ endpoint: 'register', params: {} }), 'state'], apiStates.get('initial'))
        .setIn([fromJS({ endpoint: 'resetPassword', params: {} }), 'state'], apiStates.get('initial'))

    default:
      return state
  }
}
