import {
  LOGIN, LOGOUT, LOGIN_SUCCESS,
  REGISTER_USER, REGISTER_USER_SUCCESS,
  RESET_PASSWORD, RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_CONFIRM, RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_AUTH_API,
} from './constants'
import { requestError } from '../api/actions'

export const logout = () => ({ type: LOGOUT })

export const resetAuthApi = () => ({ type: RESET_AUTH_API })

/*
* LoginActions
*/
export const login = (email, password) => ({ type: LOGIN, email, password })
export const loginSuccess = (userId, email, jwt) => ({ type: LOGIN_SUCCESS, userId, email, jwt })
export const loginError = error => requestError('login', undefined, error)

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

/*
* Reset Password Confirmation
*/
export const resetPasswordConfirm = payload => ({ type: RESET_PASSWORD_CONFIRM, payload })
export const resetPasswordConfirmSuccess = () => ({ type: RESET_PASSWORD_CONFIRM_SUCCESS })
export const resetPasswordConfirmError = error => requestError('resetPasswordConfirm', undefined, error)
