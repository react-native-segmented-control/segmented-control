# `@react-native-community/segmented-control`

![Supports iOS and Android][support-badge]![CircleCI branch][circle-ci-badge] ![npm][npm-badge] [![Lean Core Extracted][lean-core-badge]][lean-core-issue]

React Native SegmentedControl library. Use SegmentedControl to render a UISegmentedControl iOS.

For Android and Web, it has a js implementation that mocks iOS 13 style of UISegmentedControl.

| iOS | Android | Web |
| --- | ---- | --- | 
|  <img src="https://user-images.githubusercontent.com/6936373/71608757-dc6ef680-2bc6-11ea-85be-aa31f25ecf36.png" width="320" /> | <img src="https://user-images.githubusercontent.com/6936373/79550655-9edd9d00-80d3-11ea-98bf-8b7c0b0798d3.png" width="320" /> | <img src="https://user-images.githubusercontent.com/6936373/79590620-3f52b200-8112-11ea-863b-236c4465fba6.png" width="640"/> |



## Getting started

Install the library using either Yarn:

```
yarn add @react-native-community/segmented-control
```

or npm:

```
npm install --save @react-native-community/segmented-control
```

## Link

- React Native 0.60+

run `cd ios && pod install`

- React Native <= 0.59

run `react-native link @react-native-community/segmented-control`

or you can follow the instructions to [manually link this package](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking).

## Upgrading to React Native _0.60+_

New React Native comes with `autolinking` feature, which automatically links Native Modules in your project. In order to get it to work, make sure you unlink `Segmented Control` first:

`react-native unlink @react-native-community/segmented-control`

## Migrating from the core `react-native` module

This module was created when the segmentedControlIos was split out from the core of React Native. To migrate to this module you need to follow the installation instructions above and then change you imports from:

```javascript
import {SegmentedControlIOS} from 'react-native';
```

to:

```javascript
import SegmentedControl from '@react-native-community/segmented-control';
```

## Usage

Start by importing the library:

Use `SegmentedControl` to render a UISegmentedControl iOS.

#### Programmatically changing selected index

The selected index can be changed on the fly by assigning the
selectedIndex prop to a state variable, then changing that variable.
Note that the state variable would need to be updated as the user
selects a value and changes the index, as shown in the example below.

```javascript
import SegmentedControl from '@react-native-community/segmented-control';

return (
  <SegmentedControl
    values={['One', 'Two']}
    selectedIndex={this.state.selectedIndex}
    onChange={(event) => {
      this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
    }}
  />
);
```

---

# Reference

## Props

Inherits [View Props](view.md#props).

### `enabled`

If false the user won't be able to interact with the control. Default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `momentary`

If true, then selecting a segment won't persist visually. The `onValueChange` callback will still work as expected.

| Type | Required | Platform |
| ---- | -------- | ---- |
| bool | No       | iOS |

---

### `onChange`

Callback that is called when the user taps a segment; passes the event as an argument

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onValueChange`

Callback that is called when the user taps a segment; passes the segment's value as an argument

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `selectedIndex`

The index in `props.values` of the segment to be (pre)selected.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `tintColor`

Accent color of the control.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `textColor`

Text color of the control. (iOS 13+ only)

| Type   | Required | Supported Version |
| ------ | -------- | ----------------- |
| string | No       | iOS 13+           |

---

### `activeTextColor`

Text color of the active control. (iOS 13+ only)

| Type   | Required | Supported Version |
| ------ | -------- | ----------------- |
| string | No       | iOS 13+           |

---

### `backgroundColor`

Background color color of the control. (iOS 13+ only)

| Type   | Required | Supported Version |
| ------ | -------- | ----------------- |
| string | No       | iOS 13+           |

---

### `values`

The labels for the control's segment buttons, in order.

| Type            | Required |
| --------------- | -------- |
| array of string | No       |

### `appearance`

(iOS 13 only)
Overrides the control's appearance irrespective of the OS theme

| Type            | Required | Platform |
| --------------- | -------- | ---- |
| 'dark' | 'light' | No       | iOS |

## Maintainers

- [M.Haris Baig](https://github.com/harisbaig100)
- [Naturalclar](https://github.com/Naturalclar)

## Contributing

Please see the [`contributing guide`](/CONTRIBUTING.md).

## License

The library is released under the MIT licence. For more information see [`LICENSE`](/LICENSE).

[circle-ci-badge]: https://img.shields.io/circleci/project/github/react-native-community/segmented-control/master.svg?style=flat-square
[npm-badge]: https://img.shields.io/npm/v/@react-native-community/segmented-control.svg?style=flat-square
[lean-core-badge]: https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg?style=flat-square
[lean-core-issue]: https://github.com/facebook/react-native/issues/23313
[support-badge]:https://img.shields.io/badge/platforms-android%20|%20ios%20|%20web-lightgrey.svg?style=flat-square
