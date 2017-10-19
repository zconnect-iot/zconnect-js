import React from 'react'
import PropTypes from 'prop-types'

const withTranslator = (WrappedComponent) => {
  const WithTranslator = (props, context) => <WrappedComponent {...props} t={context.t} />
  WithTranslator.contextTypes = {
    t: PropTypes.func,
  }
  return WithTranslator
}

export default withTranslator
