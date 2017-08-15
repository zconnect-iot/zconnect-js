import { APIError } from './errors'
import { serializeEJSON, deserializeEJSON } from './eJSON'

export function getHeaders(method, token, resetToken) {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  if (token) headers.append('Authorization', `Bearer ${token}`)
  return headers
}

export function apifetch(url, method = 'GET', body = {}, token = undefined, resetToken = false) {
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
  if (__DEV__) console.log(`%c ${method}: ${url}`, 'background: lightblue', details.body)
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

// export function processError(error, sentryConfig) {
//   let ignore = false
//   let extra
//   if (error.name === 'APIError') {
//     const json = error.response.json || {}
//     extra = Object.assign(
//       error.response,
//       json,
//       { name: error.name },
//     )
//
//     const ignoredErrors = AppSettings.sentryIgnore
//
//     // Do not captureException with Sentry if error matches the properties in ignoredErrors
//     ignore = ignoredErrors[error.url] &&
//       ignoredErrors[error.url][error.status]
//   }
//
//   if (!ignore) {
//     Sentry.captureException(error, { extra, ...sentryConfig })
//   }
//   return error
// }
