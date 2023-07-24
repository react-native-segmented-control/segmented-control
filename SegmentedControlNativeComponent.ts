import type {ViewProps} from 'ViewPropTypes';
import type {HostComponent, ColorValue} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

import type {
  BubblingEventHandler,
  Int32,
  WithDefault,
  Float,
} from 'react-native/Libraries/Types/CodegenTypes';

type RNCSegmentedControlValue = {
  type: Int32; // 1: text, 2: image
  stringValue?: string; // title
  imgValue?: {
    // ImageResolvedAssetSource
    height: Int32;
    width: Int32;
    scale: Float;
    uri: string;
  };
};

type OnChangeEvent = {
  // works only with text values (not with images)
  value: string;
  selectedSegmentIndex: Int32;
};

type SCFontStyle = {
  color?: ColorValue;
  fontSize?: WithDefault<Int32, 13>;
  fontFamily?: string;
};

export interface NativeProps extends ViewProps {
  values: Array<RNCSegmentedControlValue>;
  selectedIndex?: WithDefault<Int32, -1>;
  tintColor?: ColorValue;
  backgroundColor?: ColorValue;
  momentary?: WithDefault<boolean, false>;
  enabled?: WithDefault<boolean, true>;
  onChange?: BubblingEventHandler<OnChangeEvent, 'onChange'>;
  appearance?: string;
  fontStyle?: SCFontStyle;
  activeFontStyle?: SCFontStyle;
}

export default codegenNativeComponent<NativeProps>(
  'RNCSegmentedControl',
) as HostComponent<NativeProps>;
