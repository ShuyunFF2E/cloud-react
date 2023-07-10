import React from 'react';
import { mount, render } from 'enzyme';
import mountTest from '../../../../tests/shared/mountTest';
import InputTag from '../index';

describe('InputTag', () => {
  mountTest(InputTag);

  document.execCommand = jest.fn();

  // it('renders correctly', () => {
  //   const wrapper = render(<InputTag />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('should support remove tag', () => {
    const wrapper = mount(<InputTag data={[ 'a', 'b' ]} />);
    const closeBtn = wrapper.find('.cloud-input-tag-item .cloud-icon.icon-close').at(0);
    closeBtn.simulate('click');

    expect(wrapper.state().data).toHaveLength(1);
  });

  it('should support copy', () => {
    const wrapper = mount(<InputTag />);
    const copyBtn = wrapper.find('.cloud-icon.icon-remark');
    copyBtn.simulate('click');
    const copyToClipboard = jest.spyOn(document, 'execCommand');
    wrapper.update();

    expect(copyToClipboard).toHaveBeenCalledWith('copy');
  });

  it('should support copy when separator is equal to "other"', () => {
    const wrapper = mount(<InputTag data={[ 'a', 'b' ]} />);
    wrapper.setState({ separator: 'other', character: '#' });
    const copyBtn = wrapper.find('.cloud-icon.icon-remark');
    copyBtn.simulate('click');
    const copyToClipboard = jest.spyOn(document, 'execCommand');
    wrapper.update();

    expect(copyToClipboard).toHaveBeenCalledWith('copy');
  });

  it('should support changeSeparator', () => {
    const wrapper = mount(<InputTag isConfigSeparator />);
    const semicolonRadio = wrapper.find('.cloud-radio-input').at(1);
    semicolonRadio.simulate('change');
    expect(wrapper.state().separator).toBe('；');

    const wrapper1 = mount(<InputTag isConfigSeparator />);
    wrapper1.setState({ separator: 'other', character: '#' });
    expect(wrapper1.find('.cloud-radio-group input')).toHaveLength(7);

    const separatorInput = wrapper1.find('.cloud-radio-group input').at(6);
    separatorInput.simulate('change', { target: { value: '#' } });
    expect(wrapper1.state().character).toBe('#');

    separatorInput.simulate('change', { target: { value: '我是非法字符' } });
    expect(wrapper1.state().character).toBe('');

    const wrapper2 = mount(<InputTag isConfigSeparator />);
    const otherRadio = wrapper2.find('.cloud-radio-group input').at(5);
    otherRadio.simulate('change');
    expect(wrapper2.state().character).toBe('');
  });

  it('should trigger onChange', () => {
    const wrapper = mount(<InputTag data={null} />);
    wrapper.setState({ separator: 'other', character: '#' });
    const input = wrapper.find('input').at(0);
    input.simulate('keyup', { key: 'Enter', target: { value: 'b' } });
    expect(wrapper.state().data).toHaveLength(1);
  });

  it('should support set the maximum number of tags', () => {
    const wrapper = mount(<InputTag max={2} data={[ 'a', 'b' ]} />);
    const input = wrapper.find('input').at(0);
    input.simulate('keyup', { key: 'Enter', target: { value: 'c' } });
    expect(wrapper.state().data).toHaveLength(2);
  });

  it('should support delete tags', () => {
    const wrapper = mount(<InputTag data={[ 'a', 'b' ]} />);
    const input = wrapper.find('input').at(0);
    input.simulate('keyup', { key: 'Backspace' });
    expect(wrapper.state().data).toHaveLength(1);
  });

  it('should support disabled', () => {
    const wrapper = mount(<InputTag data={[ 'a', 'b' ]} style={{ width: 300, height: 200 }} />);
    // wrapper.find('.cloud-input-tag').at(0).getBoundingClientRect = jest.fn(() => {
    // 	return {
    // 		width: 600,
    // 		left: 315
    // 	};
    // });
    // wrapper.find('.cloud-input-tag-item').at(0).getBoundingClientRect = jest.fn(() => {
    // 	return {
    // 		width: 52,
    // 		left: 315
    // 	};
    // });
    expect(wrapper.find('input')).toHaveLength(1);

    const wrapper1 = mount(<InputTag data={null} disabled />);
    expect(wrapper1.find('input')).toHaveLength(0);
  });
});
