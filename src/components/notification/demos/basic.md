---
order: 1
title: Drawer
desc: 抽屉组件基础用法
---

```jsx
import React from 'react';
import { Notification, Button, Message } from 'cloud-react';

const placementList = [
  { label: '左上', value: 'top-left' },
  { label: '右上', value: 'top-right' },
  { label: '左下', value: 'bottom-left' },
  { label: '右下', value: 'bottom-right' },
];

export default function NotificationDemo() {
  const open = () => {
    Notification.open({
      title: '这里是标题',
      content: '消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息',
      showIcon: true,
      showCancelBtn: true,
      showConfirmBtn: true,
      // showDetailBtn: true,
      // duration: 3000,
      onConfirm: id => {
        Message.info('点击确定关闭了！')
        Notification.close(id);
      },
    });
  }
  return (
    <Button onClick={open}>打开消息通知</Button>
  );
}
```
