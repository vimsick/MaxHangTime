import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const moment = require('moment');

class Timer extends Component {

  render() {
    const display = this.props.display;
    console.log(display);
    return (
      <View style={styles.container}> 
        <Text style={styles.timer}>
          {display}
        </Text>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  }
});
module.exports = Timer;
