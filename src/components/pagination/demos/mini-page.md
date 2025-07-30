---
order: 5
title: 极简模式
desc: 分页极简模式仅页码用法
---

```jsx
/**
 * title: 极简模式
 * desc: 分页极简模式仅页码用法
 */
import React from "react";
import { Pagination, Checkbox } from "cloud-react";

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
      <>
        <Pagination
          type="mini-page"
          onChange={this.onChange}
          total={100}
          current={this.state.current}
          pageSize={this.state.pageSize}
        />
        <Pagination
          style={{ marginTop: 20 }}
          disabled
          type="mini-page"
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
