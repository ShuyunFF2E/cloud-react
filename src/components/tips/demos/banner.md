---
title: 通栏提示
desc: 文字居中，可关闭，伴随展开效果出现
order: 7
---

```jsx
/**
 * title: 通栏提示
 * desc: 文字居中，可关闭，伴随展开效果出现
 */

import React from 'react';
import { Tips } from 'cloud-react';

export default class TipsDemo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tips
          mode="banner"
          msg="提示文字 提示文字 提示文字 提示文字"
        />

        <Tips
          type="warning"
          mode="banner"
          closable
          msg="提示文字 提示文字 提示文字 提示文字"
        />
      </div>
    );
  }
}
```
