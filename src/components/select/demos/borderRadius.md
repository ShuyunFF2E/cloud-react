---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
/**
 * title: 自定义圆角
 * desc: 自定义圆角
 */
import React, { useState } from "react";
import { Select, Radio } from "cloud-react";

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
  const [borderRadiusSize, setBorderRadiusSize] = useState("default");
  const handleChange = (value, prevValue) => {
    console.log("select --- " + value);
    console.log("prevSelect --- " + prevValue);
  };

  return (
    <div className="demo">
      <Radio.Group
        value={borderRadiusSize}
        onChange={setBorderRadiusSize}
        style={{ marginBottom: 20 }}
      >
        <Radio value="default">圆角：default</Radio>
        <Radio value="medium">圆角：medium</Radio>
        <Radio value="large">圆角：large</Radio>
      </Radio.Group>
      <Select
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        borderRadiusSize={borderRadiusSize}
      />
    </div>
  );
}
```
