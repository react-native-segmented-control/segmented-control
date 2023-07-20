// This guard prevent the code from being compiled in the old architecture
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCSegmentedControl.h"
//#import "RNCSegmentedControlImpl.h"
#import "RNCSegmentedControlImpl.h"

#import <React/RCTConversions.h>

#import <react/renderer/components/SegmentedControl/ComponentDescriptors.h>
#import <react/renderer/components/SegmentedControl/EventEmitters.h>
#import <react/renderer/components/SegmentedControl/Props.h>
#import <react/renderer/components/SegmentedControl/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNCSegmentedControl () <RCTRNCSegmentedControlViewProtocol>

@end

@implementation RNCSegmentedControl {
    RNCSegmentedControlImpl * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNCSegmentedControlComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNCSegmentedControlProps>();
    _props = defaultProps;

    _view = [[RNCSegmentedControlImpl alloc] init];
    
    __weak __typeof(self) weakSelf = self;
    _view.onChangeFabric = ^(NSString *value, NSInteger index) {
        [weakSelf onChange:value selectedIndex:index];
    };

    self.contentView = _view;
}

return self;
}

- (void)onChange:(NSString *) value selectedIndex:(NSInteger) index
{
    if(!_eventEmitter) {
        return;
    }
    
    RNCSegmentedControlEventEmitter::OnChange event = { value: std::string([value UTF8String]),
        selectedSegmentIndex: (int) index };
    
    std::dynamic_pointer_cast<const RNCSegmentedControlEventEmitter>(_eventEmitter)->onChange(event);
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNCSegmentedControlProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNCSegmentedControlProps const>(props);

    NSMutableArray *oldValues = [[NSMutableArray alloc] init];
    auto oldValuesIt = oldViewProps.values.begin();
    
    while (oldValuesIt != oldViewProps.values.end()) {
        [oldValues addObject: RCTNSStringFromString(*oldValuesIt)]; // FIXME how to manage images here?
        oldValuesIt++;
    }
    
    NSMutableArray *newValues = [[NSMutableArray alloc] init];
    auto newValuesIt = newViewProps.values.begin();
    
    while (newValuesIt != newViewProps.values.end()) {
        [newValues addObject: RCTNSStringFromString(*newValuesIt)]; // FIXME how to manage images here?
        newValuesIt++;
    }
    if(![newValues isEqualToArray:oldValues]){
        [_view setValues:newValues];
    }
    if (oldViewProps.selectedIndex != newViewProps.selectedIndex) {
        NSLog(@"updateProps set selectedIndex to %d",newViewProps.selectedIndex);
        _view.selectedIndex = newViewProps.selectedIndex;
    }
    if (oldViewProps.tintColor != newViewProps.tintColor) {
        UIColor *tintColor = RCTUIColorFromSharedColor(newViewProps.tintColor);
        _view.tintColor = tintColor;
    }
    if (oldViewProps.backgroundColor != newViewProps.backgroundColor) {
        UIColor *backgroundColor = RCTUIColorFromSharedColor(newViewProps.backgroundColor);
        _view.backgroundColor = backgroundColor;
    }
    if (oldViewProps.momentary != newViewProps.momentary) {
        _view.momentary = newViewProps.momentary;
    }

    if (oldViewProps.enabled != newViewProps.enabled) {
        _view.enabled = newViewProps.enabled;
    }

    if (oldViewProps.appearance != newViewProps.appearance) {
        _view.appearance = RCTNSStringFromString(newViewProps.appearance);
    }
    
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_13_0) &&      \
    __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_13_0
    if (@available(iOS 13.0, *)) {
        if (oldViewProps.fontStyle.color!=newViewProps.fontStyle.color ||
            oldViewProps.fontStyle.fontSize!=newViewProps.fontStyle.fontSize ||
            oldViewProps.fontStyle.fontFamily!=newViewProps.fontStyle.fontFamily) {
            
            UIColor *color = RCTUIColorFromSharedColor(newViewProps.fontStyle.color);
            NSInteger fontSize = newViewProps.fontStyle.fontSize; // default 13.0
            UIFont *font = [UIFont systemFontOfSize:fontSize];
            NSString *fontName = RCTNSStringFromStringNilIfEmpty(newViewProps.fontStyle.fontFamily);
            if (fontName) {
                UIFont *tempFont = [UIFont fontWithName:fontName
                                                   size:fontSize];
                if (tempFont != nil) {
                  font = tempFont;
                }
            }

            NSDictionary *attributes = [NSDictionary
              dictionaryWithObjectsAndKeys:font, NSFontAttributeName, color,
                                           NSForegroundColorAttributeName, nil];
            [_view setTitleTextAttributes:attributes forState:UIControlStateNormal];
        }
    }
#endif
    
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_13_0) &&      \
    __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_13_0
    if (@available(iOS 13.0, *)) {
        if (oldViewProps.activeFontStyle.color!=newViewProps.activeFontStyle.color ||
            oldViewProps.activeFontStyle.fontSize!=newViewProps.activeFontStyle.fontSize ||
            oldViewProps.activeFontStyle.fontFamily!=newViewProps.activeFontStyle.fontFamily) {
            
            UIColor *color = RCTUIColorFromSharedColor(newViewProps.activeFontStyle.color);
            NSInteger fontSize = newViewProps.activeFontStyle.fontSize; // default 13.0
            UIFont *font = [UIFont boldSystemFontOfSize:fontSize];
            NSString *fontName = RCTNSStringFromStringNilIfEmpty(newViewProps.activeFontStyle.fontFamily);
            if (fontName) {
                UIFont *tempFont = [UIFont fontWithName:fontName
                                                   size:fontSize];
                if (tempFont != nil) {
                  font = tempFont;
                }
            }

            NSDictionary *attributes = [NSDictionary
              dictionaryWithObjectsAndKeys:font, NSFontAttributeName, color,
                                           NSForegroundColorAttributeName, nil];
            [_view setTitleTextAttributes:attributes forState:UIControlStateSelected];
        }
    }
#endif

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNCSegmentedControlCls(void)
{
    return RNCSegmentedControl.class;
}

// - hexStringToColor:(NSString *)stringToConvert
// {
// NSString *noHashString = [stringToConvert stringByReplacingOccurrencesOfString:@"#" withString:@""];
// NSScanner *stringScanner = [NSScanner scannerWithString:noHashString];

// unsigned hex;
// if (![stringScanner scanHexInt:&hex]) return nil;
// int r = (hex >> 16) & 0xFF;
// int g = (hex >> 8) & 0xFF;
// int b = (hex) & 0xFF;

// return [UIColor colorWithRed:r / 255.0f green:g / 255.0f blue:b / 255.0f alpha:1.0f];
// }

@end
#endif
