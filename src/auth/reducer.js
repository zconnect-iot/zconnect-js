import { fromJS } from 'immutable'
import {
 LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT, LOGIN_USER,
 REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
 RESET_PASSWORD, RESET_PASSWORD_SUCCESS,
 RESET_PASSWORD_CLOSE, RESET_PASSWORD_ERROR,
 SET_USER_GROUPS, RESET_AUTH_API,
} from './constants'

const apiState = {
  initial: {
    fetching: false,
    error: false,
    success: false,
    status: 'initial',
  },
  fetching: {
    fetching: true,
    error: false,
    success: false,
    status: 'fetching',
  },
  error: {
    fetching: false,
    error: true,
    success: false,
    status: 'error',
  },
  success: {
    fetching: false,
    error: false,
    success: true,
    status: 'success',
  },
}

export const initialState = {
  authAPIState: fromJS(apiState.initial),
  registrationAPIState: fromJS(apiState.initial),
  resetPasswordAPIState: fromJS(apiState.initial),
  userInviteAPIState: fromJS(apiState.initial),
  authenticated: false,
  userId: null,
  email: null,
  groups: [],
  user: {},
  error: {},
}

const _initialState = fromJS(initialState)

function authReducer(state = _initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
        .set('authAPIState', fromJS(apiState.fetching))
        .set('resetPasswordAPIState', fromJS(apiState.initial))

    case LOGIN_USER:
      return state
        .set('authAPIState', fromJS(apiState.success))
        .set('authenticated', true)
        .set('userId', action.userId)
        .set('email', action.email)

    case LOGOUT:
      return state
        .set('authAPIState', fromJS(apiState.initial))
        .set('registrationAPIState', fromJS(apiState.initial))
        .set('authenticated', false)
        .set('userId', null)
        .set('groups', fromJS([]))

    case RESET_AUTH_API:
      return state
        .set('authAPIState', fromJS(apiState.initial))
        .set('registrationAPIState', fromJS(apiState.initial))
        .set('resetPasswordAPIState', fromJS(apiState.initial))
        .set('authenticated', false)
        .set('userId', null)
        .set('groups', fromJS([]))

    case LOGIN_FAILURE:
      return state
        .set('authAPIState', fromJS(apiState.error))
        .set('error', fromJS(action.error))

    case SET_USER_GROUPS:
      return state
        .set('groups', fromJS(action.groups))

    case REGISTER_USER:
      return state
        .set('registrationAPIState', fromJS(apiState.fetching))

    case REGISTER_USER_SUCCESS:
      return state
        .set('registrationAPIState', fromJS(apiState.success))

    case REGISTER_USER_ERROR:
      return state
        .set('registrationAPIState', fromJS(apiState.error))
        .set('error', fromJS(action.error))

    case RESET_PASSWORD:
      return state
        .set('resetPasswordAPIState', fromJS(apiState.fetching))

    case RESET_PASSWORD_SUCCESS:
      return state
        .set('resetPasswordAPIState', fromJS(apiState.success))

    case RESET_PASSWORD_CLOSE:
      return state
        .set('resetPasswordAPIState', fromJS(apiState.initial))

    case RESET_PASSWORD_ERROR:
      return state
        .set('resetPasswordAPIState', fromJS(apiState.error))
        .set('error', fromJS(action.error))

    default:
      return state
  }
}

export default authReducer
