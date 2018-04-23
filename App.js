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

type Props = {};
export default class App extends Component<Props> {
  componentDidMount () {
  }

  render () {
    return (
      <View style={styles.container}>
        {/*<DatePicker minYear={2000} maxYear={2019} />*/}

        <Button
          onPress={() => {
            DatePicker.show({
              minYear: 2000,
              maxYear: 2019
            })
          }}
          title="选择日期" />
        <PopupStub ref={_ref => { if (_ref) { PopupStub.init(_ref) } }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
