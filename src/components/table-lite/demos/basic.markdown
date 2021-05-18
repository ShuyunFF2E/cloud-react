---
order: 1
title: 基础用法
desc: 最基本的一个表格
---

```javascript
import React, { Component } from 'react';
import { TableLite } from 'cloud-react';

const columnData = [
	{
		key: 'name',
		width: '200px',
		text: '参与人',
		template: (name, rowData) => {
            setTimeout(() => {
                console.log('setTimeout');
                name = 'baukh';
            }, 3000);
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
		text: '参与组件',
		template: components => {
			return components ? components.join(', ') : '--';
		}
	},
	{
		key: 'other',
		text: '其它贡献',
		align: 'right',
		template: other => {
			return other ? other.join(', ') : '--';
		}
	}
];
let dataSource = [
	{
		id: 1,
		name: 'rookie125',
		pic: 'https://avatars3.githubusercontent.com/u/11306273?s=60&v=4',
		components: ['Form', 'Button', 'Input', 'Field', 'Step'],
		other: ['文档化搭建']
	},
	{
		id: 2,
		name: 'silence717',
		pic: 'https://avatars0.githubusercontent.com/u/8267830?s=60&v=4',
		components: ['Upload', 'Toggle', 'InputNumber', 'Radio', 'Tag'],
		other: ['前端架构', '样式整改']
	},
	{
		id: 3,
		name: 'baukh789',
		pic: 'https://avatars3.githubusercontent.com/u/11342827?s=60&v=4',
		components: ['Icon', 'Table'],
		other: ['服务器搭建', 'CI']
	},
	{
		id: 4,
		name: 'lazyperson',
		pic: 'https://avatars3.githubusercontent.com/u/18607584?s=460&v=4',
		other: ['前期InputNumber、DatePicker开发']
	},
	{
		id: 5,
		name: 'xtfan21',
		pic: 'https://avatars3.githubusercontent.com/u/23092282?s=60&v=4',
		components: ['Message', 'Tips']
	},
	{
		id: 6,
		name: 'BoWang816',
		pic: 'https://avatars0.githubusercontent.com/u/26587649?s=60&v=4',
		components: ['Modal'],
		other: ['前期tree开发']
	},
	{
		id: 7,
		name: 'heriky',
		pic: 'https://avatars1.githubusercontent.com/u/12195736?s=460&v=4',
		components: ['Tabs']
	},
	{
		id: 8,
		name: 'runrunlolz',
		pic: 'https://avatars0.githubusercontent.com/u/20176682?s=60&v=4',
		components: ['Tooltip']
	},
	{
		id: 9,
		name: 'greria',
		pic: 'https://avatars3.githubusercontent.com/u/16697576?s=400&v=4',
		components: ['Select', 'DatePicker']
	},
	{
		id: 10,
		name: 'liyuan-meng',
		pic: 'https://avatars1.githubusercontent.com/u/34151318?s=60&v=4',
		components: ['Checkbox', 'Tree']
	},
	{
		id: 11,
		name: 'DongWJ',
		pic: 'https://avatars0.githubusercontent.com/u/24518633?s=60&v=4',
		components: ['Loading']
	},
	{
		id: 12,
		name: 'jsonliu6',
		pic: 'https://avatars1.githubusercontent.com/u/15153054?s=460&v=4',
		components: ['Pagination']
	}
];
export default class IconDemo extends Component {
	constructor() {
		super();
		this.state = {
			dataSource,
            columnData
		};
	}

	render() {
		const { dataSource, columnData } = this.state;
		return <TableLite height={300} dataSource={dataSource} columnData={columnData} />;
	}
}
```

```less
.demo-github {
	display: block;
	.demo-pic {
		vertical-align: middle;
		margin-right: 10px;
		width: 50px;
		border-radius: 10px;
	}
	.demo-username {
		font-size: 14px;
	}
}
```
