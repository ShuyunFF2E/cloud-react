---
order: 5
title: 分页简易模式用法
desc: 简易模式
---

```jsx

/**
 * title: 分页简易模式用法
 * desc: 简易模式
 */
import React from 'react';
import Pagination from '../index';

export default class PaginationDemo extends React.Component {
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
			<>
				<Pagination type="simple" onChange={this.onChange} total={50} current={this.state.current} pageSize={this.state.pageSize} />
			</>
		);
	}
}
```
