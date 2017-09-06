import {
  LOGIN, LOGOUT, LOGIN_SUCCESS,
  REGISTER_USER, REGISTER_USER_SUCCESS,
  RESET_PASSWORD, RESET_PASSWORD_SUCCESS,
  SET_USER_GROUPS,
  RESET_AUTH_API,
} from './constants'
import { requestError } from '../api/actions'

export const logout = () => ({ type: LOGOUT })

export const resetAuthApi = () => ({ type: RESET_AUTH_API })

/*
* LoginActions
*/
export const login = (email, password) => ({ type: LOGIN, email, password })
export const loginSuccess = (userId, email) => ({ type: LOGIN_SUCCESS, userId, email })
export const loginError = error => requestError('login', undefined, error)

/*
* User groups, jwt related.  NB: Explicitly set user groups to lowercase.
*/
export const setUserGroups = groups => ({
  type: SET_USER_GROUPS,
  groups: groups.map(s => s.toLowerCase()),
})

/*
* User Registration
*/
export const registerUser = payload => ({ type: REGISTER_USER, payload })
export const registerUserSuccess = () => ({ type: REGISTER_USER_SUCCESS })
export const registerUserError = error => requestError('register', undefined, error)

/*
* Reset Password
*/
export const resetPassword = payload => ({ type: RESET_PASSWORD, payload })
export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS })
export const resetPasswordError = error => requestError('resetPassword', undefined, error)
