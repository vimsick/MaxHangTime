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

// import defaults from '../services/defaults';
import HoldService from '../services/HoldService';
import HoldModel from '../services/models/hold';

// this is just so I can see my database.
const dataList = HoldService.findAll();
const smallCrimp = dataList.filtered("name = 'Small Crimp'")[0];
const sclist = smallCrimp.hangs;

export default class EditScreen extends Component {
  constructor(props) {
    super(props);
    //this is so I can see my database.
    console.log('>>> Holds!');
    console.log(dataList);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.workout),
      restBetweenHolds: this.props.restBetweenHolds
    };
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

  render() {
    const alertMessage = 'Are you sure you want to delete all your data?';

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
        <Text style={styles.header}>
          Workout
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.workoutList}>{rowData}</Text>}
        />
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
            value={(this.state.restBetweenHolds).toString()}
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
