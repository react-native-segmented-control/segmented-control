/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import SegmentedControl from '../../js';

export default class App extends React.Component<{}, $FlowFixMeState> {
  state = {
    values: ['One', 'Two', 'Three'],
    value: 'Unselected',
    selectedIndex: undefined,
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.segmentContainer}>
          <Text style={styles.text}>
            Segmented controls can have values and images
          </Text>
          <SegmentedControl
            values={['One', 'Two', require('../assets/images/user.png')]}
          />
        </View>
        <View style={styles.segmentSection}>
          <SegmentedControl
            values={[
              'One\nOne',
              'Two',
              require('../assets/images/user.png'),
              'Three',
              'Four',
              'Five',
            ]}
          />
        </View>
        <View style={styles.segmentSection}>
          <Text style={styles.text}>
            Segmented controls can have pre-selected values
          </Text>
          <SegmentedControl values={['One', 'Two']} selectedIndex={0} />
        </View>
        <View style={styles.segmentSection}>
          <Text style={styles.text}>Segmented controls can be momentary</Text>
          <SegmentedControl values={['One', 'Two']} momentary={true} />
        </View>
        <View style={styles.segmentSection}>
          <Text style={styles.text}>Segmented controls can be disabled</Text>
          <SegmentedControl
            enabled={false}
            values={['One', 'Two']}
            selectedIndex={1}
          />
        </View>
        <View style={styles.segmentContainer}>
          <Text style={styles.text}>Custom colors can be provided</Text>
          <SegmentedControl
            tintColor="#ff0000"
            values={['One', 'Two', 'Three', 'Four']}
            selectedIndex={0}
            backgroundColor="#0000ff"
          />
        </View>
        <View style={styles.segmentContainer}>
          <SegmentedControl
            tintColor="#00ff00"
            values={['One', 'Two', 'Three']}
            selectedIndex={1}
          />
        </View>
        <View style={styles.segmentSection}>
          <SegmentedControl
            fontStyle={{color: '#ff00ff'}}
            values={['One', 'Two']}
            selectedIndex={1}
          />
        </View>
        <View style={styles.segmentContainer}>
          <Text style={styles.text}>
            Segmented controls can have defined fontSize
          </Text>
          <View style={styles.segmentContainer}>
            <SegmentedControl
              values={['One', 'Two']}
              style={{height: 80}}
              fontStyle={styles.fontStyle}
            />
          </View>
          <SegmentedControl
            values={['One', 'Two']}
            tintColor="red"
            style={{height: 80}}
            fontStyle={{
              fontFamily: 'Optima',
              fontSize: 32,
            }}
            activeFontStyle={styles.activeFontStyle}
          />
        </View>
        <View>
          <Text style={styles.text}>Custom colors can be provided</Text>
          <View style={styles.segmentContainer}>
            <SegmentedControl
              values={this.state.values}
              selectedIndex={this.state.selectedIndex}
              onChange={this._onChange}
              onValueChange={this._onValueChange}
            />
          </View>
          <Text style={[styles.text]}>
            Value: {this.state.value} Index: {this.state.selectedIndex}
          </Text>
        </View>
      </ScrollView>
    );
  }

  _onChange = (event) => {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  };

  _onValueChange = (value) => {
    this.setState({
      value: value,
    });
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
  segmentContainer: {
    marginBottom: 10,
  },
  segmentSection: {
    marginBottom: 25,
  },
  container: {
    paddingTop: 80,
  },
});
