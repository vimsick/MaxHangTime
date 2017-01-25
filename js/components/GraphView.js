import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import Color from '../services/color';

import Graph from './Graph';

const renderIf = require('../services/renderIf');

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

    const dimensionWindow = Dimensions.get('window');
    const graphProps = {};

    graphProps.data = graphData;
    graphProps.xAccessor = (d) => d.date;
    graphProps.yAccessor = (d) => d.duration;
    this.width = Math.round(dimensionWindow.width * 0.9) - 40; //this is to get the size of this window to be the same size as the graph?

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {name}
        </Text>
        { renderIf((this.props.data[0] !== undefined),
          <View style={styles.content}>
            <Graph {...graphProps} />
          </View>
        )}
        {renderIf((this.props.data[0] === undefined),
            <View style={[styles.content, { width: this.width, justifyContent: 'center' }]}>
              <Text style={styles.welcome}>
                No Data
              </Text>
            </View>
        )}

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
    fontFamily: 'Heiti SC'
  },
  content: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'gray',
    fontFamily: 'Heiti SC'
  },
});
