---
order: 2
title: 分组下拉基本使用
desc: 基本使用
---

```jsx
/**
 * title: 分组下拉基本使用 - 2
 * desc: 基本使用
 */
import React, { useState } from "react";
import { Select } from "cloud-react";

const Option = Select.Option;

export default function Group2() {
  const handleChange = (value, prevValue) => {
    console.log("select --- " + value);
    console.log("prevSelect --- " + prevValue);
  };

  return (
    <div className="demo">
      <Select defaultValue={"3"} onChange={handleChange} style={{ width: 328 }}>
        <Option value="1">单选文字1</Option>
        <Option value="2">单选文字2</Option>
        <Option type="divider" value="5" />
        <Option value="3">单选文字3</Option>
        <Option value="4">单选文字4</Option>
      </Select>
    </div>
  );
}
```
