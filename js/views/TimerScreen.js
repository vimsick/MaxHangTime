// here is where we countdown between holds or between reps.
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Clock from '../components/clock';
import Title from '../components/title';
import defaults from '../services/defaults';

const renderIf = require('../services/renderIf');
const formatHangs = require('../services/formatHangs');
const moment = require('moment');

class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: true,
      timer: this.props.startCount,
      title: 'Get Ready!',
      subtitle: `Next Up: ${defaults.workout[0]}`,
      holdIndex: 0,
    };
  }

  countdown() {
    console.log('countdown called');
    //this automatically stops when it gets to 0.
      const timer = setInterval(() => {
        (this.setState({ timer: this.state.timer - 1 }));
        if (this.state.timer <= 0) {
          this.setState({
            title: defaults.workout[this.state.holdIndex],
            countdown: false,
            subtitle: '',
          });
          clearInterval(timer);
        }
        console.log(this.state.countdown);
      }, 1000);

    return timer;
  }

  countup() {
    console.log('countup called');

    clearInterval(this.myCounter);
    // Toggle the state every second (now how do I stop this when I click the stop button?)
    // this.setState({ timer: 0 });
    const timer = setInterval(() => {
      this.setState({ timer: this.state.timer + 1, });
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
    this.setState({ countdown: true, timer: this.props.restCount, holdIndex: this.state.holdIndex + 1 });

    this.startCountDown();
  }

  startCountDown() {
    console.log('startCountDown called');
    console.log(this.state.holdIndex);
    // if this is the last hold in the series, don't start the countdown again
    if (typeof defaults.workout[this.state.holdIndex + 1] === 'undefined') {
      clearInterval(this.myCounter);
      this.setState({
        // countdown: false,
        title: 'Good Work!',
        timer: '',
      })
    } else {
        this.myCounter = this.countdown();
        this.setState({
          title: 'Resting',
          subtitle: `Next up: ${defaults.workout[this.state.holdIndex + 1]}`
        })
    }
  }


  onStopButtonPressed() {
    console.log('>>> Stop Button Pressed!');
    const duration = this.state.timer;
    const yourTime = formatHangs(moment().format('YYYY-MM-DD'), duration);
    console.log(yourTime);

    // stop the interval counting.
    this.stopTimer();
  }

  onSeeProgress() {
    console.log('>>see progress button pressed!')
    this.props.navigator.pop();
  }

  componentDidMount() {
    //the first time.
    this.countdown();
  }

  componentDidUpdate() {
    if ((typeof this.state.timer !== 'string') && (this.state.countdown === false) && (this.state.timer <= 1)) {
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
            <Title
              header={this.state.title}
              subheader={this.state.subtitle}
            />
        <View style={styles.timers}>
          <Clock
            display={this.state.timer}
          />
        </View>
        <View style={styles.flowRight}>
          { renderIf(!(this.state.countdown), <TouchableHighlight
            style={[styles.button, styles.stopButton]}
            underlayColor='#f08080'
            onPress={this.onStopButtonPressed.bind(this)}
          >
            <Text style={styles.buttonText}>
              Stop
            </Text>
          </TouchableHighlight>)
          }
          { renderIf(this.state.title === 'Good Work!',
            <TouchableHighlight
              style={styles.button}
              onPress={this.onSeeProgress.bind(this)}
            >
              <Text style={styles.buttonText}>
                See Progress
              </Text>
            </TouchableHighlight>
         )}
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
  button: {
    height: 50,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 25,
    // marginBottom: 10,
    margin: 10,
    alignSelf: 'auto',
    justifyContent: 'center'
  },
  stopButton: {
    backgroundColor: 'red',
    borderColor: 'red',
  }
});

module.exports = TimerScreen;
