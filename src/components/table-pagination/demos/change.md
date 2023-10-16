---
order: 4
title: 改变
desc: 改变每页显示条目数
---

```jsx

            /**
             * title: 改变
             * desc: 改变每页显示条目数
             */
import React from 'react';
import { TablePagination } from 'cloud-react';

class PaginationDemo extends React.Component {
	state = {
		current: 1,
		pageSize: 7
	};

	onChange = (current, pageSize) => {
		console.log('onChange --current: %s', current);
		this.setState({
			current
		});
	};

	onChange = (current, pageSize) => {
		console.log('current: %s, pageSize: %d', current, pageSize);
		this.setState({
			current,
			pageSize
		});
	};

	render() {
		return (
			<React.Fragment>
				<TablePagination
					showRefresh={true}
					current={this.state.current}
					total={500}
					showRefresh={true}
					showTotal={true}
					showPageSizeOptions={true}
					pageSize={this.state.pageSize}
					pageSizeOptions={[5, 10, 15, 20]}
					onChange={this.onChange}
					checkedTotal={1}
				/>
			</React.Fragment>
		);
	}
}

export default PaginationDemo;
```
