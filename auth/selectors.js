import { createSelector } from 'reselect'
import { Map } from 'immutable'

const PREMIUM_USER_GROUP = 'premium_user'

export const selectAuthDomain = state => state.get('auth')

/*
* User ID
*/
export const selectUserId = state => state.getIn(['auth', 'userId'])
export const selectEmail = state => state.getIn(['auth', 'email'])
export const selectUserGroups = state => state.getIn(['auth', 'groups']).toJS()

export const selectUserIsPremium = createSelector(
  selectUserGroups,
  groups => !!groups && groups.indexOf(PREMIUM_USER_GROUP) > -1,
)

/*
* API STATE
*/
export const selectAuthAPIState = createSelector(
  selectAuthDomain,
  substate => substate.get('authAPIState').toJS(),
)

export const selectRegistrationAPIState = createSelector(
  selectAuthDomain,
  substate => substate.get('registrationAPIState').toJS(),
)

export const selectResetPasswordAPIState = createSelector(
  selectAuthDomain,
  substate => substate.get('resetPasswordAPIState').toJS(),
)

export const selectError = createSelector(
  selectAuthDomain,
  substate => substate.get('error', Map()),
)

export const selectErrorTitle = createSelector(
  selectError,
  error => error.get('title'),
)

export const selectErrorDescription = createSelector(
  selectError,
  error => error.get('description'),
)

export const selectErrorJsonTitle = createSelector(
  selectError,
  error => error.getIn(['response', 'json', 'title']),
)

export const selectErrorJsonDescription = createSelector(
  selectError,
  error => error.getIn(['response', 'json', 'description']),
)

export const selectErrorStatus = createSelector(
  selectError,
  error => error.getIn(['response', 'status']),
)

export const selectUserLoggedIn = createSelector(
  selectAuthDomain,
  substate => !!substate.get('userId'),
)

export const selectUserSettings = createSelector(
  selectAuthDomain,
  substate => (substate.getIn(['user', 'user_settings']) ? substate.getIn(['user', 'user_settings']).toJS() : {}),
)
