import React from 'react';
import { mount, render } from 'enzyme';
import BreadCrumbs from '..';

describe('BreadCrumbs', () => {
	let list = null;
	let wrapper = null;
	beforeAll(() => {
		list = [
			{
				key: 'home',
				title: '首页'
			},
			{
				key: 'bread-crumbs',
				title: '面包屑'
			},
			{
				key: 'details',
				title: '查看详情'
			}
		];
	});

	afterAll(() => {
		list = null;
		wrapper = null;
	});

	it('正常render', () => {
		wrapper = render(<BreadCrumbs list={list} />);
		expect(wrapper.hasClass('cloud-breadcrumbs')).toBeTruthy();
		expect(wrapper.find('li').length).toBe(3);
	});

	it('指定size', () => {
		wrapper = render(<BreadCrumbs list={list} size="large" />);
		expect(wrapper.hasClass('cloud-breadcrumbs')).toBeTruthy();
		expect(wrapper.hasClass('cloud-breadcrumbs-large')).toBeTruthy();
		expect(wrapper.find('li').length).toBe(3);
	});

	it('onClick', () => {
		let nowKey = null;
		wrapper = mount(
			<BreadCrumbs
				list={list}
				onClick={item => {
					nowKey = item.key;
				}}
			/>
		);
		wrapper
			.find('li')
			.at(0)
			.simulate('click');
		expect(nowKey).toBe('home');

		wrapper
			.find('li')
			.at(1)
			.simulate('click');
		expect(nowKey).toBe('bread-crumbs');

		wrapper
			.find('li')
			.at(2)
			.simulate('click');
		expect(nowKey).toBe('details');
		nowKey = null;
	});
});
