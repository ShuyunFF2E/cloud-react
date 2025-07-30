---
order: 1
title: 级联选择器
desc: 弹出位置
---

```jsx
import React, { useState } from "react";
import { Button, CCascader } from "cloud-react";
const addressOptions = [
  {
    value: "zhejiang",
    label: "Zhejiang",

    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
          {
            value: "xiasha",
            label: "Xia Sha",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua men",
          },
        ],
      },
    ],
  },
];

export default function Demo() {
  const [placement, setPlacement] = useState("bottomLeft");
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
      <div>
        <h5>上左</h5>
        <CCascader
          style={{ width: 328 }}
          options={addressOptions}
          onChange={onChange}
          placeholder="Please select"
          placement="topLeft"
        />
      </div>
      <div>
        <h5>上右</h5>
        <CCascader
          style={{ width: 328 }}
          options={addressOptions}
          onChange={onChange}
          placeholder="Please select"
          placement="topRight"
        />
      </div>
      <div>
        <h5>下左</h5>
        <CCascader
          style={{ width: 328 }}
          options={addressOptions}
          onChange={onChange}
          placeholder="Please select"
          placement="bottomLeft"
        />
      </div>
      <div>
        <h5>下右</h5>
        <CCascader
          style={{ width: 328 }}
          options={addressOptions}
          onChange={onChange}
          placeholder="Please select"
          placement="bottomRight"
        />
      </div>
    </div>
  );
}
```
