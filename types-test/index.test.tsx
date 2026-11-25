// Type-level tests for index.d.ts. Checked by `pnpm tsc` (no runtime code).
import * as React from 'react';
import SegmentedControl from '../index';

// #696: the component accepts its props when used as a JSX element.
export const Basic = () => (
  <SegmentedControl
    values={['One', 'Two']}
    selectedIndex={0}
    onChange={(event) => {
      const index: number = event.nativeEvent.selectedSegmentIndex;
      const value: string = event.nativeEvent.value;
      return [index, value];
    }}
    disabledIndices={[1]}
  />
);

// Props are actually type-checked (an `any`-typed component would accept these).
// @ts-expect-error -- unknown prop
export const UnknownProp = () => <SegmentedControl notAProp />;
// @ts-expect-error -- wrong type for selectedIndex
export const WrongType = () => <SegmentedControl selectedIndex="1" />;

// A ref exposes the native methods.
export const WithRef = () => {
  const ref = React.useRef<SegmentedControl>(null);
  React.useEffect(() => {
    ref.current?.measure(() => {});
  }, []);
  return <SegmentedControl ref={ref} values={['One']} />;
};

// #706: numeric fontWeight, as accepted by React Native text styles.
export const NumericFontWeight = () => (
  <SegmentedControl
    values={['a', 'b']}
    fontStyle={{fontFamily: 'Optima', fontSize: 14, fontWeight: 600}}
    activeFontStyle={{fontWeight: 'bold'}}
  />
);

// #706: onValueChange can be typed with a narrower value type.
type Size = 'S' | 'M' | 'L';
export const NarrowedValue = () => (
  <SegmentedControl values={['S', 'M', 'L']} onValueChange={(v: Size) => v} />
);

// Image values, as documented in the README.
export const ImageValues = () => (
  <SegmentedControl
    values={['One', require('./icon.png'), {uri: 'https://example.com/a.png'}]}
  />
);

declare function require(path: string): number;
