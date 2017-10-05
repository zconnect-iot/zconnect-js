import jwtDecode from 'jwt-decode'
import emailRX from 'regex-email'

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

export const getUserIdFromToken = token => decodeJWT(token).oid.oid

export const getEmailFromToken = token => decodeJWT(token).email

export const isValidEmail = email => emailRX.test(email)
