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
  { title: '活动名称', dataIndex: 'name', sortable: true },
  { title: '创建时间', dataIndex: 'createTime', sortable: true },
  { title: '人数', dataIndex: 'num', align: 'right', sortable: true },
  { title: '创建人', dataIndex: 'creator', sortable: true }
];

export default function CTableDemo() {
  return (
    <CTable 
      supportPage
      columnData={columns}
      ajaxData={(params) => {
        console.log('给后端传递参数：', '字段:', params.sortParams?.dataIndex, '；正序or倒序:', params.sortParams?.sortBy);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ totals: data.length, data: JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum))) });
          }, 500)
        })
      }}
    />
  );
}
```
