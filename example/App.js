/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

export default class App extends React.Component<{}, $FlowFixMeState> {
  state = {
    values: ['One', 'Two', 'Three'],
    value: 'Unselected',
    selectedIndex: undefined,
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{backgroundColor: 'blue', paddingTop: 80}}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.text}>Segmented controls can have values</Text>
          <SegmentedControl
            activeTextColor="#ff0000"
            tintColor="#00ff00"
            values={['One', 'Two', 'Three']}
          />
        </View>

        <View style={{marginBottom: 25}}>
          <SegmentedControl
            tintColor="#ff0000"
            values={['One', 'Two', 'Three', 'Four', 'Five']}
          />
        </View>

        <View style={{marginBottom: 25}}>
          <Text style={styles.text}>
            Segmented controls can have pre-selected values
          </Text>
          <SegmentedControl values={['One', 'Two']} selectedIndex={0} />
        </View>

        <View style={{marginBottom: 25}}>
          <Text style={styles.text}>Segmented controls can be momentary</Text>
          <SegmentedControl values={['One', 'Two']} momentary={true} />
        </View>

        <View style={{marginBottom: 25}}>
          <Text style={styles.text}>Segmented controls can be disabled</Text>
          <SegmentedControl
            enabled={false}
            values={['One', 'Two']}
            selectedIndex={1}
          />
        </View>

        <View style={{marginBottom: 10}}>
          <Text style={styles.text}>Custom colors can be provided</Text>
          <View style={{height: 40, width: 300}}>
            <SegmentedControl
              tintColor="#ff0000"
              values={['One', 'Two', 'Three', 'Four']}
              selectedIndex={0}
            />
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          <SegmentedControl
            tintColor="#00ff00"
            values={['One', 'Two', 'Three']}
            selectedIndex={1}
          />
        </View>
        <View style={{marginBottom: 25}}>
          <SegmentedControl
            textColor="#ff00ff"
            values={['One', 'Two']}
            selectedIndex={1}
          />
        </View>

        <View>
          <Text style={styles.text}>Custom colors can be provided</Text>
          <SegmentedControl
            values={this.state.values}
            selectedIndex={this.state.selectedIndex}
            onChange={this._onChange}
            onValueChange={this._onValueChange}
          />
          <Text style={[styles.text, {marginTop: 10}]}>
            Value: {this.state.value} Index: {this.state.selectedIndex}
          </Text>
        </View>
      </ScrollView>
    );
  }

  _onChange = event => {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  };

  _onValueChange = value => {
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
});
