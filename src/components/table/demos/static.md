---
order: 2
title: 静态数据
desc: 组件当前维护者信息
---

```jsx

            /**
             * title: 静态数据
             * desc: 组件当前维护者信息
             */
import React, { Component } from 'react';
import { Table, Button, Message } from 'cloud-react';

// 唯一标识符，该值不允许重复
const gridManagerName = 'static-table';
const response = {
	data: [
		{
			name: 'rookie125',
			pic: 'https://avatars3.githubusercontent.com/u/11306273?s=60&v=4',
			components: ['Form', 'Button', 'Input', 'Field', 'Step'],
			other: ['文档化搭建'],
			priority: 1
		},
		{
			name: 'silence717',
			pic: 'https://avatars0.githubusercontent.com/u/8267830?s=60&v=4',
			components: ['Upload', 'Toggle', 'InputNumber', 'Radio', 'Tag'],
			other: ['前端架构', '样式整改'],
			priority: 2
		},
		{
			name: 'baukh789',
			pic: 'https://avatars3.githubusercontent.com/u/11342827?s=60&v=4',
			components: ['Icon', 'Table'],
			other: ['服务器搭建', 'CI'],
			priority: 3
		},
		{
			name: 'lazyperson',
			pic: 'https://avatars3.githubusercontent.com/u/18607584?s=460&v=4',
			other: ['前期InputNumber、DatePicker开发'],
			priority: 4
		},
		{
			name: 'xtfan21',
			pic: 'https://avatars3.githubusercontent.com/u/23092282?s=60&v=4',
			components: ['Message', 'Tips'],
			priority: 5
		},
		{
			name: 'BoWang816',
			pic: 'https://avatars0.githubusercontent.com/u/26587649?s=60&v=4',
			components: ['Modal'],
			other: ['前期tree开发'],
			priority: 6
		},
		{
			name: 'heriky',
			pic: 'https://avatars1.githubusercontent.com/u/12195736?s=460&v=4',
			components: ['Tabs'],
			priority: 7
		},
		{
			name: 'runrunlolz',
			pic: 'https://avatars0.githubusercontent.com/u/20176682?s=60&v=4',
			components: ['Tooltip'],
			priority: 8
		},
		{
			name: 'greria',
			pic: 'https://avatars3.githubusercontent.com/u/16697576?s=400&v=4',
			components: ['Select', 'DatePicker'],
			priority: 9
		},
		{
			name: 'liyuan-meng',
			pic: 'https://avatars1.githubusercontent.com/u/34151318?s=60&v=4',
			components: ['Checkbox', 'Tree'],
			priority: 10
		},
		{
			name: 'DongWJ',
			pic: 'https://avatars0.githubusercontent.com/u/24518633?s=60&v=4',
			components: ['Loading'],
			priority: 12
		},
		{
			name: 'jsonliu6',
			pic: 'https://avatars1.githubusercontent.com/u/15153054?s=460&v=4',
			components: ['Pagination'],
			priority: 13
		}
	],
	totals: 13
};
const columnData = [
	{
		key: 'name',
		remind: '参与人，可点击进入参与人的github',
		width: '200px',
		text: '参与人',
		template: (name, rowData) => {
			return (
				<a className="demo-github" href={'https://github.com/' + name} target="_black">
					<img className="demo-pic" src={rowData.pic} />
					<span className="demo-username">{name}</span>
				</a>
			);
		}
	},
	{
		key: 'components',
		remind: '参与开发的组件',
		text: '参与组件',
		template: components => {
			return components ? components.join(', ') : '--';
		}
	},
	{
		key: 'other',
		remind: '参与人对组件库的其它贡献',
		text: '其它贡献',
		align: 'center',
		template: other => {
			return other ? other.join(', ') : '--';
		}
	}
];

const moveRowConfig = {
	key: 'priority',
	handler: (list, tableData) => {
		// console.log(list, tableData);
	}
};
export default class TableDemo extends Component {
	getCheckedData() {
		console.log(Table.getCheckedData(gridManagerName));
		Message.success('操作成功，请在控制面板查看');
	}
	getTableData() {
		console.log(Table.getTableData(gridManagerName));
		Message.success('操作成功, 请在控制面板查看');
	}
	render() {
		return (
			<>
				<Table
					gridManagerName={gridManagerName}
					ajaxData={response}
					columnData={columnData}
					supportMoveRow={true}
					moveRowConfig={moveRowConfig}
					height={'100%'}
					isIconFollowText={true}
				/>
				<div className="table-action">
					<Button
						onClick={() => {
							this.getCheckedData();
						}}>
						获取选中数据
					</Button>
					<Button
						onClick={() => {
							this.getTableData();
						}}>
						获取完整数据
					</Button>
				</div>
			</>
		);
	}
}
```

