---
order: 1
title: 输入框
desc: 最基本的一个输入框
---

```jsx
/**
 * title: 复合型数值输入框
 * desc: 可前置或后置元素，一般为标签或按钮
 */
import React from "react";
import { InputNumber } from "cloud-react";

export default function InputDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <h5>后置</h5>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <InputNumber
          style={{ width: 200 }}
          placeholder="请输入"
          size="large"
          noStep
          addonAfter="分"
        />
        <InputNumber
          style={{ width: 200 }}
          placeholder="请输入"
          noStep
          addonAfter="积分/次"
        />
        <InputNumber
          style={{ width: 200 }}
          placeholder="请输入"
          size="small"
          noStep
          addonAfter="份"
        />
      </div>
      <h5>前置</h5>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <InputNumber
          style={{ width: 200 }}
          placeholder="请输入"
          size="large"
          addonBefore="¥"
        />
        <InputNumber
          style={{ width: 200 }}
          placeholder="请输入"
          addonBefore="$"
        />
        <InputNumber
          style={{ width: 200 }}
          placeholder="请输入"
          size="small"
          addonBefore="¥"
        />
      </div>
    </div>
  );
}
```
