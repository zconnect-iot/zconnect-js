import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import { extractJWTAndSaveInfo } from './utils'
import * as actions from './actions'
import {
  LOGIN,
  LOGOUT,
  REGISTER_USER,
  RESET_PASSWORD,
} from './constants'

export default function configureAuthSagas({ Sentry, jwtStore }, apiSagas) {
  function* logoutSaga() {
    try {
      yield call(jwtStore.delete)
    }
    catch (error) {
      Sentry.captureException(error)
    }
    // Remove user details from sentry
    Sentry.setUserContext({ email: '', userID: '', username: '', extra: {} })
  }

  function* loginSaga(action) {
    const endpoint = 'login'
    const email = (action.email || '').toLowerCase()
    const password = action.password || ''
    const payload = { username: email, password }
    try {
      // Make call
      const response = yield call(apiSagas.apiRequest, { meta: { endpoint }, payload })

      const { userID } = yield call(extractJWTAndSaveInfo, Sentry, jwtStore, email, response)

      yield put(actions.loginSuccess(userID, email))
    }
    catch (err) {
      Sentry.captureException(err)
      yield put(actions.loginError(err))
    }
  }

  // Register User:
  function* registerUserSaga(action) {
    try {
      const endpoint = 'register'
      const email = (action.payload.email || '').toLowerCase()
      const password = action.payload.password || ''
      const fname = action.payload.fname || ''
      const lname = action.payload.lname || ''
      const user_type = action.payload.user_type || 'home' // user_type = ['home'|'business']

      const payload = { fname, lname, email, password, user_type }

      yield call(apiSagas.apiRequest, { meta: { endpoint }, payload })
      yield put(actions.registerUserSuccess())
    }
    catch (error) {
      Sentry.captureException(error)
      yield put(actions.registerUserError(error))
    }
  }

  // Reset Password:
  function* resetPasswordSaga(action) {
    try {
      const endpoint = 'resetPassword'

      const email = (action.payload.email || '').toLowerCase()

      const payload = { email }

      yield call(apiSagas.apiRequest, { meta: { endpoint }, payload })
      yield put(actions.resetPasswordSuccess())
    }
    catch (error) {
      Sentry.captureException(error)
      yield put(actions.resetPasswordError(error))
    }
  }

  function* watcher() {
    yield [
      takeLatest(LOGIN, loginSaga),
      takeLatest(LOGOUT, logoutSaga),
      takeLatest(RESET_PASSWORD, resetPasswordSaga),
      takeLatest(REGISTER_USER, registerUserSaga),
    ]
  }

  return {
    logoutSaga,
    loginSaga,
    registerUserSaga,
    resetPasswordSaga,
    watcher,
  }
}
