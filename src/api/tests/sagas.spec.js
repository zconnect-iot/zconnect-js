import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { call, put } from 'redux-saga/effects'

import { apifetch } from '../utils'
import { logout } from '../../auth/actions'
import configureApiSagas from '../sagas'

// Move to global test config
chai.use(sinonChai)
chai.expect()
const expect = chai.expect

const refreshJWT = sinon.stub()
const deps = {
  Sentry: {
    captureMessage: sinon.stub(),
  },
  jwtStore: {
    get: sinon.stub().returns('JWT'),
    set: sinon.stub(),
    delete: sinon.stub(),
  },
  baseURL: 'http://base-url.com/',
  endpoints: {
    getDevices: {
      cache: 0,
      token: true,
      url: 'api/v1/devices',
      method: 'GET',
    },
  },
}
const apiSagas = configureApiSagas(deps, refreshJWT)

describe('API Sagas', () => {

  describe('configureApiSagas()', () => {
    it('should return an object', () => {
      expect(apiSagas).to.be.an('object')
    })
  })

  describe('watcher()', () => {
    it('should return a watcher generator function', () => {
      expect(apiSagas.watcher.constructor.name).to.be.equal('GeneratorFunction')
    })
  })

  describe('secureApiSaga', () => {

    const { secureApiSaga } = apiSagas
    const args = ['api/v1/test', 'GET', {}]

    it('should call jwtStore.get for the jwt token', () => {
      const saga = secureApiSaga(...args)
      expect(saga.next().value).to.be.deep.equal(call(deps.jwtStore.get))
    })

    it('should call apiFetch with baseURL, args passed and the token', () => {
      const saga = secureApiSaga(...args)
      const password = Symbol()
      saga.next()
      expect(saga.next({ password }).value)
        .to.be.deep.equal(call(apifetch, deps.baseURL, ...args, password))
    })

    it('should return the result of fetch (if successful)', () => {
      const saga = secureApiSaga(...args)
      const password = Symbol()
      const response = { some: { data: Symbol() }}
      saga.next()
      saga.next({ password })
      expect(saga.next(response).value)
        .to.be.deep.equal(response)
    })

    it('should throw any server errors other than 401 or 403', () => {
      const saga = secureApiSaga(...args)
      const password = Symbol()
      const apiError = new Error('Server 404')
      apiError.response = {
        status: 404,
      }
      saga.next()
      saga.next({ password })
      // Have to wrap the code you expect to throw an error in a function or the assertion won't work
      expect(() => saga.throw(apiError))
        .to.throw(apiError)
    })

    describe('no token or server response 401 or 403', () => {
      it('should call refresh token saga and repeat request if no token stored', () => {
        const saga = secureApiSaga(...args)
        const password = Symbol()
        saga.next()
        expect(saga.next().value) // No JWT token stored
          .to.be.deep.equal(call(refreshJWT))
        expect(saga.next().value)
          .to.be.deep.equal(call(deps.jwtStore.get))
        expect(saga.next({ password }).value) // Now JWT is defined post refresh
          .to.be.deep.equal(call(apifetch, deps.baseURL, ...args, password))
      })

      it('should call refresh token saga and repeat request on 401', () => {
        const saga = secureApiSaga(...args)
        const password = Symbol()
        const apiError = new Error('Server 401')
        apiError.response = {
          status: 401,
        }
        saga.next()
        saga.next({ password })
        expect(saga.throw(apiError).value)
          .to.be.deep.equal(call(refreshJWT))
        expect(saga.next().value)
          .to.be.deep.equal(call(deps.jwtStore.get))
        expect(saga.next({ password }).value)
          .to.be.deep.equal(call(apifetch, deps.baseURL, ...args, password))
      })

      it('should capture message and logout if fetch fails on second attempt', () => {
        const saga = secureApiSaga(...args)
        const password = Symbol()
        const apiError = new Error('Server 401')
        apiError.response = {
          status: 401,
        }
        saga.next()
        saga.next({ password })
        saga.throw(apiError)
        saga.next()
        saga.next({ password })
        expect(saga.throw(apiError).value)
          .to.be.deep.equal(put(logout()))
        expect(deps.Sentry.captureMessage).to.have.been.calledWith()
      })
    })


  })

})
