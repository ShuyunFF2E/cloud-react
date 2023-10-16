---
title: 基本用法
desc: 四种类型 `normal`、`warning`、`major`、`success`，默认为`normal`
order: 1
---

```jsx
/**
 * title: 基本用法
 * desc: 四种类型 `normal`、`warning`、`major`、`success`，默认为`normal`
 */
import React from 'react';
import { Tips } from 'cloud-react';

class TipsDemo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tips msg="normal 默认提示信息" />
        <Tips type="warning" msg="warning 提示信息" />
        <Tips type="major" msg="major 提示信息" />
        <Tips type="success" msg="success 提示信息" />
      </div>
    );
  }
}
export default TipsDemo;
```
