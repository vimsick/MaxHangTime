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

  onStopButtonPressed() {
    console.log('>>> Stop Button Pressed!');
  }

  render() {
    const yourTime = formatHangs(moment().format('YYYY-MM-DD'), 3);
    //this will probably get used when you click the stop button.
    console.log(yourTime);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is where the timer goes.
        </Text>
        <View style={styles.flowRight}>
          <TouchableHighlight
            style={styles.stopButton}
            underlayColor='red'
            onPress={this.onStopButtonPressed.bind(this)}
          >
            <Text style={styles.buttonText}>
              Stop
            </Text>
          </TouchableHighlight>
        </View>
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
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  stopButton: {
    height: 50,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 25,
    margin: 10,
    alignSelf: 'auto',
    justifyContent: 'center'
  }
});

module.exports = TimerScreen;
