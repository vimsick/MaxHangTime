/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

// import defaults from '../services/defaults';
import data from '../services/data';
import GraphView from '../components/GraphView';
import HoldService from '../services/HoldService';

const renderIf = require('../services/renderIf');
const EditScreen = require('./EditScreen');
const TimerScreen = require('./TimerScreen');
const dataList = HoldService.findAll();

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.holdIndex = 0;
    this.state = {
      hold: data[this.holdIndex].name,
      data: data[this.holdIndex].hangs,
    };

    // these are the defaults. need to figure out how to set them only once.
    AsyncStorage.setItem('workout', "['Small Crimp', 'Medium Crimp', 'Sloper', 'Two-finger Pocket', 'Mini Jug', 'Three-finger Pocket']");
    // AsyncStorage.setItem('restBetweenHolds', '3');
  }

  componentWillMount() {
    AsyncStorage.getItem('workout').then((token) => {
      let t = token;
      t = t.replace(/'/g, '"');
      t = JSON.parse(t);
      this.setState({
        workout: t
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

  onStartPressed() {
    console.log('>>> Start Button Pressed!');
    this._startRoutine(this.state.workout[0]); //will probably need to pass in the first timer or the collection of timers.
  }

  onEditPressed() {
    console.log('>>> Edit Button Pressed!');
    this._editRoutine();
  }

  viewNextHold() {
    this.holdIndex += 1;
    if (data[this.holdIndex] === undefined) {
      this.holdIndex = 0;
      this.setState({ hold: data[this.holdIndex].name, data: data[this.holdIndex].hangs });
    } else {
      this.setState({ hold: data[this.holdIndex].name, data: data[this.holdIndex].hangs });
    }
  }

  _startRoutine(hold) {
    this.props.navigator.push({
      title: 'Countdown',
      component: TimerScreen,
      passProps: {
        hold,
        startCount: 5,
        restCount: this.state.restBetweenHolds,
        workout: this.state.workout
      }
    });
  }

  _editRoutine() {
    this.props.navigator.push({
      title: 'Edit Workout',
      component: EditScreen,
      passProps: {
        restCount: this.state.restBetweenHolds,
        workout: this.state.workout
      }
    });
  }

  render() {
    console.log('workout from AsyncStorage');
    console.log(this.state.workout);

    return (
      <View style={styles.container}>
        { renderIf((this.state.data[0] !== undefined),
          <View style={styles.graph}>
            <View style={styles.flowRight}>
              <Text style={styles.welcome}>
                Your progress!
              </Text>
              <TouchableHighlight
                style={[styles.button, styles.buttonEdit]}
                underlayColor='#99d9f4'
                onPress={this.viewNextHold.bind(this)}
              >
                <Text style={styles.buttonText}>
                  See Next
                </Text>
              </TouchableHighlight>
            </View>
              <GraphView
                name={this.state.hold}
                data={this.state.data}
              />
          </View>)
        }
        <View style={styles.flowRight}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#90ee90'
            onPress={this.onStartPressed.bind(this)}
          >
            <Text style={styles.buttonText}>
              Start Routine
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, styles.buttonEdit]}
            underlayColor='#99d9f4'
            onPress={this.onEditPressed.bind(this)}
          >
            <Text style={styles.buttonText}>
              Edit Routine
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
    paddingTop: 60,
  },
  graph: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
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
  button: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00ff7f',
    borderColor: '#00ff7f',
    borderWidth: 1,
    borderRadius: 15,
    // marginBottom: 10,
    margin: 10,
    alignSelf: 'auto',
    justifyContent: 'center'
  },
  buttonEdit: {
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
  }
});

module.exports = WelcomeScreen;
