import configureApiSagas from './api/sagas'
import configureAuthSagas from './auth/sagas'

let apiSagas = {}
let authSagas = {}

export function configureZC(appDependencies) {
  apiSagas = configureApiSagas(appDependencies)
  authSagas = configureAuthSagas(appDependencies, apiSagas)
}

export {
  apiSagas,
  authSagas,
}
