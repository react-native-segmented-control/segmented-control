/**
 * @flow
 */

'use strict';

import * as React from 'react';

import {StyleSheet, View, useColorScheme} from 'react-native';

type Props = $ReadOnly<{|
  values: number,
  selectedIndex: ?number,
|}>;

export const SegmentsSeparators = ({
  values,
  selectedIndex,
}: Props): React.Node => {
  const colorScheme = useColorScheme();
  const hide = (val) => {
    return selectedIndex === val || selectedIndex === val + 1;
  };

  return (
    <View style={styles.separatorsContainer}>
      {[...Array(values - 1).keys()].map((val) => {
        return (
          <View
            key={val}
            style={[
              styles.separator,
              colorScheme === 'dark' && styles.darkSeparator,
              hide(val) && styles.hide,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  separatorsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  separator: {
    width: 1,
    height: '50%',
    backgroundColor: '#D1D1D4',
  },
  darkSeparator: {
    backgroundColor: '#3F3F42',
  },
  hide: {
    backgroundColor: 'transparent',
  },
});
