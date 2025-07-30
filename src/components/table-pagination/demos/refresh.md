---
order: 3
title: 刷新
desc: 刷新当前页面
---

```jsx
/**
 * title: 刷新
 * desc: 刷新当前页面
 */
import React from "react";
import { TablePagination } from "cloud-react";

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
      <React.Fragment>
        <TablePagination
          total={500}
          showTotal={true}
          showRefresh={true}
          style={{ marginBottom: "20" }}
          current={this.state.current}
          pageSize={this.state.pageSize}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

export default PaginationDemo;
```
