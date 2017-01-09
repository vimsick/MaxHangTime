import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const moment = require('moment');

class Clock extends Component {
  constructor(props) {
  super(props);
  this.state = { time: 0 };

  // Toggle the state every second
  setInterval(() => {
    this.setState({ time: this.state.time + 1 });
    }, 1000);
  }

  render() {
    const display = this.state.time;

    return (
        <Text style={styles.clock}>
          {display}
        </Text>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clock: {
    textAlign: 'center',
    color: 'white',
  }
});
module.exports = Clock;
