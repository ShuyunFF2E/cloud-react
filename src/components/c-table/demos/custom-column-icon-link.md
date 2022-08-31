---
order: 5
title: CTable
desc: 自定义列模板
---

```jsx

/**
 * title: 自定义表格列模板
 * desc: 自定义表格列模板（图标 + 链接）
 */
import React from 'react';
import { CTable } from 'cloud-react';
import headerImg from './header.jpg';

const data = [
  { id: '121410327', name: '手机号优先继续发送1手机号优先继续发送1手机号优先继续...', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12,222' },
  { id: '121410328', name: 'ouid疲劳度3ouid疲劳度3ouid疲劳度3ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', num: '198' },
  { id: '121410329', name: '继续发送手机1继续发送手机1继续发送手机1继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', num: '1,232' },
  { id: '121408294', name: '继续发送手机2继续发送手机2继续发送手机2继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', num: '12,122,112' },
  { id: '121407191', name: '继续发送手机3继续发送手机3继续发送手机3继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', num: '1000,000' },
];

const columns = [
  {
    title: '活动名称',
    dataIndex: 'name',
    width: 270,
    render: (value) => (
      <div style={{ display: 'flex', cursor: 'pointer' }}>
        <img style={{ width: 40, height: 40, marginRight: 8 }} src={headerImg} />
        <a style={{ color: '#5280FF' }}>{value}</a>
      </div>
    )
  },
  { title: '活动ID', dataIndex: 'id' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '人数', dataIndex: 'num', align: 'right' },
  { title: '创建人', dataIndex: 'creator' }
];

export default function CTableDemo() {
  return (
    <CTable
      columnData={columns}
      ajaxData={{ totals: data.length, data }}
    />
  );
}
```
