import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import XDate from 'xdate'

export const instanceOfXDate = PropTypes.instanceOf(XDate)

export const zcApiShape = ImmutablePropTypes.contains({
  pending: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
})
