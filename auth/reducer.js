import { fromJS } from 'immutable'
import {
 LOGOUT, LOGIN_SUCCESS,
 SET_USER_GROUPS, RESET_AUTH_API,
} from './constants'


export const initialState = {
  userId: null,
  email: null,
  groups: [],
}

const _initialState = fromJS(initialState)

function authReducer(state = _initialState, action) {
  switch (action.type) {

    case LOGIN_SUCCESS:
      return state
        .set('userId', action.userId)
        .set('email', action.email)

    case LOGOUT:
      return state
        .set('userId', null)
        .set('groups', fromJS([]))

    case RESET_AUTH_API:
      return state
        .set('userId', null)
        .set('groups', fromJS([]))

    case SET_USER_GROUPS:
      return state
        .set('groups', fromJS(action.groups))

    default:
      return state
  }
}

export default authReducer
