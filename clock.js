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
  }

  render() {
    const display = this.props.display;

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
