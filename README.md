# `@react-native-community/segmented-control`

![CircleCI branch][circle-ci-badge] ![npm][npm-badge] [![Lean Core Extracted][lean-core-badge]][lean-core-issue]

React Native SegmentedControlIOS library. Use SegmentedControlIOS to render a UISegmentedControl iOS.

<img src="https://github.com/react-native-community/react-native-segmented-control/blob/master/ScreenShots/Screen%20Shot%202019-02-26%20at%206.28.55%20PM.png" height="500" />

## Getting started

Install the library using either Yarn:

```
yarn add @react-native-community/segmented-control
```

or npm:

```
npm install --save @react-native-community/segmented-control
```

Then you will need to link it to your project. You can follow the [manual linking](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking) instructions for that.

## Migrating from the core `react-native` module

This module was created when the segmentedControlIos was split out from the core of React Native. To migrate to this module you need to follow the installation instructions above and then change you imports from:

```javascript
import {SegmentedControlIOS} from 'react-native';
```

to:

```javascript
import SegmentedControlIOS from '@react-native-community/segmented-control';
```

## Usage

Start by importing the library:

Use `SegmentedControlIOS` to render a UISegmentedControl iOS.

#### Programmatically changing selected index

The selected index can be changed on the fly by assigning the
selectedIndex prop to a state variable, then changing that variable.
Note that the state variable would need to be updated as the user
selects a value and changes the index, as shown in the example below.

```javascript
import SegmentedControlIOS from '@react-native-community/segmented-control';

return (
  <SegmentedControlIOS
    values={['One', 'Two']}
    selectedIndex={this.state.selectedIndex}
    onChange={event => {
      this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
    }}
  />
);

type SegmentedControlIOSProps = $ReadOnly<{|
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
  tintColor?: ?string,
  /**
   * (For iOS >= 13)
   * Text color of the control.
   */
  textColor?: ?string,
  /**
   * (For iOS >= 13)
   * Background color of the control.
   */
  backgroundColor?: ?string,
  /**
   * If true, then selecting a segment won't persist visually.
   * The `onValueChange` callback will still work as expected.
   */
  momentary?: ?boolean,
|}>;
```

## Maintainers

- [M.Haris Baig](https://github.com/harisbaig100)
- [Naturalclar](https://github.com/Naturalclar)

## Contributing

Please see the [`contributing guide`](/CONTRIBUTING.md).

## License

The library is released under the MIT licence. For more information see [`LICENSE`](/LICENSE).

[circle-ci-badge]: https://img.shields.io/circleci/project/github/react-native-community/react-native-segmented-control/master.svg?style=flat-square
[npm-badge]: https://img.shields.io/npm/v/@react-native-community/segmented-control.svg?style=flat-square
[lean-core-badge]: https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg?style=flat-square
[lean-core-issue]: https://github.com/facebook/react-native/issues/23313
