import { fromJS } from 'immutable'
import {
  LOGOUT, LOGIN_SUCCESS,
  SET_USER_GROUPS, RESET_AUTH_API,
  SET_USER_ORGS,
} from './constants'


export const initialState = {
  userId: null,
  email: null,
  groups: [],
  orgs: [],
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
        .set('orgs', fromJS([]))

    case RESET_AUTH_API:
      return state
        .set('userId', null)
        .set('groups', fromJS([]))
        .set('orgs', fromJS([]))

    case SET_USER_GROUPS:
      return state
        .set('groups', fromJS(action.groups))

    case SET_USER_ORGS:
      return state
        .set('orgs', fromJS(action.orgs))

    default:
      return state
  }
}

export default authReducer
