/**
 * @flow
 */

import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {SyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type Event = SyntheticEvent<
  $ReadOnly<{|
    value: string,
    selectedSegmentIndex: number,
  |}>,
>;

export type FontStyle = $ReadOnly<{|
  /**
   * Font Color of Segmented Control
   */
  color?: ?ColorValue,
  /**
   * Font Size of Segmented Control
   */
  fontSize?: ?number,
  /**
   * Font Family of the Segmented Control
   */
  fontFamily?: ?string,
|}>;

export type SegmentedControlProps = $ReadOnly<{|
  ...ViewProps,
  /**
   * The labels for the control's segment buttons, in order.
   */
  values: $ReadOnlyArray<string | NodeRequire>,
  /**
   * The index in `props.values` of the segment to be (pre)selected.
   */
  selectedIndex?: ?number,
  /**
   * Callback that is called when the user taps a segment;
   * passes the segment's value as an argument
   */
  onValueChange?: ?(value: string) => mixed,
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
   * (iOS 13+ only)
   * Background color of the control.
   */
  backgroundColor?: ?ColorValue,
  /**
   * If true, then selecting a segment won't persist visually.
   * The `onValueChange` callback will still work as expected.
   */
  momentary?: ?boolean,
  /**
   * (iOS 13+ only)
   * Overrides the control's appearance irrespective of the OS theme
   */
  appearance?: 'dark' | 'light',
  /**
   * (iOS 13+ only)
   * fontStyle for segmented control.
   */
  fontStyle?: FontStyle,
  /**
   * (iOS 13+ only)
   * fontStyle for selected segment.
   * it will override fontStyle for the selected segment
   */
  activeFontStyle?: FontStyle,
|}>;
