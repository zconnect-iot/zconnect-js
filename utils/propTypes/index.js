import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import XDate from 'xdate'

export const instanceOfXDate = PropTypes.instanceOf(XDate)

export const zcApiShape = ImmutablePropTypes.contains({
  pending: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
})

export const zcApiShapeJS = PropTypes.shape({
  pending: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
})

export const objectId = PropTypes.shape({
  oid: PropTypes.string.isRequired,
})

export const addressShape = PropTypes.shape({
  street_address: PropTypes.string,
  locality: PropTypes.string,
  region: PropTypes.string,
  poboxno: PropTypes.string,
  postalcode: PropTypes.string,
  country: PropTypes.string,
})
