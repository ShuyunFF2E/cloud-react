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
let dataSource = [];
export default class IconDemo extends Component {
	constructor() {
		super();
		this.state = {
			dataSource
		};
	}

	render() {
		const { dataSource } = this.state;
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
