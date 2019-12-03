---
order: 3
title: 刷新
desc: 刷新当前页面
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
					total={500}
					showTotal={true}
					showRefresh={true}
					style={{marginBottom: '20'}}
					current={this.state.current}
					pageSize={this.state.pageSize}
					onChange={this.onChange}
				/>
			</>
		);
	}
}
````
