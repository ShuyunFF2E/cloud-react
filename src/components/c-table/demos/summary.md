---
order: 3 title: CTable desc: 表尾合计
---

```jsx
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
  { id: '121410327', name: '手机号优先继续发送1', send: 1222, fail: '22' },
  { id: '121410328', name: 'ouid疲劳度3', send: 12, fail: 3 },
  { id: '121410329', name: '继续发送手机1', send: 345, fail: 345 },
  { id: '121408294', name: '继续发送手机2', send: '100', fail: 2 },
  { id: '121407191', name: '继续发送手机3', send: 1209, fail: 3 },
  { id: '121407192', name: '继续发送手机4', send: '120', fail: 4 },
];

const columns = [
  { title: '活动ID', dataIndex: 'id', align: 'left' },
  { title: '活动名称', dataIndex: 'name', align: 'left' },
  { title: '发送成功条数', dataIndex: 'send', align: 'right', render: val => <CTable.NumberTpl value={val} precision={0} /> },
  { title: '发送失败条数', dataIndex: 'fail', align: 'right', render: val => <CTable.NumberTpl value={val} precision={0} /> }
];

const summaryData = [
  { index: 0, colSpan: 2, content: '合计' },
  { index: 2, colSpan: 1, content: 3008, align: 'right', render: val => <CTable.NumberTpl value={val} precision={0}/> },
  { index: 3, colSpan: 1, content: 379, align: 'right', render: val => <CTable.NumberTpl value={val} precision={0}/> },
];

export default function CTableDemo() {
  return (
    <CTable
      bordered
      style={{ width: '100%' }}
      columnData={columns}
      ajaxData={{ totals: data.length, data }}
      summaryData={summaryData}
    />
  );
}
```
