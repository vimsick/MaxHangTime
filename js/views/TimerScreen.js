// here is where we countdown between holds or between reps.
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import Clock from '../components/clock';
import Title from '../components/title';
import HoldService from '../services/HoldService';
import HoldModel from '../services/models/hold';

const renderIf = require('../services/renderIf');
const formatHangs = require('../services/formatHangs');


class TimerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: true,
      timer: this.props.startCount,
      title: 'Get Ready!',
      holdIndex: 0,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('workout').then((token) => {
      let t = token;
      t = t.replace(/'/g, '"');
      t = JSON.parse(t);
      this.setState({
        workout: t,
        subtitle: `Next Up: ${t[0]}`,
      });
    });

    AsyncStorage.getItem('restBetweenHolds').then((token) => {
      let t = token;
      t = t.replace(/'/g, '"');
      t = JSON.parse(t);
      this.setState({
        restBetweenHolds: t
      });
    });
  }

  componentDidMount() {
    //the first time.
    this.myCounter = this.countdown();
  }

  componentDidUpdate() {
    if ((typeof this.state.timer !== 'string') && (this.state.countdown === false) && (this.state.timer <= 1)) {
      console.log('countdown stopped, start the timer');
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.myCounter);
  }

  maxDuration(hold) {
    //returns the hold and list of hangs for this hold from realm.
    let thisHold = HoldService.find(hold);

    //just in case a hold gets added to the workout and it hasn't been added to the database yet.
    if (thisHold === undefined) {
      HoldService.save(new HoldModel(hold));
      thisHold = HoldService.find(hold);
    }

    console.log('in max duration');
    console.log(hold.hangs);


    if (thisHold.hangs[0] !== undefined) {
      const theseHangs = thisHold.hangs;
      const max = theseHangs.sorted('duration', true)[0].duration;
      console.log('now max durawtion?');
      console.log(max);
      return max;
    }
    return '-';
  }

  countdown() {
    console.log('countdown called');

    //this automatically stops when it gets to 0.
      const timer = setInterval(() => {
        (this.setState({ timer: this.state.timer - 1 }));
        if (this.state.timer <= 0) {
          this.setState({
            title: this.state.workout[this.state.holdIndex],
            countdown: false,
            subtitle: `Your Best Time is: ${this.maxDuration(this.state.workout[this.state.holdIndex])}`,
            holdIndex: this.state.holdIndex + 1,
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
    this.setState({ countdown: true, timer: this.state.restBetweenHolds });

    this.startCountDown();
  }

  startCountDown() {
    console.log('startCountDown called');
    console.log(this.state.holdIndex);
    // if this is the last hold in the series, don't start the countdown again
    if (typeof this.state.workout[this.state.holdIndex] === 'undefined') {
      clearInterval(this.myCounter);
      this.setState({
        // countdown: false,
        title: 'Good Work!',
        subtitle: '',
        timer: '',
      })
    } else {
        this.myCounter = this.countdown();
        this.setState({
          title: 'Resting',
          subtitle: `Next up: ${this.state.workout[this.state.holdIndex]}`
        });
    }
  }


  onStopButtonPressed() {
    console.log('>>> Stop Button Pressed!');
    const duration = this.state.timer;
    const yourTime = formatHangs(new Date(), duration);
    console.log(yourTime);

    //for now, save data for every run of the timer.
    const hold = this.state.title;
    HoldService.addHang(hold, yourTime);

    // stop the interval counting.
    this.stopTimer();
  }

  onSeeProgress() {
    console.log('>>see progress button pressed!')
    this.props.navigator.pop();
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
    borderRadius: 20,
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
