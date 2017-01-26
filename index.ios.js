import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  AsyncStorage
} from 'react-native';

const WelcomeScreen = require('./js/views/WelcomeScreen');

export default class MaxHangTime extends Component {

  render() {
    // load data when app loads, do not overwrite them if there's already a routine
    AsyncStorage.getItem('workout').then((obj) => {
      if (obj === undefined) {
        // default workout
        AsyncStorage.setItem('workout', "['Edge: Deep', 'Edge: Shallow', 'Jug', 'Pinch',   'Pocket: Medium']");

        // default rest between holds
        AsyncStorage.setItem('restBetweenHolds', '3');
      }
      console.log(AsyncStorage.getItem('workout'));
    });
    return (
      <NavigatorIOS
        style={styles.container}
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
