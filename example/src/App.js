/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, useColorScheme} from 'react-native';

import SegmentedControl from '../../js';

const App = () => {
  const colorScheme = useColorScheme();
  const [textColor, setTextColor] = useState('#000');
  const [value, setValue] = useState('Unselected');
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  useEffect(() => {
    setTextColor(colorScheme === 'dark' ? '#FFF' : '#000');
  }, [colorScheme]);

  const _onChange = (event) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
  };

  const _onValueChange = (val) => {
    setValue(val);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colorScheme === 'dark' ? '#000' : '#FFF'},
      ]}>
      <View style={styles.segmentContainer}>
        <Text style={[styles.text, {color: textColor}]}>
          Segmented controls can have values and images
        </Text>
        <SegmentedControl
          values={['One', 'Two', require('../assets/images/user.png')]}
        />
      </View>
      <View style={styles.segmentSection}>
        <SegmentedControl
          values={[
            'One',
            'Two',
            require('../assets/images/user.png'),
            'Three',
            'Four',
            'Five',
          ]}
        />
      </View>
      <View style={styles.segmentSection}>
        <Text style={[styles.text, {color: textColor}]}>
          Segmented controls can have pre-selected values
        </Text>
        <SegmentedControl values={['One', 'Two']} selectedIndex={0} />
      </View>
      <View style={styles.segmentSection}>
        <Text style={[styles.text, {color: textColor}]}>
          Segmented controls can be momentary
        </Text>
        <SegmentedControl values={['One', 'Two']} momentary={true} />
      </View>
      <View style={styles.segmentSection}>
        <Text style={[styles.text, {color: textColor}]}>
          Segmented controls can be disabled
        </Text>
        <SegmentedControl
          enabled={false}
          values={['One', 'Two']}
          selectedIndex={1}
        />
      </View>
      <View style={styles.segmentContainer}>
        <Text style={[styles.text, {color: textColor}]}>
          Custom colors can be provided
        </Text>
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
          activeFontStyle={{color: 'blue'}}
          darkFontStyle={{color: 'blue'}}
          darkActiveFontStyle={{color: '#ff00ff'}}
          values={['One', 'Two']}
          selectedIndex={1}
        />
      </View>
      <View style={styles.segmentContainer}>
        <Text style={[styles.text, {color: textColor}]}>
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
        <Text style={[styles.text, {color: textColor}]}>
          Custom colors can be provided
        </Text>
        <View style={styles.segmentContainer}>
          <SegmentedControl
            values={['One', 'Two', 'Three']}
            selectedIndex={selectedIndex}
            onChange={_onChange}
            onValueChange={_onValueChange}
          />
        </View>
        <Text style={[styles.text, {color: textColor}]}>
          Value: {value} Index: {selectedIndex}
        </Text>
      </View>

      <View>
        <Text style={[styles.text, {color: textColor}]}>
          Appearance value can be provided
        </Text>
        <View style={styles.segmentContainer}>
          <SegmentedControl
            appearance="light"
            values={['One', 'Two', 'Three']}
            selectedIndex={1}
          />
        </View>
        <View style={styles.segmentContainer}>
          <SegmentedControl
            appearance="dark"
            values={['One', 'Two', 'Three']}
            selectedIndex={2}
          />
        </View>
      </View>
    </ScrollView>
  );
};

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

export default App;
