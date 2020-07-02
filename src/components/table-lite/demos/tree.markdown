---
order: 1
title: 树结构表格
desc: 使用树结构的表格
---

```javascript
import React from 'react';
import { TableLite } from 'cloud-react';

const columnData = [
	{
		key: 'name',
		text: '标签'
	},
	{
		key: 'info',
		text: '使用说明'
	}
];

// 静态数据
const dataSource = [
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
			},
			{
				id: 13,
				name: 'h3',
				info: '用来定义 HTML 标题'
			},
			{
				id: 14,
				name: 'h4',
				info: '用来定义 HTML 标题'
			},
			{
				id: 15,
				name: 'h5',
				info: '用来定义 HTML 标题'
			},
			{
				id: 16,
				name: 'h6',
				info: '定义重要等级最低的标题'
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
			},
			{
				id: 32,
				name: 'tbody',
				info: '用于组合 HTML 表格的主体内容'
			},
			{
				id: 33,
				name: 'tfoot',
				info: '用于组合 HTML 表格的页脚内容'
			}
		]
	}
];
export default function InputDemo() {
	return <TableLite height={300} className="abc" dataSource={dataSource} expandable={true} columnData={columnData} expandable={true} />;
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
