---
order: 2
title: 基础用法
desc: 显示数据总数
---

````javascript
import React from 'react';
import { TablePagination } from 'cloud-react';

export default class PaginationDemo extends React.Component {
	state = {
		current: 1,
		pageSize: 10
	}

	onChange = (current, pageSize) => {
		console.log('current: %d,pageSize: %s', current, pageSize)
		this.setState({
			current,
			pageSize
		})
	}
	render() {
		return (
			<>
				<TablePagination
					showTotal={true}
					total={500}
					current={this.state.current}
					pageSize={this.state.pageSize}
					onChange={this.onChange}
				/>
			</>
		);
	}
}
````
