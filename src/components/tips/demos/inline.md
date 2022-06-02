---
title: inline 行内提示
desc: 即时提醒，由icon和文本组成
order: 8
---

```jsx
/**
 * title: inline 行内提示
 * desc: 即时提醒，由icon和文本组成
 */
import React from 'react';
import { Tips } from 'cloud-react';

export default class TipsDemo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Tips msg="提示文字" mode="inline" />
        <Tips type="warning" msg="提示文字" mode="inline" />
        <Tips type="major" msg="提示文字" mode="inline" />
        <Tips type="success" msg="提示文字" mode="inline" />
      </div>
    );
  }
}
```
