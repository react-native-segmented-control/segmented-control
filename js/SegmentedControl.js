/**
 * @flow
 */

'use strict';

import * as React from 'react';

import {
  Animated,
  Easing,
  I18nManager,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import type {SegmentedControlProps} from './types';
import {SegmentedControlTab} from './SegmentedControlTab';
import {SegmentsSeparators} from './SegmentsSeparators';

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
  tabStyle,
  fontStyle,
  activeFontStyle,
  appearance,
  accessibilityHintSeperator = 'out of',
  testIDS,
  sliderStyle,
}: SegmentedControlProps): React.Node => {
  const colorSchemeHook = useColorScheme();
  const colorScheme = appearance || colorSchemeHook;
  const [segmentWidth, setSegmentWidth] = React.useState(0);
  const animation = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();

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

  const updateSegmentWidth = React.useCallback(
    (width: number) => {
      const newSegmentWidth = values.length ? width / values.length : 0;
      if (newSegmentWidth !== segmentWidth) {
        animation.setValue(newSegmentWidth * (selectedIndex || 0));
        setSegmentWidth(newSegmentWidth);
      }
    },
    [values.length, segmentWidth, animation, selectedIndex],
  );

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

  React.useEffect(() => {
    if (ref.current) {
      ref.current.measure((_x, _y, width) => updateSegmentWidth(width));
    }
  }, [values, updateSegmentWidth]);

  return (
    <View
      ref={ref}
      style={[
        styles.default,
        style,
        colorScheme === 'dark' && styles.darkControl,
        backgroundColor && {backgroundColor},
        !enabled && styles.disabled,
      ]}
      onLayout={({
        nativeEvent: {
          layout: {width},
        },
      }) => updateSegmentWidth(width)}>
      {!backgroundColor && !tintColor && (
        <SegmentsSeparators
          values={values.length}
          selectedIndex={selectedIndex}
        />
      )}
      {selectedIndex != null && segmentWidth ? (
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{translateX: animation}],
              width: segmentWidth - 4,
              zIndex: -1,
              backgroundColor:
                tintColor || (colorScheme === 'dark' ? '#636366' : 'white'),
            },
            sliderStyle,
          ]}
        />
      ) : null}
      <View style={styles.segmentsContainer}>
        {values &&
          values.map((value, index) => {
            return (
              <SegmentedControlTab
                enabled={enabled}
                testID={
                  (testIDS?.length ?? 0) > index ? testIDS[index] : `${index}`
                }
                selected={selectedIndex === index}
                accessibilityHint={`${
                  index + 1
                } ${accessibilityHintSeperator} ${values.length}`}
                key={index}
                value={value}
                tintColor={tintColor}
                tabStyle={tabStyle}
                fontStyle={fontStyle}
                activeFontStyle={activeFontStyle}
                appearance={colorScheme}
                onSelect={() => {
                  handleChange(index);
                }}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    overflow: 'hidden',
    position: 'relative',
    height: 32,
    backgroundColor: '#EEEEF0',
    borderRadius: 9,
  },
  darkControl: {
    backgroundColor: '#1C1C1F',
  },
  disabled: {
    opacity: 0.4,
  },
  slider: {
    position: 'absolute',
    borderRadius: 7,
    top: 2,
    bottom: 2,
    right: 2,
    left: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  segmentsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'transparent',
    zIndex: 99,
  },
});

export default SegmentedControl;
