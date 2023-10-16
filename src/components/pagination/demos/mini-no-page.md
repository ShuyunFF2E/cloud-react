---
order: 5
title: 极简模式
desc: 分页极简模式无页码用法
---

```jsx

/**
 * title: 极简模式
 * desc: 分页极简模式无页码用法
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Pagination
                type="mini-no-page"
                onChange={this.onChange}
                total={100}
                current={this.state.current}
                pageSize={this.state.pageSize}
              />
              （ <span>当前页数：{this.state.current}</span> ）
            </div>
            <Pagination
              style={{ marginTop: 20 }}
              disabled
              type="mini-no-page"
              total={100}
              onChange={this.onChange}
              current={5}
              pageSize={this.state.pageSize}
            />
          </>
		);
	}
}

export default PaginationDemo;
```
