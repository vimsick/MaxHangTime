import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = (<Icon name="rocket" size={30} color="white" />);

class DeleteButton extends Component {

  render() {
    return (
      // <View style={styles.customButton}>
        <Text style={styles.iconText}>
          {myIcon}
        </Text>
      // </View>
    );
  }

}
const styles = StyleSheet.create({
  customButton: {
    backgroundColor: 'red',
    // underlayColor: 'rgba(0, 0, 1, 0.6)',
    alignItems: 'center',
  },
  iconText: {
    textAlign: 'center',
  },
});
module.exports = DeleteButton;
