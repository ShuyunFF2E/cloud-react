---
title: 可关闭的提示
desc: 点击按钮关闭提示，可自定义关闭icon或文字，及事件回调
order: 3
---

```jsx
/**
 * title: 可关闭的提示
 * desc: 点击按钮关闭提示，可自定义关闭icon或文字，及事件回调
 */

import React from "react";
import { Tips } from "cloud-react";

class TipsDemo extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Tips msg="可关闭的提示" closable />

        <Tips
          type="warning"
          msg="自定义关闭图标，默认closable"
          closeIcon="close-line"
        />

        <Tips
          type="major"
          msg="自定义关闭文字，默认closable，优先级高于closeIcon"
          closeText="关闭"
        />

        <Tips
          type="success"
          msg="点击关闭时回调"
          closable
          onClose={() => console.log("onClose调用")}
        />
      </div>
    );
  }
}
export default TipsDemo;
```
