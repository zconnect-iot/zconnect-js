import { APIError } from './errors'
import { serializeEJSON, deserializeEJSON } from './eJSON'

export function getHeaders(token) {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  if (token) headers.append('Authorization', `Bearer ${token}`)
  return headers
}

export function apifetch({ baseURL, url, method = 'GET', payload = {}, token }) {
  const fullUrl = `${baseURL}/${url}`
  const headers = getHeaders(token)
  const details = {
    method,
    headers,
    mode: 'cors',
    cache: 'default',
  }
  if (method.toLowerCase() === 'post') {
    details.body = JSON.stringify(serializeEJSON(payload))
  }
  return fetch(fullUrl, details)
    .then((response) => {
      const { status, ok, type, statusText } = response
      if (response.json) return response.json()
        .then(json => deserializeEJSON(json))
        .then((json) => {
          if (response.ok) return json
          throw new APIError({ status, statusText, json, ok, type, url: response.url })
        })
      if (!response.ok) throw new APIError({
        ...response,
        status,
        statusText,
        ok,
        type,
        url: response.url,
      })
      return {}
    })
}

export function formatUrl(url, params = {}) {
  const used = {}
  const formattedUrl = url.replace(/\$\{([a-zA-Z0-9_]*)\}/g, (match, param) => {
    if (!params[param]) throw new Error(`Required parameter, ${param}, has not been provided`)
    used[param] = true
    return params[param]
  })
  const queryString = Object.entries(params)
    .filter(param => !used[param[0]])
    .map(param => `${param[0]}=${param[1]}`)
    .join('&')
  return queryString ? `${formattedUrl}?${queryString}` : formattedUrl
}

export function transformError(error = {}) {
  // Strips non JSON values like functions and returns simple object for passing to fromJS
  return JSON.parse(JSON.stringify(error))
}