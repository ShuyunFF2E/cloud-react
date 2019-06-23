---
order: 1
title: 基础用法
desc: 默认配置
---

````javascript
import React, { Component } from 'react';
import Table from 'ccms-components-react/table';

// 唯一标识符，该值不允许重复
const gridManagerName = 'base-table';

const columnData = [
	{
		key: 'name',
		text: '名称'
	},{
		key: 'info',
		text: '使用说明'
	},{
		key: 'url',
		text: 'url'
	}
];
export default class TableDemo extends Component {
	render() {
		return (
			<Table
				gridManagerName={gridManagerName}
				ajax_data='http://www.lovejavascript.com/learnLinkManager/getLearnLinkList'
				columnData={columnData}
			/>
		);
	}
}

````
