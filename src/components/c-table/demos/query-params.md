---
order: 23
title: CTable
desc: 表格带筛选
---

```jsx

/**
 * title: 表格带筛选
 * desc: 通过给表格传入 queryParams ，控制表格筛选
 */
import React, { useState } from 'react';
import { CTable, Input, Checkbox } from 'cloud-react';

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
  const [queryParams, setQueryParams] = useState({ isMyActivity: false, id: '' })

  const filter = (data, params) => {
    const { isMyActivity, id } = params;
    return data
      .filter(item => isMyActivity && item.creator === 'liyuan.meng' || !isMyActivity)
      .filter(item => id && item.id.includes(id) || !id);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <Checkbox checked={queryParams.isMyActivity} onChange={checked => {
          setQueryParams({ ...queryParams, isMyActivity: checked });
        }}>只看我的活动</Checkbox>
        <Input style={{ marginLeft: 15 }} hasClear placeholder="请输入活动ID" value={queryParams.id} onChange={evt => {
          setQueryParams({ ...queryParams, id: evt.target.value });
        }} />
      </div>
      <CTable
        style={{ width: '100%', height: 260 }}
        queryParams={queryParams}
        columnData={columns}
        ajaxData={params => {
          console.log(params.queryParams);
          const filterData = filter(data, params.queryParams);
          return { totals: filterData.length, data: filterData };
        }}
      />
    </div>
  );
}
```
