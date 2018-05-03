import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import { selectAPIState, selectErrorResponse, selectErrorMessage } from '../api/selectors'

const PREMIUM_USER_GROUP = 'premium_user'
const BETA_USER_GROUP = 'beta'

const emptyList = List()
const emptyMap = Map()

export const selectAuthDomain = state => state.get('auth')

/*
* User ID
*/
export const selectUserId = createSelector(
  selectAuthDomain,
  auth => auth.get('userId'),
)

export const selectEmail = createSelector(
  selectAuthDomain,
  auth => auth.get('email'),
)

export const selectJWT = createSelector(
  selectAuthDomain,
  auth => auth.get('jwt', emptyMap),
)

export const selectUserGroups = createSelector(
  selectJWT,
  jwt => jwt.get('groups', emptyList),
)

export const selectUserIsPremium = createSelector(
  selectUserGroups,
  groups => groups.includes(PREMIUM_USER_GROUP),
)

export const selectUserIsBeta = createSelector(
  selectUserGroups,
  groups => groups.includes(BETA_USER_GROUP),
)

export const selectUserLoggedIn = createSelector(
  selectUserId,
  id => !!id,
)

/*
* API
*/
export const selectLoginAPIState = state => selectAPIState(state, { endpoint: 'login' })
export const selectRegisterAPIState = state => selectAPIState(state, { endpoint: 'register' })
export const selectResetPasswordAPIState = state => selectAPIState(state, { endpoint: 'resetPassword' })
export const selectResetPasswordConfirmAPIState = state => selectAPIState(state, { endpoint: 'resetPasswordConfirm' })

export const selectLoginError = state => selectErrorResponse(state, { endpoint: 'login' })
export const selectRegisterError = state => selectErrorResponse(state, { endpoint: 'register' })
export const selectResetPasswordError = state => selectErrorResponse(state, { endpoint: 'resetPassword' })
export const selectResetPasswordConfirmError = state => selectErrorResponse(state, { endpoint: 'resetPasswordConfirm' })

// Error details

export const selectLoginErrorMessage = state => selectErrorMessage(state, { endpoint: 'login' })
export const selectRegisterErrorMessage = state => selectErrorMessage(state, { endpoint: 'register' })
export const selectResetPasswordErrorMessage = state => selectErrorMessage(state, { endpoint: 'resetPassword' })
export const selectResetPasswordConfirmErrorMessage = state => selectErrorMessage(state, { endpoint: 'resetPasswordConfirm' })
