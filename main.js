import configureApiSagas from './api/sagas'
import configureAuthSagas from './auth/sagas'

let apiSagas = {}
let authSagas = {}

export function configureZC(appDependencies) {
  authSagas = configureAuthSagas(appDependencies)
  apiSagas = configureApiSagas(appDependencies, authSagas.refreshJWT)
}

export {
  apiSagas,
  authSagas,
}
