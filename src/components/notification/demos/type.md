---
order: 1
title: Drawer
desc: 抽屉组件基础用法
---

```jsx
import React, { useState } from "react";
import {
  Notification,
  Button,
  Message,
  Icon,
  Radio,
  Checkbox,
} from "cloud-react";

export default function NotificationDemo() {
  const [borderRadiusSize, setBorderRadiusSize] = useState("default");
  const open = (iconType, icon) => {
    Notification.open({
      title: "这里是标题",
      content:
        "消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息消息通知内容消息通知内容消息通知内容消息",
      showIcon: true,
      showCancelBtn: true,
      showConfirmBtn: true,
      duration: 0,
      showCloseIcon: true,
      iconType,
      icon,
      borderRadiusSize,
      onConfirm: (id) => {
        Message.info("点击确定关闭了！");
        Notification.close(id);
      },
    });
  };
  return (
    <div>
      <Radio.Group
        value={borderRadiusSize}
        onChange={(v) => {
          setBorderRadiusSize(v);
        }}
      >
        <Radio value="small">圆角：3px</Radio>
        <Radio value="middle">圆角：6px</Radio>
        <Radio value="default">圆角：12px</Radio>
      </Radio.Group>
      <div
        style={{ display: "flex", gap: 20, marginBottom: 20, marginTop: 15 }}
      >
        <Button onClick={() => open("info")}>提示类消息</Button>
        <Button onClick={() => open("success")}>成功类消息</Button>
        <Button onClick={() => open("warn")}>警告类消息</Button>
        <Button onClick={() => open("fail")}>失败类消息</Button>
        <Button
          onClick={() => {
            open(
              "",
              <Icon
                type="question-circle-solid"
                style={{
                  color: "#FFBB00",
                  fontSize: 20,
                  position: "relative",
                  top: 1,
                }}
              />
            );
          }}
        >
          自定义图标
        </Button>
      </div>
    </div>
  );
}
```
