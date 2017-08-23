import { flattenObject } from '../utils'

describe('flattenObject()', () => {
  it('flattens nested objects', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: 'hello',
          },
        },
      },
    }
    const result = flattenObject(obj)
    expect(result).to.be.deep.equal({ _a_b_c_d: 'hello' })
  })

  it('handles crazy nested objects', () => {
    const obj = {
      a: {
        a: 'aa',
        b: {
          c: {
            a: 'abca',
            d: 'abcd',
          },
        },
        c: {
          a: {
            a: 'acaa',
          },
        },
      },
    }
    const result = flattenObject(obj)
    expect(result).to.be.deep.equal({
      _a_b_c_d: 'abcd',
      _a_b_c_a: 'abca',
      _a_a: 'aa',
      _a_c_a_a: 'acaa',
    })
  })

  it('allows naming path root', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: 'hello',
          },
        },
      },
    }
    const result = flattenObject(obj, 'hello')
    expect(result).to.be.deep.equal({ hello_a_b_c_d: 'hello' })
  })

  it('allows customising the divider used', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: 'hello',
          },
        },
      },
    }
    const result = flattenObject(obj, 'hello', '/')
    expect(result).to.be.deep.equal({ 'hello/a/b/c/d': 'hello' })
  })
})
