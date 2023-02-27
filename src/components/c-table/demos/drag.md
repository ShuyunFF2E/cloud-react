---
order: 1
title: CTable
desc: 拖拽
---

```jsx
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
  { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12,222' },
  { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', num: '198' },
  { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', num: '1,232' },
  { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', num: '12,122,112' },
  { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', num: '1000,000' },
];

const columns = [
  { title: '活动ID', dataIndex: 'id' },
  { title: '活动名称', dataIndex: 'name' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '人数', dataIndex: 'num', align: 'right' },
  { title: '创建人', dataIndex: 'creator' }
];

export default function CTableDemo() {
	return (
        <CTable
           supportCheckbox
           supportDrag
           checkedData={[data[1], data[2]]}
           columnData={columns}
           ajaxData={{ totals: data.length, data }}
           onDragAfter={(from, to) => {
             console.log(from, to);
           }}
        />
	);
}
```
