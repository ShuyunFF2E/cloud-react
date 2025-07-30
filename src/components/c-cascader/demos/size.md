---
order: 1
title: 级联选择器
desc: 单个下拉项目最大宽度
---

```jsx
import React from "react";
import { CCascader } from "cloud-react";
const addressOptions = [
  {
    value: "zhejiang",
    label:
      "ZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiang",
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
            children: [
              {
                value: "xiasha1",
                label:
                  "Xia Sha1Xia Sha1Xia Sha1Xia Sha1Xia Sha1Xia Sha1Xia Sha1",
              },
            ],
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
  return (
    <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
      <div>
        <p style={{ marginBottom: 24 }}>单一选项最大宽度</p>
        <CCascader
          style={{ width: 328 }}
          options={addressOptions}
          placeholder="Please select"
        />
      </div>
      <div>
        <p style={{ marginBottom: 24 }}>多选选项最大宽度</p>
        <CCascader
          multiple
          style={{ width: 328 }}
          options={addressOptions}
          placeholder="Please select"
        />
      </div>
      <div>
        <p style={{ marginBottom: 24 }}>修改单项宽度</p>
        <CCascader
          multiple
          style={{ width: 328 }}
          dropdownMenuColumnStyle={{ width: 120, minWidth: 120 }}
          options={addressOptions}
          placeholder="Please select"
        />
      </div>
    </div>
  );
}
```
