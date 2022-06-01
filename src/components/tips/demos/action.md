---
title: 可自定义操作的提示
desc: 自定义操作项
order: 5
---

```jsx
/**
 * title: 可自定义操作的提示
 * desc: 自定义操作项
 */

import React from 'react';
import { Tips, Button } from 'cloud-react';

export default class TipsDemo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tips msg="action String" action="操作按钮" />

        <Tips
          type="warning"
          msg="action JSX"
          action={<Button type="text">操作按钮</Button>}
        />

        <Tips
          type="major"
          isShowIcon
          closable
          msg="action action action"
          description="这里是描述性文字 这里是描述性文字 这里是描述性文字"
          action={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div>操作按钮</div>
              <div>操作按钮</div>
            </div>
          }
        />
      </div>
    );
  }
}
```
