import { Map, fromJS } from 'immutable'

import reducer from '../reducer'
import * as C from '../constants'

describe('API Reducer', () => {

  describe('Initial State', () => {
    it('initialises as an empty immutable map', () => {
      const state = reducer(undefined, { type: 'INITIALISE' })
      expect(state.isEmpty()).to.be.equal(true)
    })
  })

  describe('Request key', () => {
    it('adds a request key made up of the endpoint and params passed in action', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_PENDING, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      expect(state.has(fromJS({ endpoint, params }))).to.be.equal(true)
    })

    it('the request key used should be immutable', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_PENDING, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      params.test = 1
      expect(state.has(fromJS({ endpoint, params }))).to.be.equal(false)
      expect(state.has(fromJS({ endpoint, params: {} }))).to.be.equal(true)
    })

    it('the request key only contains endpoint and params keys', () => {
      const endpoint = Symbol()
      const params = Symbol()
      const interval = 10000
      const action = { type: C.POLL_REQUEST, meta: { endpoint, params, interval }}
      const state = reducer(undefined, action)
      expect(state.has(fromJS({ endpoint, params }))).to.be.equal(true)
    })
  })

  describe('REQUEST_PENDING', () => {

    it('sets the request pending flag true', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_PENDING, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'pending'])).to.be.equal(true)
    })

    it('sets the request error flag false', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_PENDING, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'error'])).to.be.equal(false)
    })

    it('sets the request success flag false', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_PENDING, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'success'])).to.be.equal(false)
    })
  })

  describe('REQUEST_SUCCESS', () => {

    it('converts the action payload to immutable and stores in response', () => {
      const endpoint = Symbol()
      const params = Symbol()
      const payload = { some: { js: 'data' } }
      const action = { type: C.REQUEST_SUCCESS, meta: { endpoint, params }, payload }
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'response'])).to.be.deep.equal(fromJS(payload))
    })

    it('sets the updated property to current timestamp', () => {
      const endpoint = Symbol()
      const params = Symbol()
      const payload = { some: { js: 'data' } }
      const action = { type: C.REQUEST_SUCCESS, meta: { endpoint, params }, payload }
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'updated']).slice(0, -2)).to.be.equal(new Date().toISOString().slice(0, -2))
    })

    it('sets the request pending flag false', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_SUCCESS, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'pending'])).to.be.equal(false)
    })

    it('sets the request error flag false', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_SUCCESS, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'error'])).to.be.equal(false)
    })

    it('sets the request success flag truue', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_SUCCESS, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'success'])).to.be.equal(true)
    })
  })

  describe('REQUEST_ERROR', () => {

    it('converts the action payload to immutable and stores in errorResponse', () => {
      const endpoint = Symbol()
      const params = Symbol()
      const payload = { some: { js: 'data' } }
      const action = { type: C.REQUEST_ERROR, meta: { endpoint, params }, payload }
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'errorResponse'])).to.be.deep.equal(fromJS(payload))
    })

    it('sets the request pending flag false', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_ERROR, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'pending'])).to.be.equal(false)
    })

    it('sets the request error flag true', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_ERROR, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'error'])).to.be.equal(true)
    })

    it('sets the request success flag false', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_ERROR, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'success'])).to.be.equal(false)
    })

    it('sets the request polling flag false', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.REQUEST_ERROR, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'polling'])).to.be.equal(false)
    })
  })

  describe('POLL_REQUEST', () => {
    it('sets the request polling flag to the action.meta.interval value', () => {
      const endpoint = Symbol()
      const params = Symbol()
      const interval = 10000
      const action = { type: C.POLL_REQUEST, meta: { endpoint, params, interval }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'polling'])).to.be.equal(interval)
    })
  })

  describe('STOP_POLL_REQUEST', () => {
    it('sets the request polling flag false', () => {
      const endpoint = Symbol()
      const params = {}
      const action = { type: C.STOP_POLL_REQUEST, meta: { endpoint, params }}
      const state = reducer(undefined, action)
      const key = fromJS({ endpoint, params })
      expect(state.getIn([key, 'polling'])).to.be.equal(false)
    })
  })
})
