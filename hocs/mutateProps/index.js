import React from 'react'

/*
  mutateProps provides a mechanism to apply a function to specific props so that
  the result is passed to the wrapped component
*/

export default function mutateProps(propMap = {}) {
  return function mutatePropsEnhancer(WrappedComponent) {
    function MutateProps(props) {
      const mappedProps = { ...props }
      Object.entries(propMap).forEach(([prop, mutator]) => {
        mappedProps[prop] = mutator(props[prop], props)
      })
      return <WrappedComponent {...mappedProps} />
    }
    MutateProps.displayName = `MutateProps(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return MutateProps
  }
}
