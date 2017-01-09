
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Clock from './clock';

const formatHangs = require('./formatHangs');
const moment = require('moment');

class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
       hold: 'Small Crimp', // this should come from the list of holds in the routine.
       startTime: moment()
    };
  }

  onStopButtonPressed() {
    console.log('>>> Stop Button Pressed!');

    // figuring out how long between page load and when you click stop button
    const duration = moment().diff(this.state.startTime, 'seconds');
    const yourTime = formatHangs(moment().format('YYYY-MM-DD'), duration);
    console.log(yourTime);

    // this should get the NEXT hold in the routine
    // or if there aren't any, direct to the done with workout screen.)
    this.setState({ hold: 'Medium Crimp' });
    // and then render the rest screen.

    // getting ready for next hold (should live on resting page.)
    this.setState({ startTime: moment() });
  }

  render() {
    console.log(this.state.hold);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.welcome, styles.headerText]}>
            {this.state.hold}
          </Text>
        </View>
        <View style={styles.timers}>
          <Clock />
        </View>
        <View style={styles.flowRight}>
          <TouchableHighlight
            style={styles.stopButton}
            underlayColor='#f08080'
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
  header: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    marginBottom: 40,
    fontSize: 25,
    fontWeight: 'bold'
  },
  timers: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
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
