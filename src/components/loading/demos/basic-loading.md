---
order: 1
title: 基本用法
desc: 一个简单的 loading 状态。
---

```jsx
/**
 * title: 基本用法
 * desc: 一个简单的 loading 状态。
 */
import React from 'react';
import { Loading, Toggle } from 'cloud-react';

class LoadingDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleChange = (loading) => {
    this.setState({ loading });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        Loading state：
        <Toggle checked={loading} onChange={this.handleChange} size="small" />
        <Loading loading={loading} />
      </div>
    );
  }
}

export default LoadingDemo;
```
