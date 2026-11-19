/* eslint-env jest */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import SegmentedControl from '../SegmentedControl.js';

describe('Android and web selection callbacks', () => {
  let tree;
  let props;

  beforeEach(() => {
    props = {
      values: ['One', 'Two'],
      selectedIndex: 0,
      onChange: jest.fn(),
      onValueChange: jest.fn(),
    };
  });

  afterEach(() => {
    act(() => tree?.unmount());
  });

  function render(overrides = {}) {
    props = {...props, ...overrides};
    act(() => {
      tree = renderer.create(<SegmentedControl {...props} />);
    });
  }

  function press(index) {
    act(() => {
      tree.root.findAllByType(TouchableOpacity)[index].props.onPress();
    });
  }

  it.each([0, 1])('does not notify for selected index %i', (selectedIndex) => {
    render({selectedIndex});
    press(selectedIndex);
    expect(props.onChange).not.toHaveBeenCalled();
    expect(props.onValueChange).not.toHaveBeenCalled();
  });

  it('notifies both callbacks once with the newly selected segment', () => {
    render();
    press(1);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith({
      nativeEvent: {value: 'Two', selectedSegmentIndex: 1},
    });
    expect(props.onValueChange).toHaveBeenCalledTimes(1);
    expect(props.onValueChange).toHaveBeenCalledWith('Two');
  });

  it('uses the latest controlled selection after a prop update', () => {
    render();
    act(() => {
      tree.update(<SegmentedControl {...props} selectedIndex={1} />);
    });
    press(1);
    expect(props.onChange).not.toHaveBeenCalled();
    expect(props.onValueChange).not.toHaveBeenCalled();
    press(0);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith({
      nativeEvent: {value: 'One', selectedSegmentIndex: 0},
    });
    expect(props.onValueChange).toHaveBeenCalledTimes(1);
    expect(props.onValueChange).toHaveBeenCalledWith('One');
  });

  it('compares indexes when two segments have the same value', () => {
    render({values: ['Same', 'Same']});
    press(1);
    expect(props.onChange).toHaveBeenCalledWith({
      nativeEvent: {value: 'Same', selectedSegmentIndex: 1},
    });
    expect(props.onValueChange).toHaveBeenCalledWith('Same');
  });

  it.each([undefined, null, -1])(
    'allows a first selection when selectedIndex is %s',
    (selectedIndex) => {
      render({selectedIndex});
      press(0);
      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onValueChange).toHaveBeenCalledWith('One');
    },
  );

  it('allows optional callbacks to be omitted', () => {
    render({onChange: undefined, onValueChange: undefined});
    expect(() => {
      press(0);
      press(1);
    }).not.toThrow();
  });
});

describe('Android and web disabled segments', () => {
  let tree;

  afterEach(() => {
    act(() => tree?.unmount());
  });

  function render(props) {
    const onChange = jest.fn();
    act(() => {
      tree = renderer.create(
        <SegmentedControl
          values={['One', 'Two', 'Three']}
          selectedIndex={0}
          onChange={onChange}
          {...props}
        />,
      );
    });
    return {
      onChange,
      tabs: tree.root.findAllByType(TouchableOpacity),
    };
  }

  it('only disables the segments listed in disabledIndices', () => {
    const {tabs} = render({disabledIndices: [1]});
    expect(tabs.map((tab) => tab.props.disabled)).toEqual([false, true, false]);
    expect(tabs.map((tab) => tab.props.accessibilityState.disabled)).toEqual([
      false,
      true,
      false,
    ]);
  });

  it('keeps the other segments interactive', () => {
    const {tabs, onChange} = render({disabledIndices: [1]});
    act(() => tabs[2].props.onPress());
    expect(onChange).toHaveBeenCalledWith({
      nativeEvent: {value: 'Three', selectedSegmentIndex: 2},
    });
  });

  it('keeps every segment disabled when the whole control is disabled', () => {
    const {tabs} = render({enabled: false, disabledIndices: [1]});
    expect(tabs.map((tab) => tab.props.disabled)).toEqual([true, true, true]);
  });

  it('ignores out-of-range indexes and leaves all segments enabled by default', () => {
    expect(
      render({disabledIndices: [7]}).tabs.map((tab) => tab.props.disabled),
    ).toEqual([false, false, false]);
  });
});
