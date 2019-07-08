---
order: 1
title: 分页基础用法
desc: 基础分页。
---

````javascript
import React from 'react';
import Pagination from 'ccms-components-react/pagination';


export default class PaginationDemo extends React.Component {
	change = (current) =>{
		console.log('ssss', current)
	}

	showSize = (pageSize) =>{
		console.log(', pageSize', pageSize)
	}

	render() {
		return (
			<>
				<h3>版本1</h3>
				<Pagination
					current={1}
					total={50}
					version="past"
					onChange={this.change}
					showTotal={true}
					pageSizeOptions= {[10,20,30]}
					onShowSizeChange={this.showSize}
					showPageSizeOptions={true}
					/>
				<h3>版本2</h3>
				<Pagination
					current={1}
					total={120}
					showQuickJumper={true}
					pageSizeOptions= {[10,20,30]}
					onShowSizeChange={this.showSize}
					showPageSizeOptions={true}/>
			</>
		);
	}
}
````
