import apiActions from './api/actions'
import apiConstants from './api/constants'
import apiReducer from './api/reducer'
import configureSagas from './api/sagas'

let apiSagas = {}

export function config({ Sentry, jwtStore, baseURL }) {
  apiSagas = configureSagas(Sentry, jwtStore, baseURL)
}

export {
  apiSagas,
  apiConstants,
  apiReducer,
  apiActions,
}
