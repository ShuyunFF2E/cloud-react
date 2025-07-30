---
order: 4
title: 跳转
desc: 禁用状态
---

```jsx
/**
 * title: 禁用状态
 * desc: 禁用状态
 */
import React from "react";
import { Pagination } from "cloud-react";

class PaginationDemo extends React.Component {
  state = {
    current: 5,
    pageSize: 10,
  };

  onChange = (current, pageSize) => {
    console.log("current: %d,pageSize: %s", current, pageSize);
    this.setState({
      current,
      pageSize,
    });
  };

  render() {
    return (
      <Pagination
        disabled
        onChange={this.onChange}
        current={this.state.current}
        total={500}
        pageSize={this.state.pageSize}
        pageSizeOptions={[100, 200, 300]}
        showPageSizeOptions={true}
        showQuickJumper={true}
      />
    );
  }
}

export default PaginationDemo;
```
