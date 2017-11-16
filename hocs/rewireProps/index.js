import React from 'react'

/*
  rewireProps provides a mechanism to rename props by providing a map e.g.
  rewireProps({ value: 'label' })(Link) results in any 'value' prop being renamed
  'label'. This is useful where you need two components to work together and can't
  or don't want to modify their existing API's
*/

export default function rewireProps(propMap = {}) {
  return function rewirePropsEnhancer(WrappedComponent) {
    function RewireProps(props) {
      const mappedProps = { ...props }
      Object.entries(propMap).forEach((entry) => {
        mappedProps[entry[1]] = props[entry[0]]
        delete mappedProps[entry[0]]
      })
      return <WrappedComponent {...mappedProps} />
    }
    RewireProps.displayName = `RewireProps(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return RewireProps
  }
}
