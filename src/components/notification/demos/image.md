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
      showCancelBtn: true,
      showConfirmBtn: true,
      duration: 0,
      showCloseIcon: true,
      img: (
        <img
          alt="img"
          src="https://brand-guide.shuyun.com/IAM/9677a408554b.png"
        />
      ),
      //   img: <img alt="img" src="https://brand-guide.shuyun.com/IAM/3791de5591a7.jpg"/>
    });
  };
  return <Button onClick={open}>打开消息</Button>;
}
```
