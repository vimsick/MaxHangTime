import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ART,
  Dimensions,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import * as graphUtils from './graph-utils';

const {
  Group,
  Shape,
  Surface,
} = ART;

const PaddingSize = 20;
const TickWidth = PaddingSize * 2;

const dimensionWindow = Dimensions.get('window');

export default class Graph extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xAccessor: PropTypes.func.isRequired,
    yAccessor: PropTypes.func.isRequired,
  }

  static defaultProps = {
    width: Math.round(dimensionWindow.width * 0.9),
    height: Math.round(dimensionWindow.height * 0.5),
  };

  state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
  };

  componentWillMount() {
    this.computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.computeNextState(nextProps);
  }

  computeNextState(nextProps) {
    const {
      data,
      width,
      height,
      xAccessor,
      yAccessor,
    } = nextProps;

    const graphWidth = width - PaddingSize * 2;
    const graphHeight = height - PaddingSize * 2;

    const lineGraph = graphUtils.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
    });

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
      ticks: lineGraph.ticks,
      scale: lineGraph.scale
    });
  }

  render() {
    const {
      yAccessor,
    } = this.props;

    const {
      graphWidth,
      graphHeight,
      linePath,
      ticks,
      scale,
    } = this.state;

    const {
      x: scaleX,
    } = scale;

    const tickXFormat = scaleX.tickFormat(null, '%b %d');

    return (
      <View style={styles.container}>
        <Surface width={graphWidth} height={graphHeight}>
          <Group x={0} y={0}>
            <Shape
              d={linePath}
              stroke={'#FF9800'}
              strokeWidth={1.5}
            />
          </Group>
        </Surface>

        <View key={'ticksX'}>
          {ticks.map((tick, index) => {
            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - (TickWidth / 2);

            return (
              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
                {tickXFormat(tick.datum.date)}
              </Text>
            );
          })}
        </View>

        <View key={'ticksY'} style={styles.ticksYContainer}>
          {ticks.map((tick, index) => {
            const value = yAccessor(tick.datum);

            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - Math.round(TickWidth * 0.5);

            tickStyles.top = (tick.y + 2) - Math.round(TickWidth * 0.65);

            return (
              <View key={index} style={[styles.tickLabelY, tickStyles]}>
                <Text style={styles.tickLabelYText}>
                  {value} sec
                </Text>
              </View>
            );
          })}
        </View>

        <View
          key={'ticksYDot'}
          style={styles.ticksYContainer}
        >
          {ticks.map((tick, index) => (
            <View
              key={index}
              style={[styles.ticksYDot, {
                left: tick.x,
                top: tick.y,
              }]}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red'
  },
  tickLabelX: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    fontFamily: 'Heiti SC',
    textAlign: 'center',
    color: 'white',
  },
  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },
  tickLabelYText: {
    fontSize: 12,
    fontFamily: 'Heiti SC',
    textAlign: 'center',
    color: 'white',
  },
  ticksYDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 100
  },
});
