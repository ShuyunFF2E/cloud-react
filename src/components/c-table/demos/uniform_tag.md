---
order: 1
title: CTable
desc: 默认表格
---

```jsx
/**
 * title: 标签类型
 * desc: 标签类型
 */
import React from "react";
import { CTable } from "cloud-react";

const data = [
  {
    tag: ["标签1", "标签2", "标签3", "标签4"],
    tagInfo: [
      { label: "标签1", value: 1 },
      { label: "标签2", value: 2 },
      { label: "标签3", value: 3 },
      { label: "标签4", value: 4 },
    ],
  },
  {
    tag: ["标签11", "标签21", "标签31", "标签41"],
    tagInfo: [
      { label: "标签1", value: 1 },
      { label: "标签2", value: 2 },
      { label: "标签3", value: 3 },
      { label: "标签4", value: 4 },
    ],
  },
  {
    tag: ["标签12", "标签22", "标签32", "标签42"],
    tagInfo: [
      { label: "标签1", value: 1 },
      { label: "标签2", value: 2 },
      { label: "标签3", value: 3 },
      { label: "标签4", value: 4 },
    ],
  },
  {
    tag: ["标签13", "标签23", "标签33", "标签43"],
    tagInfo: [
      { label: "标签1", value: 1 },
      { label: "标签2标签2", value: 2 },
      { label: "标签3标签3标签3标签3", value: 3 },
      { label: "标签4标签4标签4标签4标签4标签4标签4标签4", value: 4 },
    ],
  },
  {
    tag: [],
    tagInfo: [],
  },
];

const columns = [
  {
    title: "标签1",
    dataIndex: "tag",
    width: 210,
    type: "TAG",
  },
  {
    title: "标签2",
    dataIndex: "tagInfo",
    width: 180,
    type: "TAG",
    typeConfig: {
      formatValue: (value) => value.map((item) => item.label),
      maxLength: 2,
    },
  },
  {
    title: "标签3",
    dataIndex: "tagInfo",
    width: 180,
    render: (val, row) => {
      return (
        <CTable.TagTpl value={val.map((item) => item.label)} maxLength={2} />
      );
    },
  },
];

export default function CTableDemo() {
  return (
    <CTable columnData={columns} ajaxData={{ totals: data.length, data }} />
  );
}
```
