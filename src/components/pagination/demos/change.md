---
order: 3
title: 改变
desc: 改变每页显示条目数
---

```jsx

            /**
             * title: 改变
             * desc: 改变每页显示条目数
             */
import React from 'react';
import Pagination from '../index';

class PaginationDemo extends React.Component {
	state = {
		current: 1,
		pageSize: 7
	};

	onChange = (current, pageSize) => {
		console.log('current: %d,pageSize: %s', current, pageSize);
		this.setState({
			current,
			pageSize
		});
	};

	render() {
		return (
			<React.Fragment>
				<Pagination
					total={500}
					showPageSizeOptions={true}
					style={{ marginBottom: '20px' }}
					onChange={this.onChange}
					current={this.state.current}
					pageSize={this.state.pageSize}
				/>
				<Pagination total={500} showPageSizeOptions={true} pageSizeOptions={[100, 200, 300]} />
			</React.Fragment>
		);
	}
}
export default PaginationDemo
```
