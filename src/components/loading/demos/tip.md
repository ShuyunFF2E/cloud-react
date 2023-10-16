---
order: 5
title: 自定义描述文案
desc:
---

```jsx
/**
 * title: 自定义描述文案
 * desc:
 */
import React from 'react';
import { Loading } from 'cloud-react';

class LoadingDemo extends React.Component {
  render() {
    return <Loading tip="Loading加载提示" />;
  }
}
export default LoadingDemo;
```
