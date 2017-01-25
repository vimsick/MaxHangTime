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
} from 'react-native';

// import defaults from '../services/defaults';
import data from '../services/data';
import GraphView from '../components/GraphView';
import HoldService from '../services/HoldService';

const renderIf = require('../services/renderIf');
const EditScreen = require('./EditScreen');
const TimerScreen = require('./TimerScreen');


export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    // these are the defaults. need to figure out how to set them only once.

    this.holdIndex = 0;
    if (data[0] !== undefined) {
      this.state = {
        hold: data[this.holdIndex].name,
        data: data[this.holdIndex].hangs,
      };
    } else {
      this.state = {
        hold: 'default',
        data: {},
      };
    }
  }

  onStartPressed() {
    console.log('>>> Start Button Pressed!');
    this._startRoutine(); //will probably need to pass in the first timer or the collection of timers.
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

  viewFirstHold() {
    this.holdIndex = 0;
    this.setState({ hold: data[this.holdIndex].name, data: data[this.holdIndex].hangs });
  }

  _startRoutine() {
    this.props.navigator.push({
      title: 'Countdown',
      component: TimerScreen,
      passProps: {
        startCount: 5,
      }
    });
  }

  _editRoutine() {
    this.props.navigator.push({
      title: 'Edit Workout',
      component: EditScreen,
    });
  }

  render() {
    return (
      <View style={styles.container}>

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
          </View>

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
    color: 'gray',
    fontFamily: 'Heiti SC'
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
    alignSelf: 'center',
    fontFamily: 'Heiti SC',
    fontWeight: '400'
  },
  button: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3ae05b',
    borderColor: '#3ae05b',
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
