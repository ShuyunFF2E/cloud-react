import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import Datepicker  from '../index';
import mountTest from '../../../../tests/shared/mountTest';

const classSelector = `${prefixCls}-datepicker`;
describe('YearPicker', () => {
  mountTest(Datepicker.YearPicker);

  it('常规渲染', () => {
    const wrapper = mount(<Datepicker.YearPicker />);
    expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
    wrapper.find(`.${classSelector}-inp-block`).at(0).simulate('click');
    setTimeout(() => {
      expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(1);
    });
  });

  it('禁用编辑', () => {
    const wrapper = mount(<Datepicker.YearPicker disabled/>);
    console.log(wrapper.find('.cloud-datepicker-inp-block .cloud-input-disabled').length);
    // todo 这里应该只有一个dom？？
    // expect(wrapper.find('.cloud-datepicker-inp.cloud-input-disabled')).toHaveLength(1);

    expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
    wrapper.find(`.${classSelector}-inp-block`).at(0).simulate('click');
    expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
  });
});
