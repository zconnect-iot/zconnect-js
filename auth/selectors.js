import { createSelector } from 'reselect'
import { selectAPIState, selectErrorObject } from '../api/selectors'

const PREMIUM_USER_GROUP = 'premium_user'

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
export const selectUserGroups = createSelector(
  selectAuthDomain,
  auth => auth.get('groups'),
)

export const selectUserIsPremium = createSelector(
  selectUserGroups,
  groups => groups.includes(PREMIUM_USER_GROUP),
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

export const selectLoginError = state => selectErrorObject(state, { endpoint: 'login' })
export const selectRegisterError = state => selectErrorObject(state, { endpoint: 'register' })
export const selectResetPasswordError = state => selectErrorObject(state, { endpoint: 'resetPassword' })
