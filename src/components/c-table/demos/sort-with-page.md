---
order: 20
title: CTable
desc: 表格排序
---

```jsx
/**
 * title: 表格排序
 * desc: 表格排序（从远程获取数据）
 */
import React from "react";
import { CTable, Tooltip, Icon } from "cloud-react";

const data = new Array(50)
  .fill(1)
  .map((item, index) => ({
    id: 121410327 + index,
    name: `手机号优先继续发送${index}`,
    createTime: "2021/12/14 10:19:02",
    creator: "liyuan.meng",
    num: 12222,
    orderNum: "33,342",
  }));

const columns = [
  {
    title: "活动ID",
    dataIndex: "id",
    sortable: true,
    fixed: "left",
    width: 120,
    titleTooltipConfig: {
      content: <span>提示信息</span>,
    },
  },
  {
    title: "活动名称",
    dataIndex: "name",
    sortable: true,
    width: 300,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: 200,
    render: (val) => {
      return <CTable.TimeTpl value={val} />;
    },
  },
  {
    title: "人数",
    dataIndex: "num",
    align: "right",
    sortable: true,
    width: 200,
    titleTooltipConfig: {
      content: "提示信息",
    },
    render: (val) => <CTable.NumberTpl value={val} precision={0} />,
  },
  {
    title: "订单数",
    dataIndex: "orderNum",
    align: "right",
    sortable: true,
    width: 200,
    titleTooltipConfig: {
      content: "订单数提示信息",
    },
    titleTooltipAlign: "left",
  },
  {
    title: "创建人",
    dataIndex: "creator",
    width: 120,
    sortable: true,
    fixed: "right",
  },
];

export default function CTableDemo() {
  const sort = (data, { sortParams }) => {
    if (sortParams?.dataIndex === "id") {
      return data.sort((a, b) =>
        sortParams.sortBy === "ASC"
          ? Number(a.id) - Number(b.id)
          : Number(b.id) - Number(a.id)
      );
    }
    if (
      ["name", "createTime", "num", "orderNum", "creator"].includes(
        sortParams?.dataIndex
      )
    ) {
      return data.sort((a, b) =>
        sortParams.sortBy === "ASC"
          ? a[sortParams.dataIndex].localeCompare(b[sortParams.dataIndex])
          : b[sortParams.dataIndex].localeCompare(a[sortParams.dataIndex])
      );
    }
    return data;
  };

  const page = (data, { pageNum, pageSize }) => {
    return JSON.parse(
      JSON.stringify(data.slice(pageSize * (pageNum - 1), pageSize * pageNum))
    );
  };

  return (
    <CTable
      style={{ height: 400 }}
      supportPage
      columnData={columns}
      ajaxData={(params) => {
        console.log(
          "给后端传递参数：",
          "字段:",
          params.sortParams?.dataIndex,
          params.sortParams?.sortBy === "ASC" ? "；升序:" : "；降序:",
          params.sortParams?.sortBy
        );
        return new Promise((resolve) => {
          const sortedData = sort(data, params);
          setTimeout(() => {
            resolve({
              totals: sortedData.length,
              data: page(sortedData, params),
            });
          }, 500);
        });
      }}
    />
  );
}
```
