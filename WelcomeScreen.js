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

import data from './js/services/data';
import GraphView from './js/components/GraphView';

const TimerScreen = require('./TimerScreen');


export default class WelcomeScreen extends Component {
  state = {
    hold: 'small crimp',
    data: data.smallCrimpData,
  };

  onStartPressed() {
    console.log('>>> Start Button Pressed!');
    this._startRoutine(); //will probably need to pass in the first timer or the collection of timers.
  }

  onEditPressed() {
    console.log('>>> Edit Button Pressed!');
  }

  viewNextHold() {
    this.setState({ hold: 'medium crimp', data: data.mediumCrimpData });
  }

  _startRoutine() {
    this.props.navigator.push({
      title: 'Timer',
      component: TimerScreen
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
    borderRadius: 8,
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
