'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ListView,
  TouchableHighlight,
  Alert,
  AsyncStorage
} from 'react-native';

import Swipeout from '@maintained-repos/react-native-swipeout';

// import defaults from '../services/defaults';
import HoldService from '../services/HoldService';
import HoldModel from '../services/models/hold';


const renderIf = require('../services/renderIf');

// this is just so I can see my database.
const dataList = HoldService.findAll();
const smallCrimp = dataList.filtered("name = 'Small Crimp'")[0];
const sclist = smallCrimp.hangs;

class EditScreen extends Component {
  constructor(props) {
    super(props);
    //this is so I can see my database.
    console.log('>>> Holds!');
    console.log(dataList);

    this.state = {
      workout: ['waiting'] //initial state until data comes back from AsyncStorage.
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('restBetweenHolds').then((token) => {
      let t = token;
      t = t.replace(/'/g, '"');
      this.setState({
        restBetweenHolds: t //t is a string in this component!
      });
    });

    this._makeListData(); //initial state, gets called again after workout is set from AsyncStorage.
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _makeListData(){
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(this.state.workout),
    });
  }

  async _loadInitialState() {
    try {
      const token = await AsyncStorage.getItem('workout');
      if (token !== null) {
        console.log('workout from async on edit');
        let t = token;
        t = t.replace(/'/g, '"');
        t = JSON.parse(t);
        this.setState({
          workout: t,
        });
        this._makeListData();
      }
    } catch (error) {
      console.log('error getting workout from edit screen');
    }
  }

  onDeletePressed() {
    console.log('>>> Delete Button Pressed!');
    HoldService.deleteAll();

    //NOTE: this is broken, because the welcome screen is still referencing the deleted data.
    // this.props.navigator.pop();
  }

  onAddPressed() {
    console.log('add hold pressed!');
  }

  changeRestTime(event) {
    console.log('trying to change the time');
    const time = event.nativeEvent.text;
    this.setState({ restBetweenHolds: time }); //this is a string.
    console.log(this.state.restBetweenHolds);

    if (!isNaN(parseInt(time, 10))) {
      //write to Async, otherwise, don't.
      console.log(time);
      AsyncStorage.setItem('restBetweenHolds', time);
    }
  }

  rowPressed() {
    console.log('row pressed!');
  }

  deleteHold(hold) {
    console.log('delete hold');
    console.log(hold);
    const arr = this.state.workout;

    const index = arr.indexOf(hold);
    if (index >= 0) {
      arr.splice(index, 1);
      this.setState({ workout: arr });
    }
  }

  renderRow(rowData) {
    const swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 1, 0.6)',
      onPress: () => { this.deleteHold(rowData); }
    }];

    return (
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        backgroundColor='transparent'
      >
        <TouchableHighlight
          underlayColor='lightblue'
          onPress={this.rowPressed.bind(this)}
          style={{ borderRadius: 10 }}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.workoutList}> {rowData} </Text>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  render() {
    const alertMessage = 'Are you sure you want to delete all your data?';

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
        <Text style={styles.header}>
          Workout
        </Text>
        { renderIf(this.state.workout !== ['waiting'],
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />)}
        <View style={styles.flowRight}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onAddPressed.bind(this)}
          >
            <Text style={styles.buttonText}>
              Add a Hold
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ height: 13 }} />
        <Text style={styles.header}>
          Rest Between Holds
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.numberEntry}
            maxLength={3}
            value={(this.state.restBetweenHolds)}
            placeholder='sec'
            onChange={this.changeRestTime.bind(this)}
          />
        </View>
        <Text style={styles.header}>
          Number of Reps
        </Text>
        <Text style={styles.header}>
          Rest Between Reps
        </Text>
        <View style={styles.flowRight}>
          <TouchableHighlight
            style={[styles.button, styles.stopButton]}
            underlayColor='#ff8080'
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
      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  header: {
    color: 'white',
    textAlign: 'left',
    fontSize: 30,
    // marginBottom 5,
    padding: 5,
    // fontWeight: 'bold',
  },
  workoutList: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5,
    padding: 5,
    paddingLeft: 10,
    fontSize: 25,
  },
  numberEntry: {
    backgroundColor: 'gray',
    height: 40,
    width: 100,
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    alignSelf: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'stretch'
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
