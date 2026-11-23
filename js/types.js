/**
 * @flow
 */

import type {
  ColorValue,
  NativeSyntheticEvent,
  StyleProp,
  ViewProps,
  ViewStyle as RNViewStyle,
} from 'react-native';

export type Event = NativeSyntheticEvent<
  Readonly<{|
    value: string,
    selectedSegmentIndex: number,
  |}>,
>;

export type ViewStyle = StyleProp<RNViewStyle>;

export type FontStyle = Readonly<{|
  /**
   * Font Color of Segmented Control
   */
  color?: ?ColorValue,
  /**
   * Font Size of Segmented Control
   */
  fontSize?: number,
  /**
   * Font Family of the Segmented Control
   */
  fontFamily?: string,
  /**
   * Font Weight of the Segmented Control
   */
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
|}>;

export type SegmentedControlProps = Readonly<{|
  ...ViewProps,
  /**
   * The labels for the control's segment buttons, in order.
   */
  values: ReadonlyArray<string | number | Object>,
  /**
   * The index in `props.values` of the segment to be (pre)selected.
   */
  selectedIndex?: ?number,
  /**
   * Callback that is called when the user taps a segment;
   * passes the segment's value as an argument
   */
  onValueChange?: ?(value: string | number | Object) => unknown,
  /**
   * Callback that is called when the user taps a segment;
   * passes the event as an argument
   */
  onChange?: ?(event: Event) => unknown,
  /**
   * If false the user won't be able to interact with the control.
   * Default value is true.
   */
  enabled?: boolean,
  /**
   * Indexes of the segments (in `props.values`) the user can't interact with.
   * The other segments remain interactive.
   */
  disabledIndices?: $ReadOnlyArray<number>,
  /**
   * Accent color of the control.
   */
  tintColor?: string,

  /**
   * (iOS 13+ only)
   * Background color of the control.
   */
  backgroundColor?: string,
  /**
   * If true, then selecting a segment won't persist visually.
   * The `onValueChange` callback will still work as expected.
   */
  momentary?: ?boolean,
  /**
   * (iOS 13+ only, Android, Web)
   * Overrides the control's appearance irrespective of the OS theme
   */
  appearance?: 'dark' | 'light',
  /**
   * (iOS 13+ only, Android, Web)
   * fontStyle for segmented control.
   */
  fontStyle?: FontStyle,
  /**
   * (iOS 13+ only)
   * activeFontStyle for selected segment.
   * it will override fontStyle for the selected segment
   */
  activeFontStyle?: FontStyle,

  /**
   * Touchable style properties for Segmented Control Tab
   */
  tabStyle?: ViewStyle,

  /**
   * array testID to each segment button
   */
  testIDS: ReadonlyArray<string>,
  /**
   * Style properties for the slider component (Animated.View)
   */
  sliderStyle?: ViewStyle,
  /**
   * Accessibility hint separator text
   */
  accessibilityHintSeperator?: string,
|}>;
