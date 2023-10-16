---
order: 3
title: 分页
desc: supportAjaxPage使用介绍
---

```jsx

            /**
             * title: 分页
             * desc: supportAjaxPage使用介绍
             */
import React, { Component } from 'react';
import { Table } from 'cloud-react';

// 唯一标识符，该值不允许重复
const gridManagerName = 'ajax-page-table';
const columnData = [
	{
		key: 'title',
		remind: 'the title',
		text: '标题'
	},
	{
		key: 'readNumber',
		text: '阅读量',
		width: '150px',
		align: 'center'
	},
	{
		key: 'info',
		text: '简介'
	}
];
class TableDemo extends Component {
	render() {
		return (
			<Table
				gridManagerName={gridManagerName}
				ajaxData="https://www.lovejavascript.com/blogManager/getBlogList"
				ajaxType="POST"
				columnData={columnData}
				supportAjaxPage={true}
				dataKey={'data'} // 指定返回数据列表的key键值
				totalsKey={'totals'} // 指定返回数据总条数的key键值
			/>
		);
	}
}
export default TableDemo;
```
