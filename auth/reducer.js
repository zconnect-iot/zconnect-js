import { fromJS, Map } from 'immutable'
import {
  LOGOUT,
  LOGIN_SUCCESS,
  RESET_AUTH_API,
} from './constants'

const emptyMap = Map()

export const initialState = {
  userId: null,
  email: null,
  jwt: {},
}

const _initialState = fromJS(initialState)

function authReducer(state = _initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state
        .set('userId', action.userId)
        .set('email', action.email)
        .set('jwt', action.jwt)

    case LOGOUT:
      return state
        .set('userId', null)
        .set('jwt', emptyMap)

    case RESET_AUTH_API:
      return state
        .set('userId', null)
        .set('jwt', emptyMap)

    default:
      return state
  }
}

export default authReducer
