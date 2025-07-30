---
order: 13
title: onBeforeChange函数使用
desc: 下拉值变化前使用
---

```jsx
/**
 * title: onBeforeChange函数使用
 * desc: 下拉值变化前使用
 */
import React, { useState } from "react";
import { Select, Modal } from "cloud-react";

const Option = Select.Option;

const dataList = [
  {
    label: "苹果",
    value: "apple",
  },
  {
    label: "草莓",
    value: "cc",
  },
  {
    label: "荔枝",
    value: "lizhi",
  },
  {
    label:
      "特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项",
    value: 4,
  },
];

export default function SelectDemo() {
  const handleChange = (value) => {
    console.log("select --- " + value);
  };

  const handleBeforeChange = (value) => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        body: "确定切换吗？",
        onOk: () => {
          resolve();
        },
      });
    });
  };

  const handleOpen = () => console.log("open");
  const handleClose = () => console.log("close");

  return (
    <div style={{ height: 300 }}>
      <Select
        placeholder="请选择..."
        onSelectOpen={handleOpen}
        onSelectClose={handleClose}
        onChange={handleChange}
        onBeforeChange={handleBeforeChange}
      >
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}
```
