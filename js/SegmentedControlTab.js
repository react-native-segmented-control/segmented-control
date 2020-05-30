/**
 * @flow
 */

'use strict';

import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import type {FontStyle} from './types';

type Props = $ReadOnly<{|
  value: string,
  tintColor?: ?string,
  onSelect: () => void,
  selected: boolean,
  enabled: boolean,
  fontStyle?: FontStyle,
  activeFontStyle?: FontStyle,
|}>;

export const SegmentedControlTab = ({
  onSelect,
  value,
  enabled,
  selected,
  tintColor,
  fontStyle = {},
  activeFontStyle = {},
}: Props) => {
  const {color: textColor, fontSize, fontFamily} = fontStyle;
  const {
    color: activeColor,
    fontSize: activeFontSize,
    fontFamily: activeFontFamily,
  } = activeFontStyle;

  const getColor = () => {
    if (textColor) {
      return textColor;
    }
    if (tintColor) {
      return 'white';
    }
    return 'black';
  };
  const color = getColor();

  const activeStyle = {
    ...styles.activeText,
    fontFamily: activeFontFamily || fontFamily,
    fontSize: activeFontSize || fontSize,
    color: activeColor || color,
  };

  const idleStyle = {
    color,
    fontSize: fontSize || undefined,
    fontFamily: fontFamily || undefined,
  };

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!enabled}
      onPress={onSelect}>
      <View style={[styles.default]}>
        <Text style={[idleStyle, selected && activeStyle]}>{value}</Text>
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
