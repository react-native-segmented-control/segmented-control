/**
 * @flow
 */

'use strict';

import * as React from 'react';
import {Animated, I18nManager, Easing, StyleSheet, View} from 'react-native';
import {SegmentedControlTab} from './SegmentedControlTab';

import type {SegmentedControlProps} from './types';

/**
 * SegmentedControl
 * iOS 13 Style UISegmentedControl Component for Android and Web
 */
const SegmentedControl = ({
  style,
  onChange,
  onValueChange,
  enabled = true,
  selectedIndex,
  values,
  tintColor,
  backgroundColor,
  fontStyle,
  activeFontStyle,
}: SegmentedControlProps): React.Node => {
  const [segmentWidth, setSegmentWidth] = React.useState(0);
  const animation = React.useRef(new Animated.Value(0)).current;

  const handleChange = (index: number) => {
    // mocks iOS's nativeEvent
    const event: any = {
      nativeEvent: {
        value: values[index],
        selectedSegmentIndex: index,
      },
    };
    onChange && onChange(event);
    onValueChange && onValueChange(values[index]);
  };

  React.useEffect(() => {
    if (animation && segmentWidth) {
      let isRTL = I18nManager.isRTL ? -segmentWidth : segmentWidth;
      Animated.timing(animation, {
        toValue: isRTL * (selectedIndex || 0),
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [animation, segmentWidth, selectedIndex]);

  return (
    <View
      style={[
        styles.default,
        style,
        backgroundColor && {backgroundColor},
        !enabled && styles.disabled,
      ]}
      onLayout={({
        nativeEvent: {
          layout: {width},
        },
      }) => {
        const newSegmentWidth = values.length ? (width - 4) / values.length : 0;
        if (newSegmentWidth !== segmentWidth) {
          animation.setValue(newSegmentWidth * (selectedIndex || 0));
          setSegmentWidth(newSegmentWidth);
        }
      }}>
      {selectedIndex != null && segmentWidth ? (
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{translateX: animation}],
              width: segmentWidth - 2,
              backgroundColor: tintColor || 'white',
            },
          ]}
        />
      ) : null}
      {values &&
        values.map((value, index) => {
          return (
            <SegmentedControlTab
              enabled={enabled}
              selected={selectedIndex === index}
              key={index}
              value={value}
              tintColor={tintColor}
              fontStyle={fontStyle}
              activeFontStyle={activeFontStyle}
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
    overflow: 'hidden',
    position: 'relative',
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
  slider: {
    position: 'absolute',
    borderRadius: 5,
    top: 2,
    bottom: 2,
    right: 2,
    left: 2,
  },
});

export default SegmentedControl;
