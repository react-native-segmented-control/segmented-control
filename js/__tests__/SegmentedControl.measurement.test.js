/* eslint-env jest */

import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import renderer, {act} from 'react-test-renderer';
import SegmentedControl from '../SegmentedControl.js';

describe('Android and web measurements', () => {
  let tree;
  let measurements;
  let setValue;
  const values = ['One', 'Two'];

  beforeEach(() => {
    measurements = [];
    jest.spyOn(View.prototype, 'measure').mockImplementation((callback) => {
      measurements.push(callback);
    });
    setValue = jest.spyOn(Animated.Value.prototype, 'setValue');
    act(() => {
      tree = renderer.create(
        <SegmentedControl values={values} selectedIndex={1} />,
      );
    });
  });

  afterEach(() => {
    act(() => tree.unmount());
    jest.restoreAllMocks();
  });

  function deliverMeasurement(...args) {
    expect(measurements.length).toBeGreaterThan(0);
    const callback = measurements[measurements.length - 1];
    act(() => callback(...args));
  }

  function sliders() {
    return tree.root
      .findAllByType(Animated.View)
      .filter(
        (node) => StyleSheet.flatten(node.props.style).position === 'absolute',
      );
  }

  function sliderWidth() {
    const matches = sliders();
    expect(matches).toHaveLength(1);
    return StyleSheet.flatten(matches[0].props.style).width;
  }

  it('ignores a failed measurement before the first layout', () => {
    deliverMeasurement();
    expect(setValue).not.toHaveBeenCalled();
    expect(sliders()).toHaveLength(0);
  });

  it('keeps the last valid width when a later measurement fails', () => {
    deliverMeasurement(0, 0, 300, 32, 0, 0);
    expect(sliderWidth()).toBe(146);
    setValue.mockClear();
    deliverMeasurement();
    expect(setValue).not.toHaveBeenCalled();
    expect(sliderWidth()).toBe(146);
  });

  it('does not send NaN to Animated when a failed callback arrives after unmount', () => {
    const callback = measurements[0];
    act(() => tree.unmount());
    act(() => callback());
    expect(setValue).not.toHaveBeenCalled();
  });

  it('still applies a valid zero width', () => {
    deliverMeasurement(0, 0, 300, 32, 0, 0);
    setValue.mockClear();
    deliverMeasurement(0, 0, 0, 32, 0, 0);
    expect(setValue).toHaveBeenCalledWith(0);
    expect(sliders()).toHaveLength(0);
  });

  it('positions and sizes the slider from a successful measurement', () => {
    deliverMeasurement(0, 0, 300, 32, 0, 0);
    expect(setValue).toHaveBeenCalledWith(150);
    expect(sliderWidth()).toBe(146);
  });

  it('recalculates the width when the number of segments changes', () => {
    deliverMeasurement(0, 0, 300, 32, 0, 0);
    act(() => {
      tree.update(
        <SegmentedControl values={['One', 'Two', 'Three']} selectedIndex={1} />,
      );
    });
    deliverMeasurement(0, 0, 300, 32, 0, 0);
    expect(setValue).toHaveBeenLastCalledWith(100);
    expect(sliderWidth()).toBe(96);
  });

  it('accepts a layout event after a failed measurement', () => {
    deliverMeasurement();
    setValue.mockClear();
    const container = tree.root.findAllByType(View)[0];
    act(() => container.props.onLayout({nativeEvent: {layout: {width: 300}}}));
    expect(setValue).toHaveBeenCalledWith(150);
    expect(sliderWidth()).toBe(146);
  });
});
