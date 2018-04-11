import jwtDecode from 'jwt-decode'
import emailRX from 'regex-email'
import { put, call } from 'redux-saga/effects'

import { deserializeEJSON } from '../api/eJSON'
import { setUserGroups, setUserOrgs } from '../auth/actions'

export function flattenObject(obj, name = '', separator = '_') {
  const flatObj = {}
  const loop = (o, path = name) => {
    Object.entries(o).forEach((entry) => {
      const key = `${path}${separator}${entry[0]}`
      if (typeof entry[1] !== 'object') {
        flatObj[key] = entry[1]
        return
      }
      loop(entry[1], key)
    })
  }
  loop(obj)
  return flatObj
}

export const decodeJWT = token => deserializeEJSON(jwtDecode(token))

export const getUserIdFromToken = token => decodeJWT(token).user_id

export const getEmailFromToken = token => decodeJWT(token).email

export const getUserGroupsFromToken = token => decodeJWT(token).groups

// Return only the strings as the org ID may also be in JWT but not required
export const getUserOrgsFromToken = (token) => {
  const orgs = decodeJWT(token).orgs || []
  const reducer = (orgNames, org) => {
    org.forEach((orgAttr) => {
      if (typeof orgAttr === 'string') orgNames.push(orgAttr)
    })
    return orgNames
  }
  return orgs.reduce(reducer, [])
}

export const isValidEmail = email => emailRX.test(email)

export function* extractJWTAndSaveInfo(Sentry, jwtStore, email, response) {
  const { token } = response
  // Securely store login token
  yield call(jwtStore.set, email, token)
  const userID = getUserIdFromToken(token)
  const userGroups = getUserGroupsFromToken(token)
  const userOrgs = getUserOrgsFromToken(token)

  // Log the user in with Sentry too
  Sentry.setUserContext({ email, userID, username: '', extra: {} })

  yield put(setUserGroups(userGroups))
  yield put(setUserOrgs(userOrgs))

  return { userID, userGroups, userOrgs }
}
