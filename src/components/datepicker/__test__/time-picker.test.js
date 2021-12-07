import React from 'react';
import { render, mount } from 'enzyme';
import Datepicker  from '../index';
describe('TimePicker', () => {

  it('常规渲染', () => {
    const wrapper = render(<Datepicker.TimePicker />);
    expect(wrapper.find('.timepicker-hour')).toHaveLength(1);
    expect(wrapper.find('.timepicker-minute')).toHaveLength(1);
    expect(wrapper.find('.timepicker-second')).toHaveLength(1);
  });

  it('默认值', () => {
    const onChange = value => {
      expect(value.hour).toBe('00');
      expect(value.minute).toBe('00');
      expect(value.second).toBe('00');
    };
    const wrapper = mount(<Datepicker.TimePicker onChange={onChange}/>);
    wrapper.find('.timepicker-hour').at(0).simulate('change');
  });
});
