---
order: 5
title: 迷你模式
desc: 分页迷你模式用法
---

```jsx

/**
 * title: 迷你模式
 * desc: 分页迷你模式用法
 */
import React from 'react';
import { Pagination, Checkbox } from 'cloud-react';

export default class PaginationDemo extends React.Component {
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
          <>
            <Pagination
              type="small"
              showQuickJumper
              showPageSizeOptions
              pageSizeOptions={[10, 20]}
              onChange={this.onChange}
              total={100}
              current={this.state.current}
              pageSize={this.state.pageSize}
            />
            <Pagination
              style={{ marginTop: 20 }}
              disabled
              type="small"
              showQuickJumper
              showPageSizeOptions
              pageSizeOptions={[10, 20]}
              onChange={this.onChange}
              total={100}
              current={this.state.current}
              pageSize={this.state.pageSize}
            />
          </>
		);
	}
}
```
