import * as eJSON from '../eJSON'
import { apifetch } from '../utils'

describe('UTILS', () => {

  describe('apifetch', () => {
    let sandbox
    let serializeEJSON
    let deserializeEJSON
    let fetch
    const makeResponse = ({
      json = { some: { json: 'data' }},
      ok = true,
    } = {}) => Promise.resolve({
      ok,
      [json ? 'json' : 'nojson']() {
        return new Promise((resolve, reject) => {
          resolve(json)
        })
      },
    })

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      serializeEJSON = sandbox.stub(eJSON, 'serializeEJSON').returns('SERIALIZED_EJSON')
      deserializeEJSON = sandbox.stub(eJSON, 'deserializeEJSON').returns('DE_SERIALIZED_EJSON')
      fetch = sandbox.stub(global, 'fetch')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('serialises the body value if POST request', () => {
      const response = makeResponse()
      fetch.returns(response)
      const method = 'POST'
      const baseURL = 'baseURL/'
      const url = 'url'
      const body = { some: { body: 'data' }}
      return apifetch(baseURL, url, method, body)
        .then(expect(serializeEJSON).to.have.been.calledWith(body))
    })

    // TODO: Fixx test
    it('does a fetch', () => {
      const response = makeResponse()
      fetch.returns(response)
      const method = 'GET'
      const baseURL = 'baseURL/'
      const url = 'url'
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return apifetch(baseURL, url, method)
        .then(expect(fetch).to.have.been.calledWith('baseURL/url', {
          cache: 'default',
          headers,
          method: 'GET',
          mode: 'cors',
        }))
    })
  })
})
