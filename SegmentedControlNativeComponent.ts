import type {ViewProps} from 'ViewPropTypes';
import type {HostComponent, ColorValue} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

import type { BubblingEventHandler, Int32, WithDefault } from 'react-native/Libraries/Types/CodegenTypes';

type SCFontStyle = { 
    color?:ColorValue;
    fontSize?:WithDefault<Int32,13>;
    fontFamily?:string;
}

export interface NativeProps extends ViewProps {
    values:Array<string>; // FIXME support images
    selectedIndex?:WithDefault<Int32,-1>;
    tintColor?:ColorValue;
    backgroundColor?:ColorValue;
    momentary?:boolean;
    enabled?:boolean;
    onChange?:BubblingEventHandler<{value:string,selectedSegmentIndex:Int32}>; // FIXME support images
    appearance?:string;
    fontStyle?:SCFontStyle;
    activeFontStyle?:SCFontStyle;
}

export default codegenNativeComponent<NativeProps>(
  'RNCSegmentedControl',
) as HostComponent<NativeProps>;