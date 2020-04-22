---
order: 1
title: 基础用法
desc: 默认配置
---

```javascript
import React, { Component } from 'react';
import { Table } from 'cloud-react';

// 唯一标识符，该值不允许重复
const gridManagerName = 'base-table';

const columnData = [
	{
		key: 'name',
		text: '名称',
		align: 'left'
	},
	{
		key: 'info',
		text: '使用说明'
	}
];
// 模拟一个返回promise的请求。settings为当前实例配置对像, params为当前请求参数
const resouse = (settings, params) => {
	// 返回一个promise
	return fetch('https://www.lovejavascript.com/learnLinkManager/getLearnLinkList').then(res => res.json());
};
export default class TableDemo extends Component {
	render() {
		return <Table gridManagerName={gridManagerName} ajaxData={resouse} columnData={columnData} />;
	}
}
```
