import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import Datepicker from '../index';

const classSelector = `${prefixCls}-datepicker`;
describe('Datepicker', () => {
  it('常规渲染', () => {
    const wrapper = mount(<Datepicker />);
    expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
    wrapper.find(`.${classSelector}-inp-block`).at(0).simulate('click');
    setTimeout(() => {
      expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(1);
      wrapper.unmount();
    });
  });

  it('禁用模式', () => {
    const wrapper = mount(<Datepicker disabled />);
    expect(wrapper.find('input[disabled].cloud-input')).toHaveLength(1);

    expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
    wrapper.find(`.${classSelector}-inp-block`).at(0).simulate('click');
    expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
    wrapper.unmount();
  });

  it('输入框编辑模式', () => {
    const wrapper = render(<Datepicker />);
    const wrapperEdit = render(<Datepicker canEdit />);

    expect(wrapper.find('input[readonly].cloud-input')).toHaveLength(1);
    expect(wrapperEdit.find('input[readonly].cloud-input')).toHaveLength(0);
  });

  it('className', () => {
    // 不存在className
    const wrapper = mount(<Datepicker />);
    wrapper.find(`.${classSelector}-inp-block`).at(0).simulate('click');
    setTimeout(() => {
      expect(wrapper.find('.cloud-datepicker-popup').hasClass('baukh')).toBe(
        false,
      );
      wrapper.unmount();
    });

    // 存在className
    const wrapper2 = mount(<Datepicker className="baukh" />);
    wrapper2.find(`.${classSelector}-inp-block`).at(0).simulate('click');
    setTimeout(() => {
      expect(wrapper2.find('.cloud-datepicker-popup').hasClass('baukh')).toBe(
        true,
      );
      wrapper2.unmount();
    });
  });
});
