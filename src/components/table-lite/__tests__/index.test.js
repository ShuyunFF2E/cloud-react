import React from 'react';
import { mount, render } from 'enzyme';
import TableLite from '..';

describe('TableLite', () => {
	let columnData = null;
	let baseData = null;
	let treeData = null;
	let wrapper = null;
	beforeAll(() => {
		columnData = [
			{
				key: 'name',
				width: '200px',
				text: '参与人',
				template: (name, rowData) => {
					return (
						<a className="demo-github" href={`https://github.com/${name}`} target="_black">
							<img alt="" className="demo-pic" src={rowData.pic} />
							<span className="demo-username">{name}</span>
						</a>
					);
				}
			},
			{
				key: 'components',
				text: '参与组件',
				template: components => {
					return components ? components.join(', ') : '--';
				}
			},
			{
				key: 'other',
				text: '其它贡献',
				align: 'right'
			}
		];
		baseData = [
			{
				id: 1,
				name: 'rookie125',
				pic: 'https://avatars3.githubusercontent.com/u/11306273?s=60&v=4',
				components: ['Form', 'Button', 'Input', 'Field', 'Step'],
				other: ['文档化搭建'],
				priority: 1
			},

			{
				id: 2,
				name: 'rookie125',
				pic: 'https://avatars3.githubusercontent.com/u/11306273?s=60&v=4',
				components: ['Form', 'Button', 'Input', 'Field', 'Step'],
				other: ['文档化搭建'],
				priority: 1
			}
		];
		treeData = [
			{
				id: 1,
				name: 'h1~h6',
				info: '用来定义 HTML 标题',
				rowExpandable: false,
				children: [
					{
						id: 11,
						name: 'h1',
						info: '定义重要等级最高的标题'
					},
					{
						id: 12,
						name: 'h2',
						info: '用来定义 HTML 标题'
					}
				]
			},
			{
				id: 2,
				name: 'a',
				info: '定义超链接，用于从一个页面链接到另一个页面'
			},
			{
				id: 3,
				name: 'table',
				info: '定义 HTML 表格',
				rowExpandable: true,
				children: [
					{
						id: 31,
						name: 'thead',
						info: '用于组合 HTML 表格的表头内容'
					}
				]
			}
		];
	});

	afterAll(() => {
		columnData = null;
		baseData = null;
		treeData = null;
		wrapper = null;
	});

	it('正常render', () => {
		wrapper = render(<TableLite height={300} className="test" dataSource={baseData} columnData={columnData} />);
		expect(wrapper.hasClass('cloud-table-lite-warp')).toBeTruthy();
		expect(wrapper.hasClass('test')).toBe(true);
		expect(wrapper.find('.cloud-table-lite-header').length).toBe(1);
		expect(wrapper.find('.cloud-table-lite-main').length).toBe(1);
		expect(wrapper.find('table').length).toBe(2);
		expect(wrapper.find('thead').length).toBe(2);
		expect(wrapper.find('tbody').length).toBe(1);
		expect(wrapper.find('tbody tr').length).toBe(2);
		expect(wrapper.find('tbody tr.cloud-table-lite-empty').length).toBe(0);
	});

	it('数据为空', () => {
		wrapper = render(<TableLite height={300} dataSource={[]} columnData={columnData} />);
		expect(wrapper.hasClass('cloud-table-lite-warp')).toBeTruthy();
		expect(wrapper.hasClass('test')).toBe(false);
		expect(wrapper.find('.cloud-table-lite-header').length).toBe(1);
		expect(wrapper.find('.cloud-table-lite-main').length).toBe(1);
		expect(wrapper.find('table').length).toBe(2);
		expect(wrapper.find('thead').length).toBe(2);
		expect(wrapper.find('tbody').length).toBe(1);
		expect(wrapper.find('tbody tr').length).toBe(1);
		expect(wrapper.find('tbody tr.cloud-table-lite-empty').length).toBe(1);
	});

	it('变更props', () => {
		wrapper = mount(<TableLite height={300} dataSource={[]} columnData={columnData} />);
		expect(wrapper.hasClass('test')).toBe(false);
		expect(wrapper.find('tbody tr').length).toBe(1);
		expect(wrapper.find('tbody tr.cloud-table-lite-empty').length).toBe(1);

		wrapper.setProps({ className: 'test' });
		expect(wrapper.hasClass('test')).toBe(true);
		expect(wrapper.find('tbody tr').length).toBe(1);
		expect(wrapper.find('tbody tr.cloud-table-lite-empty').length).toBe(1);

		wrapper.setProps({ className: 'test', dataSource: baseData });
		expect(wrapper.hasClass('test')).toBe(true);
		expect(wrapper.find('tbody tr').length).toBe(2);
		expect(wrapper.find('tbody tr.cloud-table-lite-empty').length).toBe(0);
	});

	it('树结构', () => {
		// 未开启树结构、仅传入树结构数据
		wrapper = mount(<TableLite height={300} dataSource={treeData} columnData={columnData} />);
		expect(wrapper.find('tbody tr').length).toBe(3);

		// 开启树结构
		wrapper.setProps({ expandable: true });
		expect(wrapper.find('tbody tr').length).toBe(4);

		// 指定一个错的childrenKey
		wrapper.setProps({ childrenKey: 'errorKey' });
		expect(wrapper.find('tbody tr').length).toBe(3);

		// 指定正确的childrenKey
		wrapper.setProps({ childrenKey: 'children' });
		expect(wrapper.find('tbody tr').length).toBe(4);

		// 通过事件展开一个父节点
		let action = wrapper.find('i.cloud-table-lite-tree-action');
		expect(action.length).toBe(2);
		action.first().simulate('click');
		expect(wrapper.find('tbody tr').length).toBe(6);

		action.at(1).simulate('click');
		expect(wrapper.find('tbody tr').length).toBe(5);

		action = null;
	});
});
