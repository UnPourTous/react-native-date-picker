/**
 * Created by erichua on 28/05/2018.
 */

import React, { Component } from 'react'
import {
  View
} from 'react-native'

export default class Row extends Component {
  static propTypes = {}

  render () {
    return <View style={[{
      flexDirection: 'row',
      justifyContent: 'flex-start',
    }, this.props.style]}>
      {this.props.children}
    </View>
  }
}
