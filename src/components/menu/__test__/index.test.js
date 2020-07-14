import React from 'react';
import { render, mount } from 'enzyme';

import Menu from '../index';

const menuSource = [
	{
		title: '北京',
		key: '/beijing',
		children: [
			{
				title: <span style={{ color: 'red', fontWeight: 'bold' }}>朝阳区</span>,
				key: '/beijing/chaoyang'
			},
			{
				title: '海淀区',
				key: '/beijing/haidian'
			}
		]
	},
	{
		title: '上海',
		key: '/shanghai',
		children: [
			{
				title: '浦东区',
				key: '/shanghai/pudong'
			},
			{
				title: '南京路',
				key: '#/shanghai/nanjinglu'
			}
		]
	}
];

describe('Menu', () => {
	it('renders correctly with composition', () => {
		const wrapper = render(
			<Menu>
				<Menu.MenuItem key="1">menuItem1</Menu.MenuItem>
				<Menu.SubMenu key="2" title="subMenu2">
					<Menu.MenuItem key="21">menuItem2</Menu.MenuItem>
					<Menu.MenuItem key="22">menuItem3</Menu.MenuItem>
				</Menu.SubMenu>
			</Menu>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders correctly with structual data', () => {
		const wrapper = render(<Menu source={menuSource}></Menu>);
		expect(wrapper).toMatchSnapshot();
	});

	it('openKeys works correctly', () => {
		const wrapper = mount(<Menu source={menuSource} openKeys={['/beijing']}></Menu>);

		// initial
		expect(
			wrapper
				.find('.group-sub')
				.at(0)
				.hasClass('expand')
		).toBeTruthy();
		expect(
			wrapper
				.find('.group-sub')
				.at(1)
				.hasClass('collapse')
		).toBeTruthy();

		// props change
		wrapper.setProps({ openKeys: ['/beijing', '/shanghai'] });

		expect(wrapper.state().openKeys).toEqual(['/beijing', '/shanghai']);

		expect(
			wrapper
				.find('.group-sub')
				.at(0)
				.hasClass('expand')
		).toBeTruthy();

		expect(
			wrapper
				.find('.group-sub')
				.at(1)
				.hasClass('expand')
		).toBeTruthy();
	});

	it('selectedKeys works correctly', () => {
		const wrapper = mount(<Menu source={menuSource} selectedKeys="/beijing/haidian"></Menu>);

		// initial
		expect(
			wrapper
				.find('.group-sub')
				.at(0)
				.find('.item')
				.at(1)
				.hasClass('active')
		).toBeTruthy();

		// props change
		wrapper.setProps({ selectedKeys: '/beijing/chaoyang' });
		expect(
			wrapper
				.find('.group-sub')
				.at(0)
				.find('.item')
				.at(0)
				.hasClass('active')
		).toBeTruthy();
	});

	it("parent/ancestor SubMenu could be opend, when selectedKeys startsWith parent SubMenu's key", () => {
		const wrapper = mount(
			<Menu selectedKeys="abcde">
				<Menu.SubMenu key="abc" title="第一层">
					<Menu.SubMenu key="abcd" title="第二层">
						<Menu.MenuItem key="abcde">最内层</Menu.MenuItem>
					</Menu.SubMenu>
				</Menu.SubMenu>
			</Menu>
		);
		expect(
			wrapper
				.find('.item')
				.at(0)
				.hasClass('active')
		).toBeTruthy();
		expect(
			wrapper
				.find('.group-sub')
				.at(0)
				.hasClass('expand')
		).toBeTruthy();
		expect(
			wrapper
				.find('.group-sub .group-sub')
				.at(0)
				.hasClass('expand')
		).toBeTruthy();
	});

	it('onItemClick works correctly', () => {
		const handleItemClick = jest.fn();
		const wrapper = mount(<Menu source={menuSource} onItemClick={handleItemClick}></Menu>);
		wrapper
			.find('.item')
			.at(0)
			.simulate('click');
		expect(handleItemClick).toBeCalledWith('/beijing/chaoyang', ['/beijing/chaoyang', '/beijing']);
	});

	it('onSubMenuToggle works correctly', () => {
		const handleSubMenuToggle = jest.fn();
		const wrapper = mount(<Menu source={menuSource} onSubMenuToggle={handleSubMenuToggle}></Menu>);
		const target = wrapper.find('.group-title').at(0);

		target.simulate('click');
		expect(handleSubMenuToggle).toBeCalledWith('/beijing', ['/beijing'], true);

		target.simulate('click');
		expect(handleSubMenuToggle).toBeCalledWith('/beijing', ['/beijing'], false);
	});

	it('header works correctly', () => {
		const handleClick = jest.fn();
		const wrapper = mount(
			<Menu
				source={menuSource}
				header={
					<span className="my-header" onClick={handleClick}>
						user header
					</span>
				}></Menu>
		);

		// display correctly
		const target = wrapper.find('.my-header').at(0);
		expect(target.hasClass('my-header')).toBeTruthy();
		expect(wrapper).toMatchSnapshot();

		// event
		target.simulate('click');
		expect(handleClick).toBeCalled();
	});

	it('type works correctly', () => {
		const wrapper = mount(<Menu source={menuSource} type="link"></Menu>);

		expect(
			wrapper
				.find('a>.item')
				.at(0)
				.hasClass('item')
		).toBeTruthy();

		wrapper.setProps({ type: 'common' });
		expect(wrapper.find('a>.item')).toEqual({});
	});
});
