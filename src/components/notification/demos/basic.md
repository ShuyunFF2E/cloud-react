---
order: 1
title: Drawer
desc: 抽屉组件基础用法
---

```jsx
import React, { useState } from "react";
import { Notification, Button } from "cloud-react";

export default function NotificationDemo() {
  const open = () => {
    Notification.open({
      title: "这里是标题",
      content: "消息通知内容消息通知内容消息",
    });
  };
  const open1 = () => {
    Notification.open({
      title: "这里是标题",
      content: "消息通知内容消息通知内容消息",
      showCancelBtn: true,
      showConfirmBtn: true,
      duration: 0,
      showCloseIcon: true,
    });
  };
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Button onClick={open}>打开消息-自动关闭</Button>
      <Button onClick={open1}>打开消息-手动关闭</Button>
    </div>
  );
}
```
