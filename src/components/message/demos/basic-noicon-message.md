---
title: 全局提示无图标
desc: ""
---

```jsx
/**
 * title: 全局提示无图标
 * desc: 最简约风格的提示
 */
import React, { Component } from "react";
import { Button, Message } from "cloud-react";

const blank = "\u00A0";

class MessageDemo extends Component {
  onInfoClick() {
    Message.info("提示信息", {
      showIcon: false,
      showClose: true,
      duration: 0,
      onClose: () => {
        console.log("提示信息关闭触发onClose");
      },
    });
  }

  render() {
    return (
      <div className="app-contain">
        <Button type="normal" onClick={this.onInfoClick}>
          提示
        </Button>
      </div>
    );
  }
}

export default MessageDemo;
```
