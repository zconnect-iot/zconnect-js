import * as eJSON from '../eJSON'
import { apifetch, formatUrl } from '../utils'

describe('UTILS', () => {
  describe('apifetch', () => {
    let sandbox
    let serializeEJSON
    let deserializeEJSON
    let fetch

    // Looks a bit weird but returns what fetch normally returns i.e. a Promise
    // that resolves an object with an ok boolean and a possibly, a json function
    // that resolves the parsed JSON if any was returned by server
    const makeResponse = ({
      payload,
      ok = true,
    } = {}) => Promise.resolve({
      ok,
      [payload ? 'json' : 'nojson']() {
        return new Promise((resolve, reject) => {
          resolve(payload)
        })
      },
    })

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      serializeEJSON = sandbox.stub(eJSON, 'serializeEJSON').returnsArg(0)
      deserializeEJSON = sandbox.stub(eJSON, 'deserializeEJSON').returnsArg(0)
      fetch = sandbox.stub(global, 'fetch')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('serialises the payload if POST request', () => {
      const response = makeResponse()
      fetch.returns(response)
      const method = 'POST'
      const baseURL = 'baseURL/'
      const url = 'url'
      const payload = { some: { body: 'data' } }
      return apifetch({
        baseURL, url, method, payload,
      })
        .then(expect(serializeEJSON).to.have.been.calledWith(payload))
    })

    // TODO: Fixx test
    xit('calls fetch with correct args', () => {
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

    describe('response ok', () => {
      it('returns the deserialised result of json() if present', () => {
        const payload = { some: { json: 'data' } }
        const response = makeResponse({ ok: true, payload })
        fetch.returns(response)

        const method = 'GET'
        const baseURL = 'baseURL/'
        const url = 'url'
        return apifetch(baseURL, url, method)
          .then((result) => {
            expect(deserializeEJSON).to.have.been.calledWith(payload)
            expect(result).to.be.deep.equal(payload)
          })
      })

      it('returns empty object if no json returned', () => {
        const response = makeResponse({ ok: true })
        fetch.returns(response)

        const method = 'GET'
        const baseURL = 'baseURL/'
        const url = 'url'
        return apifetch(baseURL, url, method)
          .then(result => expect(result).to.be.deep.equal({}))
      })
    })

    describe('response error', () => {
      it('throws an APIError', () => {
        const response = makeResponse({ ok: false })
        fetch.returns(response)

        const method = 'GET'
        const baseURL = 'baseURL/'
        const url = 'url'
        return apifetch(baseURL, url, method)
          .catch(error => expect(error.name).to.be.equal('APIError'))
      })
      it('throws an APIError with parsed json if server includes any', () => {
        const payload = { some: { error: 'data' } }
        const response = makeResponse({ ok: false, payload })
        fetch.returns(response)

        const method = 'GET'
        const baseURL = 'baseURL/'
        const url = 'url'
        return apifetch(baseURL, url, method)
          .catch((error) => {
            expect(error.name).to.be.equal('APIError')
            expect(error.response.json).to.be.deep.equal(payload)
          })
      })
    })
  })

  describe('formatUrl', () => {
    it('replaces variables in the url string with values in the params object', () => {
      const url = 'api/v1/devices/${deviceId}/data'
      const params = {
        deviceId: 123456789,
      }
      expect(formatUrl(url, params)).to.be.equal('api/v1/devices/123456789/data')
    })

    it('handles multiple string vars', () => {
      const url = 'api/v1/${param1}/${param2}/${param3}'
      const params = {
        param1: 'param1',
        param2: 'param2',
        param3: 'param3',
      }
      expect(formatUrl(url, params)).to.be.equal('api/v1/param1/param2/param3')
    })

    it('throws an error is a url param is missing in params object', () => {
      const url = 'api/v1/devices/${deviceId}/data'
      const params = {
        devId: 123456789,
      }
      expect(() => formatUrl(url, params)).to.throw()
    })

    it('appends any additional params provided as query parameters', () => {
      const url = 'api/v1/devices'
      const params = {
        param1: 'param1',
        param2: 'param2',
        param3: 'param3',
      }
      expect(formatUrl(url, params)).to.be.equal('api/v1/devices?param1=param1&param2=param2&param3=param3')
    })
  })
})
