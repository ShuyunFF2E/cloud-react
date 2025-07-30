---
order: 1
title: CTable
desc: 默认表格
---

```jsx
/**
 * title: 时间类型
 * desc: 时间类型
 */
import React from "react";
import { CTable } from "cloud-react";

const data = [
  { createTime: "2021/12/14 10:19:02" },
  { createTime: "2021/12/13 15:47:33" },
  { createTime: "2021/12/13 15:36:42" },
  { createTime: "2021-12-13 11:14:40" },
  { createTime: "" },
];

const columns = [
  {
    title: "年月日时分秒",
    dataIndex: "createTime",
    width: 190,
    type: "TIME",
  },
  {
    title: "年月日",
    dataIndex: "createTime",
    width: 130,
    type: "TIME",
    typeConfig: {
      format: "YYYY-MM-DD",
    },
  },
  {
    title: "年月",
    dataIndex: "createTime",
    width: 90,
    type: "TIME",
    typeConfig: {
      format: "YYYY-MM",
    },
  },
  {
    title: "月日",
    dataIndex: "createTime",
    width: 90,
    type: "TIME",
    typeConfig: {
      format: "MM-DD",
    },
  },
  {
    title: "时分秒",
    dataIndex: "createTime",
    width: 100,
    type: "TIME",
    typeConfig: {
      format: "HH:MM:SS",
    },
  },
];

export default function CTableDemo() {
  return (
    <CTable columnData={columns} ajaxData={{ totals: data.length, data }} />
  );
}
```
