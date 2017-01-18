// here is where we countdown between holds or between reps.
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Clock from '../components/clock';
// import TimerScreen from './TimerScreen';

const formatHangs = require('../services/formatHangs');
const moment = require('moment');

class CountdownScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: true,
      timer: this.props.startCount,
    };
  }

  countdown() {
    console.log('countdown called');
    //this automatically stops when it gets to 0.
      const timer = setInterval(() => {
        (this.setState({ timer: this.state.timer - 1 }));
        if (this.state.timer <= 0) clearInterval(timer);
        this.setState({ countdown: false });
        }, 1000);

    return timer;
  }

  countup() {
    console.log('countup called');
    clearInterval(this.myCounter);
    // Toggle the state every second (now how do I stop this when I click the stop button?)
    const timer = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
      }, 1000);

    return timer;
  }

  startTimer() {
    console.log('startTimer called');
    clearInterval(this.myCounter);
    this.myCounter = this.countup();
  }

  stopTimer() {
    console.log('stopTimer called');
    clearInterval(this.myCounter);
    this.setState({ countdown: true });
    // if this is the last hold in the series, don't start the countdown again
    // this.myCounter = this.countdown();
  }


  onStopButtonPressed() {
    console.log('>>> Stop Button Pressed!');
    const duration = this.state.timer;
    const yourTime = formatHangs(moment().format('YYYY-MM-DD'), duration);
    console.log(yourTime);

    // stop the interval counting.
    this.stopTimer();
  }

  componentDidMount() {
    this.countdown();
  }

  componentDidUpdate() {
    if ((this.state.countdown === false) && (this.state.timer <= 1)) {
      console.log('countdown stopped, start the timer');
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.welcome, styles.headerText]}>
            {this.props.hold}
          </Text>
        </View>
        <View style={styles.timers}>
          <Text style={styles.header}>
            {this.state.title}
          </Text>
          <Clock
            display={this.state.timer}
          />
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

module.exports = CountdownScreen;
