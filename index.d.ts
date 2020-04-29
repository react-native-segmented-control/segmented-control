// These types are derived from @types/react-native.
// All credit goes to amazing people who made the react-native typings.

import * as React from 'react';
import {
  ViewProps,
  NativeSyntheticEvent,
  NativeMethodsMixin,
  Constructor,
  TargetedEvent,
} from 'react-native';

export interface NativeSegmentedControlIOSChangeEvent extends TargetedEvent {
  value: string;
  selectedSegmentIndex: number;
}

export interface SegmentedControlProps extends ViewProps {
  /**
   * If false the user won't be able to interact with the control. Default value is true.
   */
  enabled?: boolean;

  /**
   * If true, then selecting a segment won't persist visually.
   * The onValueChange callback will still work as expected.
   */
  momentary?: boolean;

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
  onValueChange?: (value: string) => void;

  /**
   * The index in props.values of the segment to be (pre)selected.
   */
  selectedIndex?: number;

  /**
   * Accent color of the control.
   */
  tintColor?: string;

  /**
   * (iOS 13 only)
   * Text color of the control.
   */
  textColor?: string;

  /**
   * (iOS 13 only)
   * Text color of the active control.
   */
  activeTextColor?: string;

  /**
   * (iOS 13 only)
   * Background color of the control.
   */
  backgroundColor?: string;

  /**
   * The labels for the control's segment buttons, in order.
   */
  values?: string[];

  /**
   * (iOS 13 only)
   * Overrides the control's appearance irrespective of the OS theme
   */
  appearance?: 'dark' | 'light';
  /**
   * Font Size of Segmented Control
   */
  fontSize?: number;
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

declare class SegmentedControlComponent extends React.Component<
  SegmentedControlProps
> {}
declare const SegmentedControlBase: Constructor<NativeMethodsMixin> &
  typeof SegmentedControlComponent;
export default class SegmentedControl extends SegmentedControlBase {}
