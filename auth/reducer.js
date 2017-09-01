import { fromJS } from 'immutable'
import {
 LOGOUT, LOGIN_USER,
 SET_USER_GROUPS, RESET_AUTH_API,
} from './constants'


export const initialState = {
  authenticated: false,
  userId: null,
  email: null,
  groups: [],
}

const _initialState = fromJS(initialState)

function authReducer(state = _initialState, action) {
  switch (action.type) {

    case LOGIN_USER:
      return state
        .set('authenticated', true)
        .set('userId', action.userId)
        .set('email', action.email)

    case LOGOUT:
      return state
        .set('authenticated', false)
        .set('userId', null)
        .set('groups', fromJS([]))

    case RESET_AUTH_API:
      return state
        .set('authenticated', false)
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
