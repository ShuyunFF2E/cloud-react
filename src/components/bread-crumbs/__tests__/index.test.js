import React from 'react';
import { render } from 'enzyme';
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
				key: 'a3',
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
	});
});
