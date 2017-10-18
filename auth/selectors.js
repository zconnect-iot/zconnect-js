import { createSelector } from 'reselect'
import { selectAPIState, selectErrorObject } from '../api/selectors'

const PREMIUM_USER_GROUP = 'premium_user'
const BETA_USER_GROUP = 'beta'

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

export const selectLoginError = state => selectErrorObject(state, { endpoint: 'login' })
export const selectRegisterError = state => selectErrorObject(state, { endpoint: 'register' })
export const selectResetPasswordError = state => selectErrorObject(state, { endpoint: 'resetPassword' })

// Error details

export const selectLoginErrorMessage = createSelector(
  selectLoginError,
  (error) => {
    const jsonDescription = error.getIn(['response', 'json', 'description'])
    const status = error.getIn(['response', 'status'])
    const title = error.get('title')
    const description = error.get('description')
    if (jsonDescription === 'User has not confirmed their email') return 'emailconfirm'
    if (status === 404 || status === 403) return 'invalid'
    if (title || description) return description || title
    return 'tryagain'
  },
)

export const selectRegisterErrorMessage = createSelector(
  selectRegisterError,
  (error) => {
    const jsonDescription = error.getIn(['response', 'json', 'description'])
    const title = error.get('title')
    const description = error.get('description')
    if (jsonDescription === 'Error creating new user: The email provided is already in use') return 'emailinuse'
    if (title || description) return description || title
    return 'tryagain'
  },
)

export const selectForgottenPasswordErrorMessage = createSelector(
  selectResetPasswordError,
  (error) => {
    const status = error.getIn(['response', 'status'])
    const title = error.get('title')
    const description = error.get('description')
    if (status === 404) return 'emailnotfound'
    if (title || description) return description || title
    return 'tryagain'
  },
)
