---
order: 2
title: 基础用法
desc: 显示数据总数
---

````javascript
import React from 'react';
import TablePagination from 'ccms-components-react/table-pagination';


export default class PaginationDemo extends React.Component {

	render() {
		return (
			<>
				<TablePagination
					showTotal={true}
					total={500}
				/>
			</>
		);
	}
}
````
