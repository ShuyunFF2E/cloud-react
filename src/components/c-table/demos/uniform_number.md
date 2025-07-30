---
order: 1
title: CTable
desc: 默认表格
---

```jsx
/**
 * title: 数值类型
 * desc: 数值类型
 */
import React from "react";
import { CTable } from "cloud-react";

const data = [
  { number: "1234455", rate: "12", creator: "liyuan.meng" },
  { number: 122, rate: "100", creator: "jiaojiao.diao" },
  { number: 12243, rate: 23.1, creator: "sitong.hui" },
  { number: 1231322, rate: "99.99", creator: "wanjuan.dong" },
  { number: 0, rate: 0, creator: "zhenxiao.guo" },
  { number: "", rate: "", creator: "jie.li" },
];

const columns = [
  {
    title: "创建人",
    dataIndex: "creator",
    width: 90,
  },
  {
    title: "客户数",
    dataIndex: "number",
    width: 120,
    type: "NUMBER",
  },
  {
    title: "金额（保留两位小数）",
    dataIndex: "number",
    width: 130,
    type: "NUMBER",
    typeConfig: {
      prefix: "¥ ",
      precision: 2,
    },
  },
  {
    title: "金额（整数）",
    dataIndex: "number",
    width: 130,
    type: "NUMBER",
    typeConfig: {
      prefix: "¥ ",
    },
  },
  {
    title: "百分比",
    dataIndex: "rate",
    width: 100,
    type: "NUMBER",
    typeConfig: {
      suffix: " %",
      precision: 2,
    },
  },
  {
    title: "",
    dataIndex: "empty",
    width: 10,
  },
];

export default function CTableDemo() {
  return (
    <CTable columnData={columns} ajaxData={{ totals: data.length, data }} />
  );
}
```
