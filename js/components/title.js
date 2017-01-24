import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


class Title extends Component {

  render() {
    const header = this.props.header;
    const subheader = this.props.subheader;
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {header}
        </Text>
        <Text style={styles.subheaderText}>
          {subheader}
        </Text>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontFamily: 'Heiti SC',
    fontWeight: '400'
  },
  subheaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Heiti SC'
  }
});
module.exports = Title;
