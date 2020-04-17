/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import * as React from 'react';
import {StyleSheet} from 'react-native';

import RNCSegmentedControlNativeComponent from './RNCSegmentedControlNativeComponent';
import type {Event, SegmentedControlProps} from './types';

type Props = $ReadOnly<{|
  ...SegmentedControlProps,
  forwardedRef: ?React.Ref<typeof RNCSegmentedControlNativeComponent>,
|}>;

/**
 * Use `SegmentedControlIOS` to render a UISegmentedControl iOS.
 *
 * #### Programmatically changing selected index
 *
 * The selected index can be changed on the fly by assigning the
 * selectedIndex prop to a state variable, then changing that variable.
 * Note that the state variable would need to be updated as the user
 * selects a value and changes the index, as shown in the example below.
 *
 * ````
 * <SegmentedControlIOS
 *   values={['One', 'Two']}
 *   selectedIndex={this.state.selectedIndex}
 *   onChange={(event) => {
 *     this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
 *   }}
 * />
 * ````
 */

class SegmentedControlIOS extends React.Component<Props> {
  static defaultProps = {
    values: [],
    enabled: true,
  };

  _onChange = (event: Event) => {
    this.props.onChange && this.props.onChange(event);
    this.props.onValueChange &&
      this.props.onValueChange(event.nativeEvent.value);
  };

  render() {
    const {forwardedRef, ...props} = this.props;
    return (
      <RNCSegmentedControlNativeComponent
        {...props}
        ref={forwardedRef}
        style={[styles.segmentedControl, this.props.style]}
        onChange={this._onChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  segmentedControl: {
    height: 28,
  },
});

const SegmentedControlIOSWithRef = React.forwardRef<
  SegmentedControlProps,
  RNCSegmentedControlNativeComponent,
>(
  (
    props: SegmentedControlProps,
    forwardedRef: ?React.Ref<typeof RNCSegmentedControlNativeComponent>,
  ) => {
    return <SegmentedControlIOS {...props} forwardedRef={forwardedRef} />;
  },
);

export default SegmentedControlIOSWithRef;
