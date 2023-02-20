---
order: 7
title: CTable
desc: 多选
---

```jsx
import React, { useState } from 'react';
import { CTable, Checkbox } from 'cloud-react';

const data = [
    { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng' },
    { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao' },
    { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run' },
    { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan' },
    { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo' },
];

const columns = [
    { title: '活动ID', dataIndex: 'id', align: 'left' },
    { title: '活动名称', dataIndex: 'name', align: 'left' },
    { title: '创建时间', dataIndex: 'createTime', align: 'left' },
    { title: '创建人', dataIndex: 'creator', align: 'left' }
];

export default function RcTableDemo() {
  const [lightCheckedRow, setLightCheckedRow] = useState(false);
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Checkbox checked={lightCheckedRow} onChange={checked => {
          setLightCheckedRow(checked);
        }}>选中行高亮</Checkbox>
      </div>
      <CTable
        supportCheckbox
        lightCheckedRow={lightCheckedRow}
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
        rowKey="id"
        checkedData={[{ id: '121410327' }, { id: '121410329' }]} // 这种写法需要指定 rowKey
        // checkedData={[data[0], data[1]]} // 这种写法需要传递完整行数据，可以不指定 rowKey
        onCheckedAfter={checkedList => {
          console.log('已选列表:', checkedList);
        }}
        onCheckedAllAfter={checkedList => {
          console.log('已选列表:', checkedList);
        }}
      />
    </div>
  );
}
```