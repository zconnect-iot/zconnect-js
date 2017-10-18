import { Component, Children } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { selectLocaleCode } from '../selectors'
import dictionary from '../translations'


class Translator extends Component {
  getChildContext() {
    return {
      t: this.translate,
    }
  }
  translate = key => dictionary[this.props.locale][key] || dictionary.en[key] || key
  render() {
    return Children.only(this.props.children)
  }
}

Translator.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

Translator.childContextTypes = {
  t: PropTypes.func,
}

const mapStateToProps = state => ({
  locale: selectLocaleCode(state),
})

export default connect(
  mapStateToProps,
)(Translator)
