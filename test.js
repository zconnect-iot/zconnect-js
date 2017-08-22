import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

global.expect = chai.expect
global.sinon = sinon

// Fetch expects the following globals to be defined
global.fetch = () => {}

global.Headers = function () {
  this.headers = ''
  this.append = (key, val) => this.headers = `${key}:${val}`
  return this
}
