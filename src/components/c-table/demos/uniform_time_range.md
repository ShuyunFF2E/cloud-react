---
order: 1
title: CTable
desc: 默认表格
---

```jsx
/**
 * title: 时间范围类型
 * desc: 时间范围类型
 */
import React from "react";
import { CTable } from "cloud-react";

const data = [
  { startTime: "2021/12/14 10:19:02", endTime: "2023/08/14 10:19:02" },
  { startTime: "2021/12/13 15:47:33", endTime: "2023/08/14 10:19:02" },
  { startTime: "", endTime: "2023/08/14 10:19:02" },
  { startTime: "2021-12-13 11:14:40", endTime: "" },
  { startTime: "", endTime: "" },
];

const columns = [
  {
    title: "年月日时分秒",
    dataIndex: "startTime",
    width: 160,
    type: "TIME_RANGE",
    typeConfig: {
      startKey: "startTime",
      endKey: "endTime",
    },
  },
  {
    title: "年月日",
    dataIndex: "startTime",
    width: 130,
    type: "TIME_RANGE",
    typeConfig: {
      format: "YYYY-MM-DD",
      startKey: "startTime",
      endKey: "endTime",
    },
  },
  {
    title: "年月",
    dataIndex: "startTime",
    width: 90,
    type: "TIME_RANGE",
    typeConfig: {
      format: "YYYY-MM",
      startKey: "startTime",
      endKey: "endTime",
    },
  },
  {
    title: "月日",
    dataIndex: "startTime",
    width: 90,
    type: "TIME_RANGE",
    typeConfig: {
      format: "MM-DD",
      startKey: "startTime",
      endKey: "endTime",
    },
  },
  {
    title: "时分秒",
    dataIndex: "startTime",
    width: 100,
    type: "TIME_RANGE",
    typeConfig: {
      format: "HH:MM:SS",
      startKey: "startTime",
      endKey: "endTime",
    },
  },
];

export default function CTableDemo() {
  return (
    <CTable columnData={columns} ajaxData={{ totals: data.length, data }} />
  );
}
```
