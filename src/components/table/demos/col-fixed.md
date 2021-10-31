---
order: 8
title: 固定列
desc: columnData中fixed的使用介绍
---

```jsx

            /**
             * title: 固定列
             * desc: columnData中fixed的使用介绍
             */
import React, { Component } from 'react';
import { Table } from 'cloud-react';
// 唯一标识符，该值不允许重复
const gridManagerName = 'col-fixed-table';

// 组件: 编辑
function EditComponents(props) {
	const { index, row } = props;
	const editAction = event => {
		Table.updateRowData(gridManagerName, 'id', { ...row, title: row.title + '(编辑于' + new Date().toLocaleDateString() + ')' });
	};

	return (
		<span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={editAction} data-index={index} title={row.title}>
			编辑
		</span>
	);
}

const columnData = [
	{
		key: 'title',
		remind: 'the title',
		text: '标题',
		width: '500px'
	},
	{
		key: 'readNumber',
		text: '阅读量',
		align: 'center'
	},
	{
		key: 'info',
		text: '简介',
		width: '500px'
	},
	{
		key: 'action',
		remind: 'the action',
		width: '100px',
		align: 'center',
		fixed: 'right',
		text: '操作',
		// 快捷方式，将自动向组件的props增加row、index属性
		template: <EditComponents />
	}
];

// 复选框的配置项
const checkboxConf = {
	supportCheckbox: true,
	checkboxConfig: {
		fixed: 'left'
	}
};

// 序号的配置项
const autoOrderConf = {
	supportAutoOrder: true,
	autoOrderConfig: {
		fixed: 'left'
	}
};
export default class TableDemo extends Component {
	render() {
		return (
			<Table
				gridManagerName={gridManagerName}
				ajaxData="https://www.lovejavascript.com/blogManager/getBlogList"
				ajaxType="POST"
				columnData={columnData}
				{...checkboxConf}
				{...autoOrderConf}
				supportAjaxPage={true}
				dataKey={'data'} // 指定返回数据列表的key键值
				totalsKey={'totals'} // 指定返回数据总条数的key键值
			/>
		);
	}
}
```
