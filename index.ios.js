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
  NavigatorIOS,
  AsyncStorage
} from 'react-native';

const WelcomeScreen = require('./js/views/WelcomeScreen');

export default class MaxHangTime extends Component {

  render() {
    // this seems to load them when the app loads (if you don't force close the app and reopen, then it doesn't overwite them.)

    // AsyncStorage.getItem('workout').then((obj) => {
    //   if (obj === undefined) {
        AsyncStorage.setItem('workout', "['Small Crimp', 'Medium Crimp', 'Sloper', 'Two-finger Pocket', 'Mini Jug', 'Three-finger Pocket']");

        AsyncStorage.setItem('restBetweenHolds', '3');
      // }
      // console.log(AsyncStorage.getItem('workout'));
    // });
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
