---
order: 9
title: 带确认取消的多选
desc: 带确认取消的多选
---

```jsx
/**
 * title: 带确认取消的多选
 * desc: 带确认取消的多选
 */
import React from "react";
import { Select } from "cloud-react";

const Option = Select.Option;

const dataList = [
  {
    label: "苹果",
    value: 1,
  },
  {
    label: "草莓",
    value: 2,
  },
  {
    label: "荔枝",
    value: 3,
  },
  {
    label: "核桃",
    value: 4,
  },
];

export default function SelectDemo() {
  const onOk = (value, prevValue) => {
    console.log("select --- " + value);
    console.log("prevSelect --- " + prevValue);
  };

  const onCancel = () => {
    console.log("cancel");
  };

  const handleOpen = () => console.log("open");
  const handleClose = () => console.log("close");

  const values = [1, 2, 3, 4];
  const values2 = [2, 3];

  return (
    <div style={{ height: 170 }}>
      <Select
        placeholder="请选择..."
        defaultValue={values2}
        onSelectOpen={handleOpen}
        onSelectClose={handleClose}
        multiple
        hasSelectAll
        hasConfirmButton
        okBtnText="确认1"
        cancelBtnText="取消2"
        onOk={onOk}
        onCancel={onCancel}
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
