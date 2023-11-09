---
order: 1
title: Drawer
desc: 使用 placement 可以配置通知从右上角、右下角、左下角、左上角弹出。
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
  const open = placement => {
    Notification.open({
      title: '这里是标题',
      content: '消息通知内容消息通知内容消息',
      showIcon: true,
      placement,
      // showCancelBtn: true,
      // showConfirmBtn: true,
      // showDetailBtn: true,
      duration: 0,
      // onConfirm: id => {
      //   Message.info('点击确定关闭了！')
      //   Notification.close(id);
      // },
    });
  }
  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <Button onClick={() => open('top-left')}>从左上打开</Button>
      <Button onClick={() => open('top-right')}>从右上打开</Button>
      <Button onClick={() => open('bottom-left')}>从左下打开</Button>
      <Button onClick={() => open('bottom-right')}>从右下打开</Button>
      <Button onClick={() => open('top')}>从上打开</Button>
      <Button onClick={() => open('bottom')}>从下打开</Button>
    </div>
  );
}
```
