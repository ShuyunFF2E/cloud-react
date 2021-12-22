---
order: 18
title: CTable
desc: 表格排序
---

```jsx

/**
 * title: 表格排序
 * desc: 表格排序（自定义表格列排序规则）
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
  {
    title: '活动ID',
    dataIndex: 'id',
    sortable: true,
    sorter: (a, b, sortParams) => {
      return sortParams.sortBy === 'ASC' ? Number(a.id) - Number(b.id) : Number(b.id) - Number(a.id)
    }
  },
  {
    title: '活动名称',
    dataIndex: 'name',
    sortable: true,
    sorter: (a, b, sortParams) => {
      return sortParams.sortBy === 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }
  },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '人数', dataIndex: 'num', align: 'right' },
  { title: '创建人', dataIndex: 'creator' }
];

export default function CTableDemo() {
	return (
        <CTable
            columnData={columns}
            ajaxData={(params) => {
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
