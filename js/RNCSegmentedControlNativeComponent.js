/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import {requireNativeComponent} from 'react-native';

import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {SyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {NativeComponent} from 'react-native/Libraries/Renderer/shims/ReactNative';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Event = SyntheticEvent<
  $ReadOnly<{|
    value: number,
    selectedSegmentIndex: number,
  |}>,
>;

export type SegmentedControlIOSProps = $ReadOnly<{|
  ...ViewProps,
  /**
   * The labels for the control's segment buttons, in order.
   */
  values?: $ReadOnlyArray<string>,
  /**
   * The index in `props.values` of the segment to be (pre)selected.
   */
  selectedIndex?: ?number,
  /**
   * Callback that is called when the user taps a segment;
   * passes the segment's value as an argument
   */
  onValueChange?: ?(value: number) => mixed,
  /**
   * Callback that is called when the user taps a segment;
   * passes the event as an argument
   */
  onChange?: ?(event: Event) => mixed,
  /**
   * If false the user won't be able to interact with the control.
   * Default value is true.
   */
  enabled?: boolean,
  /**
   * Accent color of the control.
   */
  tintColor?: ?ColorValue,
  /**
   * Text color of the control.
   * NOTE: this prop will only work for iOS >= 13
   */
  textColor?: ?ColorValue,
  /**
   * Text color of the control when selected.
   * NOTE: this prop will only work for iOS >= 13
   */
  activeTextColor?: ?ColorValue,
  /**
   * Background color of the control.
   * NOTE: this prop will only work for iOS >= 13
   */
  backgroundColor?: ?ColorValue,
  /**
   * If true, then selecting a segment won't persist visually.
   * The `onValueChange` callback will still work as expected.
   */
  momentary?: ?boolean,
|}>;

type NativeSegmentedControlIOS = Class<
  NativeComponent<SegmentedControlIOSProps>,
>;

module.exports = ((requireNativeComponent(
  'RNCSegmentedControl',
): any): NativeSegmentedControlIOS);
