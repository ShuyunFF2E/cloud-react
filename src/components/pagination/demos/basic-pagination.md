---
order: 1 title: 分页基础用法 desc: 基础分页。
---

```jsx

/**
 * title: 分页基础用法
 * desc: 基础分页。
 */
import React from 'react';
import { Pagination } from 'cloud-react';

class PaginationDemo1 extends React.Component {
  state = {
    current: 5,
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
      <Pagination onChange={this.onChange} total={100} current={this.state.current} pageSize={this.state.pageSize} />
    );
  }
}

class PaginationDemo extends React.Component {
  state = {
    current: 1,
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
      <React.Fragment>
        <Pagination total={50} current={1} pageSize={this.state.pageSize}
                    style={{ marginBottom: '20px' }} />
        <Pagination onChange={this.onChange} total={100} current={this.state.current} pageSize={this.state.pageSize}
                    style={{ marginBottom: '20px' }} />
        <PaginationDemo1/>
      </React.Fragment>
    );
  }
}

export default PaginationDemo;
```
