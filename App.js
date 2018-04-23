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
        {/*<DatePicker minYear={2000} maxYear={2019} />*/}

        <Text>已选择日期：{this.state.date || ''}</Text>
        <Button
          style={{
            marginTop: 8
          }}
          onPress={() => {
            DatePicker.show({
              minYear: 2000,
              maxYear: 2019,
              onComplete: (date) => {
                this.setState({date: moment(date).format('YYYY-MM-DD')})
              }
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
