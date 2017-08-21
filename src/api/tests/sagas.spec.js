import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { call, put, select } from 'redux-saga/effects'

import { apifetch, formatUrl } from '../utils'
import { requestFetching, requestFailed, requestFetched, requestCacheUsed } from '../actions'
import { selectTimeSinceLastFetch, selectRequestResponse } from '../selectors'
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
    secureGet: {
      cache: 0,
      method: 'GET',
      url: 'api/v1/secureGet',
      token: true,
    },
    insecureGet: {
      cache: 0,
      method: 'POST',
      url: 'api/v1/secureGet',
      token: false,
    },
    cache10000: {
      cache: 10000,
      method: 'GET',
      url: 'api/v1/secureGet',
      token: true,
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

  describe('secureApiSagaNoLogout', () => {
    const { secureApiSagaNoLogout } = apiSagas
    const args = ['arg1', 'arg2', 'arg3']

    it('should call jwtStore.get for the jwt token', () => {
      const saga = secureApiSagaNoLogout(...args)
      expect(saga.next().value).to.be.deep.equal(call(deps.jwtStore.get))
    })

    it('should call apiFetch with baseURL, args passed and the token', () => {
      const saga = secureApiSagaNoLogout(...args)
      const password = Symbol()
      saga.next()
      expect(saga.next({ password }).value)
        .to.be.deep.equal(call(apifetch, deps.baseURL, ...args, password))
    })

    it('should return the result of fetch (if successful)', () => {
      const saga = secureApiSagaNoLogout(...args)
      const password = Symbol()
      const response = { some: { data: Symbol() }}
      saga.next()
      saga.next({ password })
      expect(saga.next(response).value)
        .to.be.deep.equal(response)
    })

    it('should throw any errors', () => {
      const saga = secureApiSagaNoLogout(...args)
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

  describe('processParams', () => {
    const { processParams } = apiSagas

    it('returns non selector values as defined in the input', () => {
      const params = { a: 1, b: 2, c: 3 }
      const saga = processParams(params)
      expect(saga.next().value).to.deep.equal(params)
    })

    it("yield selects all params that are of type 'function', replacing with resulting value", () => {
      const params = { a: 1, b: () => {}, c: 3}
      const selectB = Symbol()
      const saga = processParams(params)
      expect(saga.next().value).to.deep.equal(select(params.b))
      expect(saga.next(selectB).value).to.deep.equal({ a: 1, b: selectB, c: 3 })
    })
  })

  describe('apiRequest', () => {
    const { apiRequest, processParams, secureApiSaga, insecureApiSaga } = apiSagas
    const makeAction = ({
      params = {},
      endpoint = 'getDevices',
      payload = {},
      type,
    } = {}) => ({ type, meta: { params, endpoint }, payload })

    it('should call processParams to yield select any selector params passed', () => {
      const action = makeAction({ endpoint: 'secureGet' })
      const saga = apiRequest(action)
      expect(saga.next().value).to.deep.equal(call(processParams, {}))
    })

    it('should call formatUrl to convert processed params object into string', () => {
      const action = makeAction({ endpoint: 'secureGet' })
      const saga = apiRequest(action)
      const processedParams = Symbol()
      saga.next()
      expect(saga.next(processedParams).value)
        .to.be.deep.equal(call(formatUrl, deps.endpoints.secureGet.url, processedParams))
    })

    describe('fetching', () => {
      const action = makeAction({ endpoint: 'secureGet' })

      it('should put REQUEST_FETCHING action', () => {
        const saga = apiRequest(action)
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        saga.next()
        saga.next(processedParams)
        expect(saga.next(formattedUrl).value)
          .to.be.deep.equal(put(requestFetching('secureGet', processedParams)))
      })

      it('should call secureApiSaga if config.token is true', () => {
        const saga = apiRequest(action)
        const formattedUrl = Symbol()
        saga.next()
        saga.next()
        saga.next(formattedUrl)
        expect(saga.next().value)
          .to.be.deep.equal(call(secureApiSaga, formattedUrl, 'GET', {}))
      })

      it('should call insecureApiSaga if config.token is false', () => {
        const saga = apiRequest(makeAction({ endpoint: 'insecureGet' }))
        const formattedUrl = Symbol()
        saga.next()
        saga.next()
        saga.next(formattedUrl)
        expect(saga.next().value)
          .to.be.deep.equal(call(insecureApiSaga, formattedUrl, 'POST', {}))
      })
    })

    describe('fetched', () => {
      it('should put REQUEST_FETCHED action with endpoint, params and response', () => {
        const saga = apiRequest(makeAction({ endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const response = { some: { server: 'response' }}
        saga.next()
        saga.next(processedParams)
        saga.next(formattedUrl)
        saga.next()
        expect(saga.next(response).value)
          .to.be.deep.equal(put(requestFetched('secureGet', processedParams, response)))
      })

      it('should return the response', () => {
        const saga = apiRequest(makeAction({ endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const response = { some: { server: 'response' }}
        saga.next()
        saga.next(processedParams)
        saga.next(formattedUrl)
        saga.next()
        saga.next(response)
        expect(saga.next().value)
          .to.be.deep.equal(response)
      })
    })

    describe('failed', () => {
      it('should put REQUEST_FAILED action with endpoint, params and the error', () => {
        const saga = apiRequest(makeAction({ endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const apiError = new Error('Server 404')
        saga.next()
        saga.next(processedParams)
        saga.next(formattedUrl)
        saga.next()
        expect(saga.throw(apiError).value)
          .to.be.deep.equal(put(requestFailed('secureGet', processedParams, apiError)))
      })

      it('should throw any errors if saga called directly', () => {
        const saga = apiRequest(makeAction({ endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const apiError = new Error('Server 404')
        saga.next()
        saga.next(processedParams)
        saga.next(formattedUrl)
        saga.next()
        saga.throw(apiError)
        expect(() => saga.next())
          .to.throw(apiError)
      })

      it('should swallow any errors if saga triggered by REQUEST action', () => {
        const saga = apiRequest(makeAction({ type: 'REQUEST', endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const apiError = new Error('Server 404')
        saga.next()
        saga.next(processedParams)
        saga.next(formattedUrl)
        saga.next()
        saga.throw(apiError)
        expect(() => saga.next())
          .not.to.throw(apiError)
      })
    })

    describe('caching', () => {
      it('should select the time since last fetch for given request if config.cache set', () => {
        const endpoint = 'cache10000'
        const saga = apiRequest(makeAction({ endpoint }))
        const processedParams = Symbol()
        saga.next()
        expect(saga.next(processedParams).value)
          .to.be.deep.equal(select(selectTimeSinceLastFetch, { endpoint, params: processedParams }))
      })

      it('should return cached response if data is not stale', () => {
        const endpoint = 'cache10000'
        const saga = apiRequest(makeAction({ endpoint }))
        const processedParams = Symbol()
        const cachedResponse = { some: { server: 'response' }}
        const timeSinceLastFetch = 9999
        saga.next()
        saga.next(processedParams)
        saga.next(timeSinceLastFetch)
        expect(saga.next().value)
          .to.be.deep.equal(select(selectRequestResponse, { endpoint, params: processedParams }))
        expect(saga.next(cachedResponse).value)
          .to.be.deep.equal(cachedResponse)
      })
      it('should not return cached response if data is stale', () => {
        const endpoint = 'cache10000'
        const saga = apiRequest(makeAction({ endpoint }))
        const processedParams = Symbol()
        const cachedResponse = { some: { server: 'response' }}
        const timeSinceLastFetch = 10001
        saga.next()
        saga.next(processedParams)
        saga.next(timeSinceLastFetch)
        expect(saga.next().value)
          .not.to.be.deep.equal(select(selectRequestResponse, { endpoint, params: processedParams }))
        expect(saga.next(cachedResponse).value)
          .not.to.be.deep.equal(cachedResponse)
      })
    })
  })
})
