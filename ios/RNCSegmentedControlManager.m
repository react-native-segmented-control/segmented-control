/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RNCSegmentedControlManager.h"

#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import "RNCSegmentedControl.h"

@implementation RNCSegmentedControlManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [RNCSegmentedControl new];
}

RCT_EXPORT_VIEW_PROPERTY(values, NSArray<NSString *>)
RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(textColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(activeTextColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(momentary, BOOL)
RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(appearance, NSString)

RCT_CUSTOM_VIEW_PROPERTY(fontStyle, NSObject, RNCSegmentedControl)
{
  if (json) {        
    NSInteger fontSize = json[@"fontSize"] ? [RCTConvert NSInteger:json[@"fontSize"]] : 13.0;

    UIFont *idleFont = [UIFont systemFontOfSize: fontSize];
    UIFont *selectedFont = [UIFont boldSystemFontOfSize: fontSize];

    if (json[@"fontFamilyIdle"] && json[@"fontFamilySelected"]) {
      idleFont = [UIFont fontWithName:json[@"fontFamilyIdle"] size:fontSize];
      selectedFont = [UIFont fontWithName:json[@"fontFamilySelected"] size:fontSize];
    } else if (json[@"fontFamilyIdle"]) {
      idleFont = [UIFont fontWithName:json[@"fontFamilyIdle"] size:fontSize];
    } else if (json[@"fontFamilySelected"]) {
      selectedFont = [UIFont fontWithName:json[@"fontFamilySelected"] size:fontSize];
    }

    [view setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:idleFont, NSFontAttributeName, nil] forState:UIControlStateNormal];

    [view setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:selectedFont, NSFontAttributeName, nil] forState:UIControlStateSelected];
  }
}

@end
