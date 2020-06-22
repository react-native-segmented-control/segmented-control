/**
 * @flow
 */

'use strict';

import * as React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
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

function isBase64(str) {
  const regex = /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
  return str && regex.test(str);
}

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
        {typeof value === 'string' && !isBase64(value) ? (
          <Text style={[idleStyle, selected && activeStyle]}>{value}</Text>
        ) : (
          <Image
            source={isBase64(value) ? {uri: value} : value}
            style={styles.segmentImage}
          />
        )}
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
  segmentImage: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
});
