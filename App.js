/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { DatePicker } from './library'
import { PopupStub } from '@unpourtous/react-native-popup-stub'
import moment from 'moment'
import ViewPlaceholder from './library/skeleton/ViewPlaceholder'
import ViewPlaceholder2 from './library/skeleton/ViewPlaceholder2'

type Props = {};
export default class App extends Component<Props> {
  constructor () {
    super(...arguments)
    this.state = {}
  }

  componentDidMount () {
  }

  render () {
    return (
      <View style={styles.container}>
        <ViewPlaceholder />
        <ViewPlaceholder2 />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
