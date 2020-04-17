/**
 * @flow
 */

'use strict';

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SegmentedControlTab} from './SegmentedControlTab';

import type {SegmentedControlProps} from './types';
const SegmentedControl = ({
  style,
  onChange,
  onValueChange,
  enabled = true,
  selectedIndex,
  activeTextColor,
  values,
  tintColor,
  textColor,
  backgroundColor,
}: SegmentedControlProps) => {
  const handleChange = (index: number) => {
    // mocks iOS's nativeEvent
    const event = {
      nativeEvent: {
        value: values[index],
        selectedSegmentIndex: index,
      },
    };
    onChange && onChange(event);
    onValueChange && onValueChange(values[index]);
  };
  return (
    <View
      style={[
        styles.default,
        style,
        backgroundColor && {backgroundColor},
        !enabled && styles.disabled,
      ]}>
      {values.map((value, index) => {
        return (
          <SegmentedControlTab
            enabled={enabled}
            selected={selectedIndex === index}
            key={index}
            value={value}
            tintColor={tintColor}
            textColor={textColor}
            activeTextColor={activeTextColor}
            onSelect={() => {
              handleChange(index);
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  disabled: {
    opacity: 0.4,
  },
});

export default SegmentedControl;
