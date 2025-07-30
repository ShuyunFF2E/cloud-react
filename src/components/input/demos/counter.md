---
order: 5
title: 文字统计
desc: 统计当前输入字数
---

```jsx
/**
 * title: 计数器
 * desc: 统计当前输入字数
 */
import React from "react";
import { Input, Icon } from "cloud-react";

export default function InputDemo() {
  return (
    <div className="input-demo-box">
      <Input hasCounter maxLength="20" size="default" placeholder="请输入" />
      <br />
      <Input
        hasClear
        hasCounter
        maxLength="10"
        size="default"
        placeholder="请输入"
      />
    </div>
  );
}
```
