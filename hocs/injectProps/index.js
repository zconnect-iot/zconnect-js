import React from 'react'

/*
  injectProps simply merges the injectedProps object with the wrapped components
  own props. If a function is passed it will inject the result of calling that
  function with own props. injectedProps with the same name will over-ride any
  own props
*/

export default function injectProps(propMap = {}) {
  return function injectPropsEnhancer(WrappedComponent) {
    function InjectProps(props) {
      const injectedProps = Object
        .entries(propMap)
        .reduce((toInject, [key, value]) => ({
          ...toInject,
          [key]: typeof value === 'function' ? value(props) : value,
        }), {})
      return <WrappedComponent {...props} {...injectedProps} />
    }
    InjectProps.displayName = `InjectProps(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return InjectProps
  }
}
