---
order: 3
title: 刷新
desc: 刷新当前页面
---

````javascript
import React from 'react';
import TablePagination from 'ccms-components-react/table-pagination';


export default class PaginationDemo extends React.Component {

	render() {
		return (
			<>
				<TablePagination
					total={500}
					showTotal={true}
					showRefresh={true}
					style={{marginBottom: '20'}}
				/>
			</>
		);
	}
}
````
