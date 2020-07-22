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
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
import type {SegmentedControlProps} from './types';

type NativeSegmentedControlIOS = HostComponent<SegmentedControlProps>;

module.exports = ((requireNativeComponent(
  'RNCSegmentedControl',
): any): NativeSegmentedControlIOS);
