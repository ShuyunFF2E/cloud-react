---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
/**
 * title: 基本使用
 * desc: 基本使用
 */
import React, { useState } from "react";
import { Select } from "cloud-react";

const Option = Select.Option;

const dataList = [
  {
    label: "JQuery",
    value: "1",
  },
  {
    label: "Vue",
    value: "2",
  },
  {
    label: "React",
    value: "3",
  },
  {
    label: "Angular",
    value: "4",
  },
];

export default function SelectDemo() {
  const handleChange = (value, prevValue) => {
    console.log("select --- " + value);
    console.log("prevSelect --- " + prevValue);
  };

  return (
    <div className="demo">
      <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
        <div>
          <h5>单选</h5>
          <Select
            style={{ width: 328 }}
            allowClear
            onChange={handleChange}
            dataSource={dataList}
          />
        </div>
        <div>
          <h5>多选</h5>
          <Select
            style={{ width: 328 }}
            multiple
            allowClear
            onChange={handleChange}
            dataSource={dataList}
          />
        </div>
        <div>
          <h5>暂无数据</h5>
          <Select style={{ width: 328 }} allowClear dataSource={[]} />
        </div>
      </div>
    </div>
  );
}
```
