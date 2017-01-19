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
  Alert,
} from 'react-native';

import defaults from '../services/defaults';
import HoldService from '../services/HoldService';

const dataList = HoldService.findAll();
const smallCrimp = dataList.filtered("name = 'Small Crimp'")[0];
const sclist = smallCrimp.hangs;

export default class EditScreen extends Component {
  constructor(props) {
    console.log('>>> Holds!');
    console.log(dataList);

    super(props);
  }

  onDeletePressed() {
    console.log('>>> Delete Button Pressed!');
    HoldService.deleteAll(); 
  }

  render() {
    const alertMessage = 'Are you sure you want to delete all your data?';

    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
          <TouchableHighlight
            style={[styles.button, styles.stopButton]}
            underlayColor='#90ee90'
            // onPress={this.onDeletePressed.bind(this)}
            onPress={() => Alert.alert(
              'Confirm Delete',
              alertMessage,
              [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                { text: 'OK', onPress: () => { this.onDeletePressed(); } },
              ]
            )}
          >
            <Text style={styles.buttonText}>
              Delete All Data
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

module.exports = EditScreen;
