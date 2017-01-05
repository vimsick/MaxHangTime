import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const formatHangs = require('./formatHangs');
const moment = require('moment');

class TimerScreen extends Component {
  render() {
    const yourTime = formatHangs(moment().format('YYYY-MM-DD'), 3);
    //this will probably get used when you click the stop button. 
    console.log(yourTime);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is where the timer goes.
        </Text>
        <TouchableHighlight>
          <Text style={styles.welcome}>
            This is where the stop button goes.
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'gray'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = TimerScreen;
