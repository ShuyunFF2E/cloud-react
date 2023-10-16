---
order: 4
title: 各种大小
desc: 三种大小 `small`、`default`、`large`，默认为 `defalut`
---

```jsx
/**
 * title: 各种大小
 * desc: 三种大小 `small`、`default`、`large`，默认为 `defalut`
 */
import React from 'react';
import { Loading } from 'cloud-react';

class LoadingDemo extends React.Component {
  render() {
    return (
      <div>
        <Loading size="small" />
        <Loading />
        <Loading size="large" />
      </div>
    );
  }
}

export default LoadingDemo;
```
