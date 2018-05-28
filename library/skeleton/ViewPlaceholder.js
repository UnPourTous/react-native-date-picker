/**
 * Created by erichua on 28/05/2018.
 */

import Row from './Row'
import Column from './Column'
import React, { Component } from 'react'
import {
  View
} from 'react-native'

const backgroundColor = '#EEE'

const range = (min, max) => {
  return Math.floor((max - min) * Math.random() + min)
}
export default class ViewPlaceholder extends Component {
  static propTypes = {}

  render () {
    return (
      <Row style={{
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
      }}>
        <Column style={{}}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor,
              margin: 4
            }} />
          <View style={{width: 50, height: 20, backgroundColor, margin: 4}} />
        </Column>

        <Column style={{}}>
          <View style={{width: range(100, 200), height: 20, backgroundColor, margin: 4}} />
          <View style={{width: range(100, 200), height: 20, backgroundColor, margin: 4}} />
          <View style={{width: range(100, 200), height: 20, backgroundColor, margin: 4}} />
        </Column>
      </Row>
    )
  }
}
