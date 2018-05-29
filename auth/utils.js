import jwtDecode from 'jwt-decode'
import emailRX from 'regex-email'
import { call } from 'redux-saga/effects'

import { deserializeEJSON } from '../api/eJSON'


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

export const isValidEmail = email => emailRX.test(email)

export function* extractJWTAndSaveInfo(Sentry, jwtStore, email, response) {
  const { token } = response
  // Securely store login token
  yield call(jwtStore.set, email, token)
  const userID = getUserIdFromToken(token)

  // Log the user in with Sentry too
  Sentry.setUserContext({
    email, userID, username: '', extra: {},
  })

  return decodeJWT(token)
}
