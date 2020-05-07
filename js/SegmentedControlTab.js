/**
 * @flow
 */

'use strict';

import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

type Props = $ReadOnly<{|
  value: string,
  tintColor?: ?string,
  textColor?: ?string,
  activeTextColor?: ?string,
  onSelect: () => void,
  selected: boolean,
  enabled: boolean,
  fontSize?: ?number,
|}>;

export const SegmentedControlTab = ({
  onSelect,
  value,
  enabled,
  selected,
  tintColor,
  textColor,
  activeTextColor,
  fontSize,
}: Props) => {
  const getColor = () => {
    if (selected && activeTextColor) {
      return activeTextColor;
    }
    if (textColor) {
      return textColor;
    }
    if (tintColor) {
      return tintColor;
    }
    return 'black';
  };
  const color = getColor();

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!enabled}
      onPress={onSelect}>
      <View style={[styles.default]}>
        <Text
          style={[
            {color},
            !(fontSize == null) && {fontSize},
            selected && styles.activeText,
          ]}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, borderRadius: 5},
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5,
  },
  activeText: {
    fontWeight: '700',
  },
});
