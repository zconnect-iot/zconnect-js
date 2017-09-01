import { delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import { selectRequestPollingInterval } from '../selectors'
import { stopPollApiRequest } from '../actions'
import configureApiSagas from '../sagas'


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

const makeAction = ({
  params = {},
  endpoint = 'getDevices',
  payload = {},
  type,
  interval,
} = {}) => ({ type, meta: { params, endpoint, interval }, payload })

describe('API Sagas', () => {

  describe('apiPoll', () => {
    const { apiPoll, apiRequest } = apiSagas

    it('should trigger an initial apiRequest passing the action', () => {
      const action = makeAction({ interval: 1000 })
      const saga = apiPoll(action)
      expect(saga.next().value)
        .to.be.deep.equal(call(apiRequest, action))
    })

    it('should set a delay for the interval specified', () => {
      const interval = 1000
      const action = makeAction({ interval })
      const saga = apiPoll(action)
      saga.next()
      expect(saga.next().value)
        .to.be.deep.equal(call(delay, interval))
    })

    it('should select the polling interval from the store for the request and params requested', () => {
      const endpoint = Symbol()
      const params = Symbol()
      const interval = 1000
      const saga = apiPoll( makeAction({ interval, endpoint, params }))
      saga.next()
      saga.next()
      expect(saga.next().value)
        .to.be.deep.equal(select(selectRequestPollingInterval, { endpoint, params }))
    })

    it('should repeat until selectRequestPollingInterval returns false', () => {
      const endpoint = Symbol()
      const params = Symbol()
      const interval = 1000
      const action =  makeAction({ interval, endpoint, params })
      const saga = apiPoll(action)

      saga.next() // Request
      saga.next() // Delay
      saga.next() // Select
      for (let i = 0; i < 100; i++) {
        expect(saga.next(interval).value)
          .to.be.deep.equal(call(apiRequest, action))
        saga.next()
        saga.next()
      }
      expect(saga.next(false).done)
        .to.be.equal(true)
    })

    it('should repeat until any error is thrown', () => {
      const endpoint = 'getDevices'
      const params = Symbol()
      const interval = 1000
      const action =  makeAction({ interval, endpoint, params })
      const saga = apiPoll(action)

      saga.next() // Request
      saga.next() // Delay
      saga.next() // Select
      for (let i = 0; i < 100; i++) {
        expect(saga.next(interval).value)
          .to.be.deep.equal(call(apiRequest, action))
        saga.next()
        saga.next()
      }
      saga.next(interval)
      expect(saga.throw(new Error("Some error or t'other")).value)
        .to.be.deep.equal(put(stopPollApiRequest(endpoint, params)))
      expect(saga.next().done).to.be.equal(true)
    })
  })
})
