import {
  LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT, LOGIN_USER,
  REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
  RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_CLOSE,
  RESET_PASSWORD_ERROR,
  SET_USER_GROUPS,
  RESET_AUTH_API,
} from './constants'

/*
* LoginActions
*/
export const requestLogin = (email, password) => ({ type: LOGIN_REQUEST, email, password })
export const loginUserState = (userId, email) => ({ type: LOGIN_USER, userId, email })
export const logout = () => ({ type: LOGOUT })

export const resetAuthApi = () => ({ type: RESET_AUTH_API })

export const loginFailure = error => ({ type: LOGIN_FAILURE, error })

/*
* User groups, jwt related.  NB: Explicitly set user groups to lowercase.
*/
export const setUserGroups = groups => ({ type: SET_USER_GROUPS, groups: groups.map(s => s.toLowerCase()) })

/*
* User Registration
*/
export const registerUser = payload => ({ type: REGISTER_USER, payload })
export const registerUserSuccess = () => ({ type: REGISTER_USER_SUCCESS })
export const registerUserError = error => ({ type: REGISTER_USER_ERROR, error })

/*
* Reset Password
*/
export const resetPassword = payload => ({ type: RESET_PASSWORD, payload })
export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS })
export const resetPasswordClose = () => ({ type: RESET_PASSWORD_CLOSE })
export const resetPasswordError = error => ({ type: RESET_PASSWORD_ERROR, error })
