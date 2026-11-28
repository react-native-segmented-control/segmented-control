// These types are derived from @types/react-native.
// All credit goes to amazing people who made the react-native typings.

import * as React from 'react';
import {
  ViewProps,
  NativeSyntheticEvent,
  TargetedEvent,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

/**
 * Native methods available on a ref to the control.
 * Declared here rather than imported, because React Native renamed its type
 * (`NativeMethods` -> `HostInstance`) and only exports one or the other
 * depending on the version.
 */
export interface SegmentedControlNativeMethods {
  measure(
    callback: (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number,
    ) => void,
  ): void;
  measureInWindow(
    callback: (x: number, y: number, width: number, height: number) => void,
  ): void;
  focus(): void;
  blur(): void;
  setNativeProps(nativeProps: object): void;
}

export interface NativeSegmentedControlIOSChangeEvent extends TargetedEvent {
  value: string;
  selectedSegmentIndex: number;
}

export type FontStyle = {
  /**
   * Font Color of Segmented Control
   */
  color?: string;
  /**
   * Font Size of Segmented Control
   */
  fontSize?: number;
  /**
   * Font Family of the Segmented Control
   */
  fontFamily?: string;
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
    | '900'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;
};

export interface SegmentedControlProps extends ViewProps {
  /**
   * If false the user won't be able to interact with the control. Default value is true.
   */
  enabled?: boolean;

  /**
   * Indexes of the segments (in `props.values`) the user can't interact with.
   * The other segments remain interactive.
   */
  disabledIndices?: number[];

  /**
   * If true, then selecting a segment won't persist visually.
   * The onValueChange callback will still work as expected.
   */
  momentary?: boolean;

  /**
   * (iOS only)
   * If true, the width of each segment is proportional to the width of its
   * content instead of all segments sharing the same width.
   */
  apportionsSegmentWidthsByContent?: boolean;

  /**
   * Callback that is called when the user taps a segment;
   * passes the event as an argument
   */
  onChange?: (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>,
  ) => void;

  /**
   * Callback that is called when the user taps a segment; passes the segment's value as an argument
   */
  // Method syntax (rather than a function-typed property) so callers can
  // annotate the value with a narrower type, e.g. a union of their labels.
  onValueChange?(value: string): void;

  /**
   * The index in props.values of the segment to be (pre)selected.
   */
  selectedIndex?: number;

  /**
   * Accent color of the control.
   */
  tintColor?: string;

  /**
   * (iOS 13+ only)
   * Background color of the control.
   */
  backgroundColor?: string;

  /**
   * The labels for the control's segment buttons, in order.
   * Each value is a string, or an image (e.g. `require('./icon.png')`).
   */
  values?: ReadonlyArray<string | ImageSourcePropType>;

  /**
   * (iOS 13+ only)
   * Overrides the control's appearance irrespective of the OS theme
   */
  appearance?: 'dark' | 'light';
  /**
   * Font style properties of the Segmented Control
   */
  fontStyle?: FontStyle;
  /**
   * Active Font style properties of the Segmented Control
   */
  activeFontStyle?: FontStyle;

  /**
   * Touchable style properties for Segmented Control Tab
   */
  tabStyle?: ViewStyle;

  /**
   * Style properties for the Animated.View component
   */
  sliderStyle?: ViewStyle;
}

/**
 * Use `SegmentedControl` to render a UISegmentedControl iOS.
 *
 * #### Programmatically changing selected index
 *
 * The selected index can be changed on the fly by assigning the
 * selectIndex prop to a state variable, then changing that variable.
 * Note that the state variable would need to be updated as the user
 * selects a value and changes the index, as shown in the example below.
 *
 * ````
 * <SegmentedControl
 *   values={['One', 'Two']}
 *   selectedIndex={this.state.selectedIndex}
 *   onChange={(event) => {
 *     this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
 *   }}
 * />
 * ````
 */

declare class SegmentedControl extends React.Component<SegmentedControlProps> {}
// Instances (refs) also expose the native methods (measure, focus, ...).
interface SegmentedControl extends SegmentedControlNativeMethods {}
export default SegmentedControl;
