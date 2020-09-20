/**
 * @flow
 */

'use strict';

import * as React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import type {FontStyle} from './types';

type Props = $ReadOnly<{|
  value: string | number | Object,
  tintColor?: ?string,
  onSelect: () => void,
  selected: boolean,
  enabled: boolean,
  fontStyle?: FontStyle,
  darkFontStyle?: FontStyle,
  activeFontStyle?: FontStyle,
  darkActiveFontStyle?: FontStyle,
  appearance?: 'dark' | 'light' | null,
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
  darkFontStyle = {},
  activeFontStyle = {},
  darkActiveFontStyle = {},
  appearance,
}: Props): React.Node => {
  const colorSchemeHook = useColorScheme();
  const colorScheme = appearance || colorSchemeHook;
  const {color: textColor, fontSize, fontFamily} = fontStyle;
  const {
    color: darkTextColor,
    fontSize: darkFontSize,
    fontFamily: darkFontFamily,
  } = darkFontStyle;

  const {
    color: activeColor,
    fontSize: activeFontSize,
    fontFamily: activeFontFamily,
  } = activeFontStyle;

  const {
    color: darkActiveColor,
    fontSize: darkActiveFontSize,
    fontFamily: darkActiveFontFamily,
  } = darkActiveFontStyle;

  const getColor = () => {
    if (textColor) {
      return textColor;
    }
    if (tintColor) {
      return 'white';
    }
    return colorScheme === 'dark' ? '#FFF' : '#000';
  };
  const defaultFontColor = getColor();

  const activeStyle = {
    ...styles.activeText,
    color:
      (colorScheme === 'dark' && darkActiveColor) ||
      activeColor ||
      defaultFontColor,
    fontSize:
      (colorScheme === 'dark' && darkActiveFontSize) ||
      activeFontSize ||
      fontSize,
    fontFamily:
      (colorScheme === 'dark' && darkActiveFontFamily) ||
      activeFontFamily ||
      fontFamily,
  };

  const idleStyle = {
    color: (colorScheme === 'dark' && darkTextColor) || defaultFontColor,
    fontSize: (colorScheme === 'dark' && darkFontSize) || fontSize,
    fontFamily: (colorScheme === 'dark' && darkFontFamily) || fontFamily,
  };

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!enabled}
      onPress={onSelect}>
      <View style={[styles.default]}>
        {typeof value === 'number' || typeof value === 'object' ? (
          <Image source={value} style={styles.segmentImage} />
        ) : isBase64(value) ? (
          <Image source={{uri: value}} style={styles.segmentImage} />
        ) : (
          <Text style={[idleStyle, selected && activeStyle]}>{value}</Text>
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
