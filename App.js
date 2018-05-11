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
  View,
  WebView,
  Dimensions,
  ScrollView
} from 'react-native'
import { DatePicker } from './library'
import { PopupStub } from '@unpourtous/react-native-popup-stub'
import moment from 'moment'

type Props = {};
const {height, width} = Dimensions.get('window')
export default class App extends Component<Props> {
  constructor () {
    super(...arguments)
    this.state = {}
  }

  componentDidMount () {
  }

  render () {
    return (
      <ScrollView
        ref={(_ref) => {
          _ref && (this.ref = _ref)
        }}
        style={{flex: 1}}
        onScroll={(e) => {
        }}
        onScrollEndDrag={(e) => {
          console.log(e.nativeEvent.contentOffset.y)

          if (height + e.nativeEvent.contentOffset.y > 1200 && height + e.nativeEvent.contentOffset.y < 1400) {
            this.ref.scrollTo({
              y: e.nativeEvent.contentOffset.y - (height + e.nativeEvent.contentOffset.y - 1200),
              animated: true
            })
          } else if (height + e.nativeEvent.contentOffset.y > 1400) {
            this.ref.scrollTo({
              y: 1200,
              animated: true
            })
          }
        }}
        scrollEventThrottle={16}
        // snapToAlignment={'start'}
        // snapToInterval={300}
        contentContainerStyle={styles.container}>
        <View style={{flex: 1, alignSelf: 'stretch'}}>
          <View style={{
            backgroundColor: 'red',
            height: 1200,
            alignSelf: 'stretch'
          }}>
          </View>

          <View style={{
            backgroundColor: 'green',
            height: 1200,
            alignSelf: 'stretch'
          }}>
            {/*</View>*/}
            {/*<View style={{*/}
            {/*backgroundColor: 'yellow',*/}
            {/*height: 300,*/}
            {/*alignSelf: 'stretch'*/}
            {/*}}>*/}
            {/*</View>*/}
            {/*<View style={{*/}
            {/*backgroundColor: 'blue',*/}
            {/*height: 300,*/}
            {/*alignSelf: 'stretch'*/}
            {/*}}>*/}
            {/*</View>*/}
            {/*<View style={{*/}
            {/*backgroundColor: 'green',*/}
            {/*height: 300,*/}
            {/*alignSelf: 'stretch'*/}
            {/*}}>*/}
            {/*</View>*/}
            {/*<View style={{*/}
            {/*backgroundColor: 'yellow',*/}
            {/*height: 300,*/}
            {/*alignSelf: 'stretch'*/}
            {/*}}>*/}
            {/*</View>*/}
            {/*<View style={{*/}
            {/*backgroundColor: 'blue',*/}
            {/*height: 300,*/}
            {/*alignSelf: 'stretch'*/}
            {/*}}>*/}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
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
