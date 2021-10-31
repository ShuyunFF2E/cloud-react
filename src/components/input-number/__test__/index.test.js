import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';
import { prefixCls } from '@utils/';

import InputNumber from '../index';

const prefix = `${prefixCls}-input-number`;

describe('InputNumber', () => {
  mountTest(InputNumber);

  it('render correctly', () => {
    const wrapper = render(<InputNumber />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render different by size props', () => {
    const smallWrapper = render(<InputNumber size="small" />);
    expect(smallWrapper).toMatchSnapshot();
    expect(smallWrapper.hasClass('small')).toBeTruthy();

    const defaultWrapper = render(<InputNumber size="default" />);
    expect(defaultWrapper).toMatchSnapshot();
    expect(defaultWrapper.hasClass('default')).toBeTruthy();

    const largeWrapper = render(<InputNumber size="large" />);
    expect(largeWrapper).toMatchSnapshot();
    expect(largeWrapper.hasClass('large')).toBeTruthy();
  });

  it('should render correctly noStep', () => {
    const wrapper = render(<InputNumber noStep />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(`.${prefix}-handler-wrap`)).toHaveLength(0);
  });

  it('should have default value', () => {
    const wrapper = mount(<InputNumber defaultValue={3} />);

    expect(wrapper.state('currentValue')).toEqual(3);
  });

  it('should use value when defaultValue and value are exits', () => {
    const wrapper = mount(<InputNumber defaultValue={1} value={5} />);
    expect(wrapper.state('currentValue')).toEqual(5);
  });

  it('should currentValue equal min when value less than min ', () => {
    const wrapper = mount(<InputNumber min={10} value={5} />);

    expect(wrapper.state('currentValue')).toEqual(10);
    expect(wrapper.state('upButtonEnabled')).toBeTruthy();
    expect(wrapper.state('downButtonEnabled')).toBeFalsy();

    wrapper.find(`.${prefix}-handler-down`).simulate('click');
    wrapper.find(`.${prefix}-handler-up`).simulate('click');

    expect(wrapper.state('currentValue')).toEqual(11);
  });

  it('should currentValue equal max when value more than max', () => {
    const wrapper = mount(<InputNumber max={10} value={20} />);

    expect(wrapper.state('currentValue')).toEqual(10);
    expect(wrapper.state('upButtonEnabled')).toBeFalsy();
    expect(wrapper.state('downButtonEnabled')).toBeTruthy();

    wrapper.find(`.${prefix}-handler-up`).simulate('click');
    wrapper.find(`.${prefix}-handler-down`).simulate('click');

    expect(wrapper.state('currentValue')).toEqual(9);
  });

  it('should currentValue equla value when value between min and max', () => {
    const wrapper = mount(<InputNumber min={1} max={10} value={5} />);
    expect(wrapper.state('currentValue')).toEqual(5);
    expect(wrapper.state('upButtonEnabled')).toBeTruthy();
    expect(wrapper.state('downButtonEnabled')).toBeTruthy();
  });

  it('should update currentValue plus step on click up icon', () => {
    const wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={5} step={2} />,
    );
    wrapper.find(`.${prefix}-handler-up`).simulate('click');
    expect(wrapper.state('currentValue')).toEqual(7);
  });

  it('should update currentValue minus step on click down icon', () => {
    const wrapper = mount(
      <InputNumber min={1} max={10} defaultValue={5} step={10} />,
    );
    wrapper.find(`.${prefix}-handler-down`).simulate('click');
    expect(wrapper.state('currentValue')).toEqual(1);
  });

  it('should change function not trigger when disabled', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<InputNumber disabled />);

    wrapper.find('input').simulate('change');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should set currentValue to zere when defaultValue is blank', () => {
    const wrapper = mount(<InputNumber defaultValue={1.34} step={0.001} />);
    wrapper.find(`.${prefix}-handler-down`).simulate('click');
    expect(wrapper.state('currentValue')).toEqual(1.339);
  });

  it('should update correctly on change no min', () => {
    class TestComponent extends Component {
      state = {
        value: 1,
      };

      handleChange = (value) => {
        this.setState({
          value,
        });
      };

      render() {
        return (
          <InputNumber value={this.state.value} onChange={this.handleChange} />
        );
      }
    }

    const wrapper = mount(<TestComponent />);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(wrapper.state().value).toEqual('');

    wrapper.find(`.${prefix}-handler-down`).simulate('click');
    expect(wrapper.state().value).toEqual(0);

    wrapper.find('input').simulate('change', { target: { value: '1.22' } });
    wrapper.find('input').simulate('blur');
    expect(wrapper.state().value).toEqual(1.22);
  });

  it('should update correctly on change has min', () => {
    class TestComponent extends Component {
      state = {
        value: 1,
      };

      handleChange = (value) => {
        this.setState({
          value,
        });
      };

      render() {
        return (
          <InputNumber
            min={1}
            value={this.state.value}
            onChange={this.handleChange}
          />
        );
      }
    }

    const wrapper = mount(<TestComponent />);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(wrapper.state().value).toEqual('');

    wrapper.find(`.${prefix}-handler-down`).simulate('click');
    expect(wrapper.state().value).toEqual(1);
  });

  it('should trigger onFocus when input focus', () => {
    const handleFocus = jest.fn();
    const wrapper = mount(<InputNumber onFocus={handleFocus} />);

    wrapper.find('input').simulate('focus');
    expect(handleFocus).toHaveBeenCalled();
  });

  it('should trigger onBlur and onChange when input blur', () => {
    const handleBlur = jest.fn();
    const handleChange = jest.fn();
    const wrapper = mount(
      <InputNumber onBlur={handleBlur} onChange={handleChange} />,
    );

    wrapper.find('input').simulate('blur');
    expect(handleBlur).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalled();
  });

  it('should onEnter trigger when press enter', () => {
    const onEnter = jest.fn();
    const wrapper = mount(<InputNumber onEnter={onEnter} />);
    wrapper.find('input').simulate('keydown', { keyCode: 13 });
    expect(onEnter).toHaveBeenCalled();
  });

  it('should onKeyDown trigger when press key', () => {
    const onKeyDown = jest.fn();
    const wrapper = mount(<InputNumber onKeyDown={onKeyDown} />);
    wrapper.find('input').simulate('keydown', { keyCode: 3 });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should render correctly with precison', () => {
    const wrapper = mount(<InputNumber defaultValue={1} precision={2} />);
    expect(wrapper.state('currentValue')).toEqual(1.0);
  });
});
