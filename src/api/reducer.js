import { fromJS } from 'immutable'
import {
 REQUEST_FAILED, REQUEST_FETCHED, REQUEST_FETCHING, POLL_REQUEST, STOP_POLL_REQUEST,
} from './constants'


export default function requestReducer(state = fromJS({}), action) {
  // The Map for using as the key under which to store the request state..
  // Should be just { endpoint, params } so other meta keys like interval are filtered out
  const request = fromJS(action.meta || {})
    .filter((value, key) => ['endpoint', 'params'].indexOf(key) !== -1)

  switch (action.type) {
    case REQUEST_FETCHING:
      return state
        .setIn([request, 'fetching'], true)
        .setIn([request, 'error'], false)
        .setIn([request, 'success'], false)

    case REQUEST_FETCHED:
      return state
        .setIn([request, 'response'], fromJS(action.payload))
        .setIn([request, 'fetching'], false)
        .setIn([request, 'error'], false)
        .setIn([request, 'success'], true)
        .setIn([request, 'updated'], new Date().toISOString())

    case REQUEST_FAILED:
      return state
        .setIn([request, 'errorResponse'], fromJS(action.payload))
        .setIn([request, 'fetching'], false)
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
