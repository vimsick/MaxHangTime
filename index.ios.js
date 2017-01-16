/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';

const WelcomeScreen = require('./js/views/WelcomeScreen');

export default class MaxHangTime extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        // navigationBarHidden={true}
        barTintColor='#2f4f4f'
        initialRoute={{
          title: 'Welcome',
          component: WelcomeScreen,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    backgroundColor: 'black',
    fontSize: 30,
    margin: 80
  },

  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('MaxHangTime', () => MaxHangTime);
