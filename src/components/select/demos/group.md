---
order: 2
title: 分组下拉基本使用
desc: 基本使用
---

```jsx
/**
 * title: 分组下拉基本使用
 * desc: 基本使用
 */
import React, { useState } from "react";
import { Select } from "cloud-react";

const Option = Select.Option;

const dataList = [
  {
    label: "淘宝",
    value: "taobao",
    options: [
      {
        label: "淘宝店",
        value: 11,
      },
      {
        label: "天猫店",
        value: 10,
      },
    ],
  },
  {
    label: "京东",
    value: "jos",
    options: [
      {
        label: "自营店",
        value: 20,
      },
      {
        label: "非自营店",
        value: 21,
      },
    ],
  },
];

export default function SelectDemo() {
  const [value, setValue] = useState(20);
  const handleChange = (value, prevValue) => {
    console.log("select --- " + value);
    console.log("prevSelect --- " + prevValue);
    setValue(value);
  };

  return (
    <div className="demo">
      <Select
        value={value}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
      />
    </div>
  );
}
```
