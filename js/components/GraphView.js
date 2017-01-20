import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Color from '../services/color';

import Graph from './Graph';

// eslint-disable-next-line react/prefer-stateless-function
export default class GraphView extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }

  render() {
    const {
      name,
      data: graphData
    } = this.props;

    console.log('>>>>>>>');
    console.log(graphData);

    const graphProps = {};
    graphProps.data = graphData;
    graphProps.xAccessor = (d) => d.date;
    graphProps.yAccessor = (d) => d.duration;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {name}
        </Text>
        <View style={styles.content}>
          <Graph {...graphProps} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: Color.Black,
  },
  headerButton: {
    paddingBottom: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: Color.BlueDark,
  },
  headerText: {
    color: Color.White,
    fontSize: 24,
  },
  content: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  },
});
