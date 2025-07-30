---
order: 8
title: 定制化选项
desc: 定制化选项
---

```jsx
/**
 * title: 定制化选项
 * desc: 定制化选项
 */
import React from "react";
import { Select } from "cloud-react";

const Option = Select.Option;

const dataList = [
  {
    label: "React",
    value: 1,
    img: "https://brand-guide.shuyun.com/IAM/52e939494f3b.png",
  },
  {
    label: "Vue",
    value: 2,
    img: "https://brand-guide.shuyun.com/IAM/52e939494f3b.png",
  },
  {
    label: "Angular",
    value: 3,
    img: "https://brand-guide.shuyun.com/IAM/52e939494f3b.png",
  },
  {
    label: "Jquery",
    value: 4,
    img: "https://brand-guide.shuyun.com/IAM/52e939494f3b.png",
  },
];

export default function SelectDemo() {
  const onOk = (value, prevValue) => {
    console.log("select --- " + value);
    console.log("prevSelect --- " + prevValue);
  };

  return (
    <Select style={{ width: 328 }} defaultValue={1}>
      {dataList.map((item, index) => (
        <Option value={item.value} disabled={item.disabled} key={index}>
          <div
            style={{ display: "flex", alignItem: "center", lineHeight: "24px" }}
          >
            <img
              src={item.img}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            <span>{item.label}</span>
          </div>
        </Option>
      ))}
    </Select>
  );
}
```
