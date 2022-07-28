---
title: 可收起展开的提示
desc: 超过高度限制后可收起或展开
order: 6
---

```jsx
/**
 * title: 可收起展开的提示
 * desc: 超过高度限制后可收起或展开
 */

import React from 'react';
import { Tips, Button } from 'cloud-react';

export default class TipsDemo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tips
          collapsible
          closable
          isShowIcon
          msg="提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文"
          action="操作按钮"
          style={{ width: 400 }}
        />

        <Tips
          collapsible
          closable
          isShowIcon
          msg="提醒文字提醒文字提醒文字提醒文字提醒提醒文字提醒文字提醒文字提醒文字提醒"
          description="提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文"
          style={{ width: 400 }}
        />
      </div>
    );
  }
}
```
