import { call, put, select } from 'redux-saga/effects'

import { logout } from '../../auth/actions'

import { apifetch, formatUrl } from '../utils'
import { requestPending, requestError, requestSuccess, requestCacheUsed } from '../actions'
import { selectTimeSinceLastFetch, selectResponse } from '../selectors'
import configureApiSagas from '../sagas'
import * as C from '../constants'

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
    securePost: {
      cache: 0,
      method: 'POST',
      url: 'api/v1/securePost',
      token: true,
    },
    insecurePost: {
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
const apiSagas = configureApiSagas(deps)

describe('API Sagas', () => {
  const {
    secureFetch, fetchSaga, secureApiSaga, apiRequest, processParams, processPayload, insecureFetch, refreshJWT,
  } = apiSagas

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

  describe('secureFetch', () => {
    const args = ['arg1', 'arg2', 'arg3']

    it('should call jwtStore.get for the jwt token', () => {
      const saga = secureFetch(...args)
      expect(saga.next().value).to.be.deep.equal(call(deps.jwtStore.get))
    })

    it('should call fetchSaga with args passed and the token', () => {
      const saga = secureFetch(args)
      const password = Symbol()
      saga.next()
      expect(saga.next({ password }).value)
        .to.be.deep.equal(call(fetchSaga, { ...args, token: password }))
    })

    it('should return the result of fetch (if successful)', () => {
      const saga = secureFetch(...args)
      const password = Symbol()
      const response = { some: { data: Symbol() } }
      saga.next()
      saga.next({ password })
      expect(saga.next(response).value)
        .to.be.deep.equal(response)
    })

    it('should throw any errors', () => {
      const saga = secureFetch(...args)
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
    const args = ['api/v1/test', 'GET', {}]

    it('should call jwtStore.get for the jwt token', () => {
      const saga = secureApiSaga(...args)
      expect(saga.next().value).to.be.deep.equal(call(deps.jwtStore.get))
    })

    it('should call secureFetch with args passed', () => {
      const saga = secureApiSaga(args)
      saga.next()
      expect(saga.next().value)
        .to.be.deep.equal(call(secureFetch, args))
    })

    it('should return the result of fetch (if successful)', () => {
      const saga = secureApiSaga(...args)
      const password = Symbol()
      const response = { some: { data: Symbol() } }
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
        saga.next()
        saga.next() // No JWT token returned by get
        expect(saga.throw(new Error("Can't find property 'password' of undefined (Or something)")).value)
          .to.be.deep.equal(call(refreshJWT))
      })

      it('should call refresh token saga and repeat request on 401', () => {
        const saga = secureApiSaga(args)
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
          .to.be.deep.equal(call(secureFetch, args))
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
        expect(saga.throw(apiError).value)
          .to.be.deep.equal(put(logout()))
        expect(deps.Sentry.captureMessage).to.have.been.calledWith()
      })
    })
  })

  describe('processParams', () => {
    it('returns non selector values as defined in the input', () => {
      const params = { a: 1, b: 2, c: 3 }
      const saga = processParams(params)
      expect(saga.next().value).to.deep.equal(params)
    })

    it("yield selects all params that are of type 'function', replacing with resulting value", () => {
      const params = { a: 1, b: () => {}, c: 3 }
      const selectB = Symbol()
      const saga = processParams(params)
      expect(saga.next().value).to.deep.equal(select(params.b))
      expect(saga.next(selectB).value).to.deep.equal({ a: 1, b: selectB, c: 3 })
    })
  })

  describe('processPayload', () => {
    it('returns non selector values as defined in the input', () => {
      const params = { a: 1, b: 2, c: 3 }
      const saga = processPayload(params)
      expect(saga.next().value).to.deep.equal(params)
    })

    it("yield selects all params that are of type 'function', replacing with resulting value", () => {
      const params = { a: 1, b: () => {}, c: 3 }
      const selectB = Symbol()
      const saga = processPayload(params)
      expect(saga.next().value).to.deep.equal(select(params.b))
      expect(saga.next(selectB).value).to.deep.equal({ a: 1, b: selectB, c: 3 })
    })
  })

  describe('apiRequest', () => {
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

    it('should call processPayload to yield select any selector params passed', () => {
      const action = makeAction({ endpoint: 'securePost' })
      const saga = apiRequest(action)
      saga.next()
      expect(saga.next().value).to.deep.equal(call(processPayload, {}))
    })

    it('should call formatUrl to convert processed params object into string', () => {
      const action = makeAction({ endpoint: 'secureGet' })
      const saga = apiRequest(action)
      const processedParams = Symbol()
      saga.next()
      saga.next(processedParams)
      expect(saga.next().value)
        .to.be.deep.equal(call(formatUrl, deps.endpoints.secureGet.url, processedParams))
    })

    describe('fetching', () => {
      const action = makeAction({ endpoint: 'secureGet' })

      it('should put REQUEST_PENDING action', () => {
        const saga = apiRequest(action)
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        saga.next()
        saga.next(processedParams)
        saga.next()
        expect(saga.next(formattedUrl).value)
          .to.be.deep.equal(put(requestPending('secureGet', processedParams)))
      })

      it('should call secureApiSaga if config.token is true', () => {
        const saga = apiRequest(action)
        const formattedUrl = Symbol()
        saga.next()
        saga.next()
        saga.next({})
        saga.next(formattedUrl)
        expect(saga.next().value)
          .to.be.deep.equal(call(secureApiSaga, {
            url: formattedUrl, method: 'GET', payload: {}, timeout: undefined,
          }))
      })

      it('should call insecureFetch if config.token is false', () => {
        const saga = apiRequest(makeAction({ endpoint: 'insecurePost' }))
        const formattedUrl = Symbol()
        saga.next()
        saga.next()
        saga.next({})
        saga.next(formattedUrl)
        expect(saga.next().value)
          .to.be.deep.equal(call(insecureFetch, {
            url: formattedUrl, method: 'POST', payload: {}, timeout: undefined,
          }))
      })
    })

    describe('fetched', () => {
      it('should put REQUEST_SUCCESS action with endpoint, params and response', () => {
        const saga = apiRequest(makeAction({ endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const response = { some: { server: 'response' } }
        saga.next()
        saga.next(processedParams)
        saga.next()
        saga.next(formattedUrl)
        saga.next()
        expect(saga.next(response).value)
          .to.be.deep.equal(put(requestSuccess('secureGet', processedParams, response)))
      })

      it('should return the response', () => {
        const saga = apiRequest(makeAction({ endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const response = { some: { server: 'response' } }
        saga.next()
        saga.next(processedParams)
        saga.next()
        saga.next(formattedUrl)
        saga.next()
        saga.next(response)
        expect(saga.next().value)
          .to.be.deep.equal(response)
      })
    })

    describe('failed', () => {
      it('should put REQUEST_ERROR action with endpoint, params and the error', () => {
        const saga = apiRequest(makeAction({ endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const apiError = new Error('Server 404')
        saga.next()
        saga.next(processedParams)
        saga.next()
        saga.next(formattedUrl)
        saga.next()
        expect(saga.throw(apiError).value)
          .to.be.deep.equal(put(requestError('secureGet', processedParams, apiError)))
      })

      it('should throw any errors if saga called directly', () => {
        const saga = apiRequest(makeAction({ endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const apiError = new Error('Server 404')
        saga.next()
        saga.next(processedParams)
        saga.next()
        saga.next(formattedUrl)
        saga.next()
        saga.throw(apiError)
        expect(() => saga.next())
          .to.throw(apiError)
      })

      it('should throw any errors if saga triggered by POLL_REQUEST', () => {
        const saga = apiRequest(makeAction({ type: C.POLL_REQUEST, endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const apiError = new Error('Server 404')
        saga.next()
        saga.next(processedParams)
        saga.next()
        saga.next(formattedUrl)
        saga.next()
        saga.throw(apiError)
        expect(() => saga.next())
          .to.throw(apiError)
      })

      it('should swallow any errors if saga triggered by REQUEST action', () => {
        const saga = apiRequest(makeAction({ type: C.REQUEST, endpoint: 'secureGet' }))
        const processedParams = Symbol()
        const formattedUrl = Symbol()
        const apiError = new Error('Server 404')
        saga.next()
        saga.next(processedParams)
        saga.next()
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
        saga.next(processedParams)
        expect(saga.next().value)
          .to.be.deep.equal(select(selectTimeSinceLastFetch, { endpoint, params: processedParams }))
      })

      it('should return cached response if data is not stale', () => {
        const endpoint = 'cache10000'
        const saga = apiRequest(makeAction({ endpoint }))
        const processedParams = Symbol()
        const cachedResponse = { some: { server: 'response' } }
        const timeSinceLastFetch = 9999
        saga.next()
        saga.next(processedParams)
        saga.next()
        saga.next(timeSinceLastFetch)
        expect(saga.next().value)
          .to.be.deep.equal(select(selectResponse, { endpoint, params: processedParams }))
        expect(saga.next(cachedResponse).value)
          .to.be.deep.equal(cachedResponse)
      })
      it('should not return cached response if data is stale', () => {
        const endpoint = 'cache10000'
        const saga = apiRequest(makeAction({ endpoint }))
        const processedParams = Symbol()
        const cachedResponse = { some: { server: 'response' } }
        const timeSinceLastFetch = 10001
        saga.next()
        saga.next(processedParams)
        saga.next(timeSinceLastFetch)
        expect(saga.next().value)
          .not.to.be.deep.equal(select(selectResponse, { endpoint, params: processedParams }))
        expect(saga.next(cachedResponse).value)
          .not.to.be.deep.equal(cachedResponse)
      })
    })
  })
})
