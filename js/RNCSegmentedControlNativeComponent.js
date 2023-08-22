/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

import {requireNativeComponent} from 'react-native';
// import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
// import type {SegmentedControlProps} from './types';

// type NativeSegmentedControlIOS = HostComponent<SegmentedControlProps>;

const isFabricEnabled = global.nativeFabricUIManager != null;

// const RNCSegmentedControl: NativeSegmentedControlIOS = isFabricEnabled
const RNCSegmentedControl = isFabricEnabled
  ? require('../codegen/SegmentedControlNativeComponent').default
  : requireNativeComponent('RNCSegmentedControl');

module.exports = RNCSegmentedControl;
