// here is where we countdown between holds or between reps.
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Clock from '../components/clock';
import TimerScreen from './TimerScreen';

class CountdownScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: this.props.startCount
    };
    this.myCountdown = this.countdown();
  }

  countdown() {
    // Toggle the state every second (now how do I stop this when I click the stop button?)
    const timer = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });
      }, 1000);

    return timer;
  }

  _startTimer() {
    this.props.navigator.push({
      title: this.props.nextHold,
      component: TimerScreen,
      passProps: { nextHold: this.props.nextHold }
    });
  }

  componentDidUpdate() {
    if (this.state.timer <= 0) {
      clearInterval(this.myCountdown);
      this._startTimer();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timers}>
          <Clock
            display={this.state.timer}
          />
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
  timers: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = CountdownScreen;
