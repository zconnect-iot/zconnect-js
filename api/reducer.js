import { fromJS } from 'immutable'
import { transformError } from './utils'
import {
 REQUEST_ERROR, REQUEST_SUCCESS, REQUEST_PENDING, POLL_REQUEST, STOP_POLL_REQUEST,
} from './constants'


export default function requestReducer(state = fromJS({}), action) {
  // The Map for using as the key under which to store the request state..
  // Should be just { endpoint, params } so other meta keys like interval are filtered out
  const request = fromJS(action.meta || {})
    .filter((value, key) => ['endpoint', 'params'].indexOf(key) !== -1)

  switch (action.type) {
    case REQUEST_PENDING:
      return state
        .setIn([request, 'pending'], true)
        .setIn([request, 'error'], false)
        .setIn([request, 'success'], false)

    case REQUEST_SUCCESS:
      return state
        .setIn([request, 'response'], fromJS(action.payload))
        .setIn([request, 'pending'], false)
        .setIn([request, 'error'], false)
        .setIn([request, 'success'], true)
        .setIn([request, 'updated'], new Date().toISOString())

    case REQUEST_ERROR:
      return state
        .setIn([request, 'errorResponse'], fromJS(transformError(action.payload)))
        .setIn([request, 'pending'], false)
        .setIn([request, 'error'], true)
        .setIn([request, 'success'], false)
        .setIn([request, 'polling'], false)

    case POLL_REQUEST:
      return state
        .setIn([request, 'polling'], action.meta.interval)

    case STOP_POLL_REQUEST:
      return state
        .setIn([request, 'polling'], false)

    default:
      return state
  }
}
