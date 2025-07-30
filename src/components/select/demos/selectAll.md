---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
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
  const [multiDataList, setDataList] = useState(dataList);

  return (
    <div className="demo">
      <Select
        placeholder="多选支持全选"
        hasSelectAll
        style={{ width: 328 }}
        multiple
        dataSource={multiDataList}
      />
      <Select
        placeholder="多选自定义全选文案"
        hasSelectAll
        selectAllText="全选全部"
        style={{ width: 328 }}
        multiple
        dataSource={multiDataList}
      />
    </div>
  );
}
```
