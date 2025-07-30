---
order: 4
title: 展示数据总量
desc: 展示数据总量
---

```jsx
/**
 * title: 展示数据总量
 * desc: 展示数据总量
 */
import React from "react";
import { Pagination } from "cloud-react";

class PaginationDemo extends React.Component {
  state = {
    current: 1,
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
        onChange={this.onChange}
        current={this.state.current}
        total={500}
        pageSize={this.state.pageSize}
        pageSizeOptions={[100, 200, 300]}
        showPageSizeOptions={true}
        showQuickJumper={true}
        showTotal
      />
    );
  }
}

export default PaginationDemo;
```
