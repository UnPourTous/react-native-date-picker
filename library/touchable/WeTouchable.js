import React, { Component } from 'react'
import WeTouchableHighlight from './WeTouchableHighlight'
import WeTouchableOpacity from './WeTouchableOpacity'
import WeTouchableMask from './WeTouchableMask'
import PropTypes from 'prop-types'

const keyMirror = require('fbjs/lib/keyMirror')
const PRESS_MODE = keyMirror({
  opacity: null,
  highlight: null,
  mask: null,
  none: null
})

class WeTouchable extends Component {
  static pressMode = PRESS_MODE
  static propTypes = {
    activeOpacity: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    isEnabled: PropTypes.bool,
    pressMode: PropTypes.oneOf([
      PRESS_MODE.opacity,
      PRESS_MODE.highlight,
      PRESS_MODE.mask,
      PRESS_MODE.none
    ]),

    // highlight
    activeColor: PropTypes.string,
    activeType: PropTypes.string
  }

  static defaultProps = {
    isEnabled: true
  }

  render () {
    let {
      onPress: originOnPress = () => {},
      throttleOnPress = true,
      isEnabled
    } = this.props
    let onPress = originOnPress
    if (throttleOnPress) {
      onPress = () => {
        if (!isEnabled) {
          console.log('别点了，喝杯水休息一下')
          return
        }
        originOnPress()
      }
    }

    switch (this.props.pressMode) {
      case PRESS_MODE.highlight:
        return (
          <WeTouchableHighlight {...this.props} onPress={onPress}>
            {this.props.children}
          </WeTouchableHighlight>
        )
      case PRESS_MODE.mask:
        return (
          <WeTouchableMask {...this.props} onPress={onPress}>
            {this.props.children}
          </WeTouchableMask>
        )
      case PRESS_MODE.none: {
        const props = {
          ...this.props,
          activeOpacity: 1
        }
        return (
          <WeTouchableOpacity {...props} onPress={onPress}>
            {this.props.children}
          </WeTouchableOpacity>
        )
      }
      default:
        return (
          <WeTouchableOpacity {...this.props} onPress={() => {
            onPress()
          }}>
            {this.props.children}
          </WeTouchableOpacity>
        )
    }
  }
}

WeTouchable.PressMode = PRESS_MODE

export default WeTouchable
