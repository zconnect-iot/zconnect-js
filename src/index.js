import * as apiActions from './api/actions'
import * as apiConstants from './api/constants'
import * as apiSelectors from './api/selectors'
import apiReducer from './api/reducer'
import configureApiSagas from './api/sagas'

import * as authActions from './auth/actions'
import * as authConstants from './auth/constants'
import * as authSelectors from './auth/selectors'
import authReducer from './auth/reducer'
import configureAuthSagas from './auth/sagas'

let apiSagas = {}
let authSagas = {}

export function config({ Sentry, jwtStore, baseURL, loginTimeout, processError, endpoints }) {
  authSagas = configureAuthSagas(Sentry, jwtStore, baseURL, loginTimeout, processError)
  apiSagas = configureApiSagas(Sentry, jwtStore, baseURL, endpoints, authSagas.refreshJWT)
}

export {
  apiSagas,
  apiConstants,
  apiReducer,
  apiActions,
  apiSelectors,
  authSagas,
  authReducer,
  authActions,
  authConstants,
  authSelectors,
}
