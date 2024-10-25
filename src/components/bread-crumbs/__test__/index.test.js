import React from 'react';
import { mount, render } from 'enzyme';
import mountTest from '@tests/shared/mountTest';
import BreadCrumbs from '../index';

describe('BreadCrumbs', () => {
  mountTest(BreadCrumbs);
  let list = null;

  beforeAll(() => {
    list = [
      {
        key: 'home',
        title: '首页'
      },
      {
        key: 'bread-crumbs',
        title: '面包屑'
      }
    ];
  });

  afterAll(() => {
    list = null;
  });

  it('renders correctly', () => {
    const wrapper = render(<BreadCrumbs list={list} />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.hasClass('cloud-breadcrumbs')).toBeTruthy();
    expect(wrapper.find('li').length).toBe(2);
  })

  it('should be trigger click', () => {
    let activeKey = null;
    const wrapper = mount(<BreadCrumbs list={list} onClick={item => { activeKey = item.key }} />);

    wrapper.find('li').at(0).simulate('click')
    expect(activeKey).toBe('home');

    wrapper.find('li').at(1).simulate('click')
    expect(activeKey).toBe('bread-crumbs');

    activeKey = null;
  })

  it('should be support different size', () => {
    const size = ['large', 'default', 'small'];
    size.forEach(type => {
      const wrapper = mount(<BreadCrumbs list={list} size={type}/>);

      expect(wrapper.find(`.cloud-breadcrumbs-${type}`)).toBeTruthy();
      expect(wrapper.find('li').length).toBe(2);
      wrapper.unmount();
    });
  })
});
