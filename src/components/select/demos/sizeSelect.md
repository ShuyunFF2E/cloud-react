---
order: 3
title: 三种大小
desc: 三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 36px 和 28px ，默认高度为 32px。
---

```jsx
/**
 * title: 三种大小
 * desc: 三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 36px 和 28px ，默认高度为 32px。
 */
import React, { useState } from "react";
import { Select, Button, Radio } from "cloud-react";

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
  const blank = "\u00A0";
  const [size, setSize] = useState("default");

  return (
    <div className="demo">
      <div style={{ marginBottom: 15 }}>
        <Radio.Group value={size} onChange={setSize} horizontal>
          <Radio value="large">large</Radio>
          <Radio value="default">default</Radio>
          <Radio value="small">small</Radio>
        </Radio.Group>
      </div>
      <Select defaultValue={"3"} size={size} style={{ width: 328 }}>
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select allowClear size={size} style={{ width: 328 }} multiple>
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select
        style={{ width: 65, minWidth: 65 }}
        allowClear
        size={size}
        placeholder=""
        defaultValue="1"
        dataSource={[
          { label: "且", value: "1" },
          { label: "或", value: "2" },
        ]}
      />
    </div>
  );
}
```
