import actions from './api/actions'
import constants from './api/constants'
import reducer from './api/reducer'
import { configureSagas } from './api/sagas'

var sagas

export function config({ jwtStore, baseURL }) {
  sagas = configureSagas(jwtStore, baseURL)
}

export {
  sagas,
  constants,
  reducer,
  actions,
}
