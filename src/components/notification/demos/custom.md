---
order: 1
title: Drawer
desc: 抽屉组件基础用法
---

```jsx
import React, { useState } from 'react';
import { Notification, Button, Message, Icon, Radio, Checkbox } from 'cloud-react';

export default function NotificationDemo() {
  const open = (props = {}) => {
    Notification.open({
      title: '这里是标题',
      content: '消息通知内容消息通知内容消息',
      showIcon: true,
      duration: 0,
      ...props
    });
  }
  return (
    <div style={{ display: 'flex', gap: 20, marginBottom: 20, marginTop: 15 }}>
      <Button
        onClick={() => open({
          style: {
            border: '1px solid #496BF5',
            background: '#F5F7FF'
          }
        })}>
        自定义边框
      </Button>
      <Button onClick={() => open({ isLightTheme: true, style: { background: '#496BF5' } })}>自定义背景</Button>
    </div>
  );
}
```
