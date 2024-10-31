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
  Platform,
} from 'react-native';

import type {FontStyle, ViewStyle} from './types';

type Props = $ReadOnly<{|
  value: string | number | Object,
  tintColor?: ?string,
  onSelect: () => void,
  selected: boolean,
  enabled: boolean,
  fontStyle?: FontStyle,
  activeFontStyle?: FontStyle,
  tabStyle?: ViewStyle,
  appearance?: 'dark' | 'light' | null,
  accessibilityHint?: string,
  testID?: string,
|}>;

function isBase64(str) {
  const regex =
    /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
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
  appearance,
  tabStyle,
  accessibilityHint,
  testID,
}: Props): React.Node => {
  const colorSchemeHook = useColorScheme();
  const colorScheme = appearance || colorSchemeHook;
  const {color: textColor, fontSize, fontFamily, fontWeight} = fontStyle;

  const {
    color: activeColor,
    fontSize: activeFontSize,
    fontFamily: activeFontFamily,
    fontWeight: activeFontWeight,
  } = activeFontStyle;

  const getColor = () => {
    if (textColor) {
      return textColor;
    }
    if (tintColor) {
      return 'white';
    }
    return colorScheme === 'dark' ? '#FFF' : '#000';
  };
  const color = getColor();

  const activeStyle = {
    ...styles.activeText,
    fontFamily: activeFontFamily || fontFamily,
    fontSize: activeFontSize || fontSize,
    color: activeColor || color,
    fontWeight: activeFontWeight || fontWeight || styles.activeText.fontWeight,
  };

  const idleStyle = {
    color,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
  };

  return (
    <TouchableOpacity
      style={[styles.container, tabStyle]}
      disabled={!enabled}
      onPress={onSelect}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{selected: selected, disabled: !enabled}}
      testID={testID}
      accessible={true}
      accessibilityLabel={Platform.select({
        android: testID,
        ios: typeof value === 'string' ? value : testID,
      })}>
      <View style={styles.default}>
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
