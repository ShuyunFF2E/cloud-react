---
order: 5
title: 简易模式
desc: 分页简易模式用法
---

```jsx

/**
 * title: 简易模式
 * desc: 分页简易模式用法
 */
import React from 'react';
import { Pagination, Checkbox } from 'cloud-react';

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
          <>
            <Pagination
              type="simple"
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
              type="simple"
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

export default PaginationDemo;
```
