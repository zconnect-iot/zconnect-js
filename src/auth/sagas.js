import { call, put, race } from 'redux-saga/effects'
import { takeLatest, delay } from 'redux-saga'
import jwtDecode from 'jwt-decode'

import { apifetch, secureApiSagaNoLogout } from '../api/utils'
import { deserializeEJSON } from '../api/eJSON'

import * as actions from './actions'
import {
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_USER,
  RESET_PASSWORD,
  REFRESH_JWT,
} from './constants'

export default function configureAuthSagas(Sentry, jwtStore, baseURL, loginTimeout, processError) {
  function* logoutSaga() {
    try {
      yield call(jwtStore.delete)
    }
    catch (error) {
      yield call(processError, error)
    }
    // Remove user details from sentry
    Sentry.setUserContext({ email: '', userID: '', username: '', extra: {} })
  }

  /*
  * refreshJWT
  * Allows a user to get a new JWT token to extend their logged in period.
  * The endpoint returns a JSON Web Token on success.
  * NB: Need explicit try catch around this when calling directly.
  */
  function* refreshJWT() {
    const url = 'api/v1/users/refresh_token'
    try {
      const { response, timeout } = yield race({
        response: call(secureApiSagaNoLogout, url, 'GET', {}),
        timeout: call(delay, loginTimeout),
      })
      if (timeout) throw new Error('timeout')

      const oldToken = yield call(jwtStore.get)
      const email = oldToken.username

      // Securely store login token
      yield call(jwtStore.set, email, response.token)

      const JWTokenDecoded = deserializeEJSON(jwtDecode(response.token))
      const userGroups = JWTokenDecoded.aud
      const userID = JWTokenDecoded.oid.oid

      // Log the user in with Sentry too
      Sentry.setUserContext({ email, userID, username: '', extra: {} })

      yield put(actions.setUserGroups(userGroups))
    }
    catch (error) {
      yield call(processError, error)
    }
  }

  function* loginSaga(action) {
    const url = 'api/v1/users/login'
    const method = 'POST'
    // Ensure emails are case insensitive
    const email = (action.email || '').toLowerCase()
    const password = action.password || ''
    const body = { email, password }
    let result
    try {
      // Make call
      result = yield race({
        response: call(apifetch, baseURL, url, method, body),
        timeout: call(delay, loginTimeout),
      })
      if (result.timeout) throw new Error('timeout')
    }
    catch (err) {
      const processedError = yield call(processError, err)
      yield put(actions.loginFailure(processedError))
    }
    const { response } = result
    // Securely store login token
    yield call(jwtStore.set, action.email, response.token)
    const JWTokenDecoded = deserializeEJSON(jwtDecode(response.token))
    const userID = JWTokenDecoded.oid.oid

    // Log the user in with Sentry
    Sentry.setUserContext({ email, userID, username: '', extra: {} })

    const userGroups = JWTokenDecoded.aud
    yield put(actions.setUserGroups(userGroups))
    yield put(actions.loginUserState(userID, email))
  }

  // Register User:
  function* registerUserSaga(action) {
    try {
      const url = 'api/v1/users/signup'
      const method = 'POST'
      // Ensure emails are case insensitive
      const email = (action.payload.email || '').toLowerCase()
      const password = action.payload.password || ''
      const fname = action.payload.fname || ''
      const lname = action.payload.lname || ''
      const user_type = action.payload.user_type || 'home' // user_type = ['home'|'business']

      const body = { fname, lname, email, password, user_type }

      yield apifetch(baseURL, url, method, body)
      yield put(actions.registerUserSuccess())
    }
    catch (error) {
      const processedError = yield call(processError, error)
      yield put(actions.registerUserError(processedError))
    }
  }

  // Reset Password:
  function* resetPasswordSaga(action) {
    try {
      const url = 'api/v1/users/reset_password'
      const method = 'POST'
      // Ensure emails are case insensitive
      const email = (action.payload.email || '').toLowerCase()

      const body = { email }

      yield apifetch(url, method, body)
      yield put(actions.resetPasswordSuccess())
    }
    catch (error) {
      const processedError = yield call(processError, error)
      yield put(actions.resetPasswordError(processedError))
    }
  }

  function* watcher() {
    yield [
      takeLatest(LOGIN_REQUEST, loginSaga),
      takeLatest(LOGOUT, logoutSaga),
      takeLatest(RESET_PASSWORD, resetPasswordSaga),
      takeLatest(REFRESH_JWT, refreshJWT),
      takeLatest(REGISTER_USER, registerUserSaga),
    ]
  }

  return {
    logoutSaga,
    loginSaga,
    registerUserSaga,
    resetPasswordSaga,
    refreshJWT,
    watcher,
  }
}
