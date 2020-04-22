---
order: 2
title: 分页基础用法
desc: 更多分页
---

```javascript
import React from 'react';
import { Pagination } from 'cloud-react';

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
				<Pagination onChange={this.onChange} total={500} current={this.state.current} pageSize={this.state.pageSize} />
			</>
		);
	}
}
```
