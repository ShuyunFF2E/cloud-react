---
order: 1
title: 分页基础用法
desc: 基础分页。
---

````javascript
import React from 'react';
import TablePagination from 'ccms-components-react/table-pagination';


export default class PaginationDemo extends React.Component {
	state = {
		current: 1
	}

	onChange = (current, pageSize) => {
		console.log('current: %d,pageSize: %s', current, pageSize)
		this.setState({
			current
		})
	}

	render() {
		return (
			<>
				<TablePagination
					total={50}
					current={this.state.current}
					onChange={this.onChange}
				/>
			</>
		);
	}
}
````
