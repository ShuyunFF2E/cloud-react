---
order: 21
title: CTable
desc: 表格排序
---

```jsx

/**
 * title: 表格排序
 * desc: 表格排序（纯前端表格排序）
 */
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
    { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12,222' },
    { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', num: '198' },
    { id: '121410329', name: '继续发送手机3', createTime: '2021/12/13 15:36:42', creator: 'nan.run', num: '1,232' },
    { id: '121408294', name: '继续发送手机4', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', num: '12,122,112' },
    { id: '121407191', name: '继续发送手机2', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', num: '1000,000' },
];

const columns = [
    { title: '活动ID', dataIndex: 'id', sortable: true },
    { title: '活动名称', dataIndex: 'name' },
    { title: '创建时间', dataIndex: 'createTime' },
    { title: '人数', dataIndex: 'num', align: 'right' },
    { title: '创建人', dataIndex: 'creator' }
];

export default function CTableDemo() {
  const sort = (data, { sortParams }) => {
    if (sortParams?.dataIndex === 'id') {
      return data.sort((a, b) => sortParams.sortBy === 'ASC' ? a.id - b.id : b.id - a.id);
    }
    return data;
  };

  const page = (data, { pageNum, pageSize }) => {
    return JSON.parse(JSON.stringify(data.slice(pageSize * (pageNum - 1), pageSize * pageNum)))
  }

  return (
    <CTable
      supportPage
      columnData={columns}
      ajaxData={(params) => {
        const sortedData = sort(data, params);
        return { totals: data.length, data: page(sortedData, params) }
      }}
    />
  );
}
```
