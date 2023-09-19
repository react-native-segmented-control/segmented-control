/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

typedef void(^OnChangeCallback)(NSString *value, NSInteger index);

@interface RNCSegmentedControlImpl : UISegmentedControl

@property(nonatomic) NSArray * values;
@property(nonatomic, assign) NSInteger selectedIndex;

@property NSString * appearance;

@property(nonatomic, copy) RCTBubblingEventBlock onChange;

@property (nonatomic, copy) OnChangeCallback onChangeFabric;

@end
