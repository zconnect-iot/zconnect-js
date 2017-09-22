import React from 'react'
import { Iterable } from 'immutable'

const toJS = WrappedComponent => (wrappedComponentProps) => {
  const KEY = 0
  const VALUE = 1

  const propsJS = Object
    .entries(wrappedComponentProps)
    .reduce((newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
        wrappedComponentProp[VALUE]
      )
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE]
      return newProps
    }, {})
  return React.createElement(WrappedComponent, { ...propsJS })
  // return <WrappedComponent {...propsJS} />
  // TODO: Work out why this jsx is not transpiled in zconnect-web-template
}

export default toJS
