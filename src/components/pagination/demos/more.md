---
order: 2
title: 分页基础用法
desc: 更多分页
---

```jsx

            /**
             * title: 分页基础用法
             * desc: 更多分页
             */
import React from 'react';
import Pagination from '../index';

class PaginationDemo extends React.Component {
	state = {
		current: 1,
		pageSize: 10
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
				<Pagination onChange={this.onChange} total={500} current={this.state.current} pageSize={this.state.pageSize} />
			</React.Fragment>
		);
	}
}
export default PaginationDemo
```
