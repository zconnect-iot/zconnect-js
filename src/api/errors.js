
export class APIError extends Error {
  /* Extends the Error object in order to correctly format an error message for Sentry */
  constructor(fetchErrResp) {
    super(`Request to ${fetchErrResp.url} returned ${fetchErrResp.status}.`)
    this.response = fetchErrResp
    this.name = 'APIError'
  }
}
