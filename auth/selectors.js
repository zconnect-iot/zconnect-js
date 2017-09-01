import { createSelector } from 'reselect'

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

export const selectUserLoggedIn = createSelector(
  selectAuthDomain,
  substate => !!substate.get('userId'),
)
