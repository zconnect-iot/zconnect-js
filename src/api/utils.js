import { APIError } from './errors'
import { serializeEJSON, deserializeEJSON } from './eJSON'

export function getHeaders(method, token) {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  if (token) headers.append('Authorization', `Bearer ${token}`)
  return headers
}

export function apifetch(baseURL, url, method = 'GET', body = {}, token = undefined, resetToken = false) {
  const fullUrl = `${baseURL}${url}`
  const headers = getHeaders(method, token, resetToken)
  const details = {
    method,
    headers,
    mode: 'cors',
    cache: 'default',
  }
  if (method.toLowerCase() === 'post') {
    details.body = JSON.stringify(serializeEJSON(body))
  }
  if (__DEV__) console.log(`%c ${method}: ${fullUrl}`, 'background: lightblue', details.body)
  return fetch(fullUrl, details)
    .then((response) => {
      if (response.json) {
        return response.json()
          .then(json => deserializeEJSON(json))
          .then((json) => {
            if (response.ok) return json
            response.json = json
            throw new APIError(response)
          })
      }
      else if (!response.ok) throw new APIError(response)
      return {}
    })
    .then((data) => {
      if (__DEV__) console.log(`%c ${method}: ${url} Response:`, 'background: chartreuse', data)
      return data
    })
    .catch((e) => {
      if (__DEV__) console.log(`%c ${method}: ${url} Error:`, 'background: indianred', e)
      throw e
    })
}
