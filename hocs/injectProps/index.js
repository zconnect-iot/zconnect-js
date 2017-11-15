import React from 'react'

/*
  injectProps simply merges the injectedProps object with the wrapped components
  own props. injectedProps with the same name will over-ride any own props
*/

export default function injectProps(injectedProps = {}) {
  return function injectPropsEnhancer(WrappedComponent) {
    function InjectProps(props) {
      return <WrappedComponent {...props} {...injectedProps} />
    }
    InjectProps.displayName = `InjectProps(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return InjectProps
  }
}
