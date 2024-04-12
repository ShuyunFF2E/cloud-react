---
order: 1
title: Drawer
desc: 抽屉组件基础用法
---

```jsx
import React, { useState } from 'react';
import { Notification, Button } from 'cloud-react';

export default function NotificationDemo() {
  const open = () => {
    Notification.open({
      title: '这里是标题',
      content: '消息通知内容消息通知内容消息',
    });
  }
  return (
    <Button onClick={open}>打开消息</Button>
  );
}
```
