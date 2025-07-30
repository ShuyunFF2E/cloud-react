---
order: 12
title: 无边框
desc: 无边框样式。
---

```jsx
/**
 * title: 无边框
 * desc: 无边框样式。
 */
import React, { useState, useEffect } from "react";
import { Select, Radio, Input } from "cloud-react";

const Option = Select.Option;

const dataList = [
  {
    label: "苹果",
    value: "apple",
  },
  {
    label: "草莓",
    value: "caomei",
  },
  {
    label: "荔枝",
    value: "lizhi",
  },
];

export default function SelectDemo() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setList([
        { label: "吃饭", value: 1 },
        { label: "睡觉", value: 2 },
      ]);
    }, 1000);
  }, []);

  const handleChange = (value, prevValue) => {
    console.log("select --- " + value);
    console.log("prevSelect --- " + prevValue);
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <Select
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: 80 }}
      defaultValue="apple"
      // trigger="hover"
      showArrow={false}
      showSelectStyle={false}
      dropdownStyle={{ marginTop: -4 }}
    >
      {dataList.map((item, index) => (
        <Option value={item.value} key={index}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
}
```
