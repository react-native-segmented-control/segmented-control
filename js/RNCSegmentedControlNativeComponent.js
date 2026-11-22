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
import type {HostComponent} from 'react-native';
import type {SegmentedControlProps} from './types';

const RNCSegmentedControlNativeComponent: HostComponent<SegmentedControlProps> =
  requireNativeComponent<SegmentedControlProps>('RNCSegmentedControl');

export default RNCSegmentedControlNativeComponent;
