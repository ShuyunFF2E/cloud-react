---
title: 带icon的提示
desc: 添加对应主题icon，也可自定义icon
order: 2
---

```jsx
/**
 * title: 带icon的提示
 * desc: 添加对应主题icon，也可自定义icon
 */
import React from 'react';
import { Tips } from 'cloud-react';

class TipsDemo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tips msg="normal icon" isShowIcon />
        <Tips type="warning" isShowIcon msg="warning icon" />
        <Tips type="major" isShowIcon msg="major icon" />
        <Tips type="success" isShowIcon msg="success icon" />
        <Tips icon="flag-solid" msg="自定义icon，默认isShowIcon" />
      </div>
    );
  }
}
export default TipsDemo;
```
