import React from 'react';
import { mount, render } from 'enzyme';
import mountTest from '@tests/shared/mountTest';
import BreadCrumbs from '../index';

const list = [
  {
    key: 'home',
    title: '首页'
  },
  {
    key: 'bread-crumbs',
    title: '面包屑'
  }
];
describe('BreadCrumbs', () => {
  mountTest(BreadCrumbs);

  it('renders correctly', () => {
    const wrapper = render(<BreadCrumbs list={list} />);
    expect(wrapper).toMatchSnapshot();
  })

  it('should be trigger click', () => {
    let activeKey = null;
    const wrapper = mount(<BreadCrumbs list={list} onClick={item => { activeKey = item.key }} />);

    wrapper.find('li').at(0).simulate('click')
    expect(activeKey).toBe('home');

    wrapper.find('li').at(1).simulate('click')
    expect(activeKey).toBe('bread-crumbs');
  })

  it('should be support different size', () => {
    const size = ['large', 'default', 'small'];
    size.forEach(type => {
      const wrapper = mount(<BreadCrumbs list={list} size={type}/>);
      expect(wrapper.find(`cloud-breadcrumbs-${type}`)).toBeTruthy();
      wrapper.unmount();
    });
  })
});
