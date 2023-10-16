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
import { Pagination } from 'cloud-react';

class PaginationDemo extends React.Component {
	state = {
		current: 5,
		pageSize: 10,
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
          <Pagination
            total={500}
            showPageSizeOptions={true}
            onChange={this.onChange}
            current={this.state.current}
            pageSize={this.state.pageSize}
          />
		);
	}
}

export default PaginationDemo;
```
