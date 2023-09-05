---
order: 1
title: CTable
desc: 默认表格
---

```jsx
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
  { id: '121410321', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12,222' },
  { id: '1214103211', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', num: '198' },
  { id: '1214103291', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', num: '1,232' },
  { id: '1214082941', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', num: '12,122,112' },
  { id: '1214071901', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', num: '1000,000' },
];

const columns = [
  {
    title: '活动ID1',
    dataIndex: 'id',
    width: 220,
    // sortable: true,
    align: 'right',
    // filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
    titleTooltipAlign: 'right',
    titleTooltipConfig: { content: '12' },
  },
  {
    title: '活动ID1',
    dataIndex: 'id',
    width: 220,
    sortable: true,
    align: 'right',
    // filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
    // titleTooltipAlign: 'right',
    // titleTooltipConfig: { content: '12' },
  },
  {
    title: '活动ID1',
    dataIndex: 'id',
    width: 220,
    // sortable: true,
    align: 'right',
    filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
    // titleTooltipAlign: 'right',
    // titleTooltipConfig: { content: '12' },
  },
  {
    title: '活动ID1',
    dataIndex: 'id',
    width: 220,
    sortable: true,
    align: 'right',
    filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
    // titleTooltipAlign: 'right',
    // titleTooltipConfig: { content: '12' },
  },
  {
    title: '活动ID1',
    dataIndex: 'id',
    width: 220,
    sortable: true,
    align: 'right',
    // filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
    titleTooltipAlign: 'right',
    titleTooltipConfig: { content: '12' },
  },
  {
    title: '活动ID1',
    dataIndex: 'id',
    width: 220,
    // sortable: true,
    align: 'right',
    filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
    titleTooltipAlign: 'right',
    titleTooltipConfig: { content: '12' },
  },
  {
    title: '活动ID1',
    dataIndex: 'id',
    width: 220,
    sortable: true,
    align: 'right',
    filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
    titleTooltipAlign: 'right',
    titleTooltipConfig: { content: '12' },
  },
  { 
    title: '活动名称',
    dataIndex: 'name',
    width: 160,
    sortable: true,
    align: 'left',
    filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
    titleTooltipAlign: 'right',
    titleTooltipConfig: { content: '12' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    titleTooltipAlign: 'left',
    titleTooltipConfig: { content: '12' }
  },
  {
    title: '人数',
    dataIndex: 'num',
    align: 'right',
    width: 160,
    sortable: true,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    width: 160,
    filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    align: 'right',
    titleTooltipAlign: 'left',
    titleTooltipConfig: { content: '12' }
  },
  {
    title: '人数',
    dataIndex: 'num',
    width: 160,
    align: 'right',
    sortable: true,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    width: 160,
    align: 'right',
    filters: [{ text: '男', value: 'male' }, { text: '女', value: 'female' }],
  }
];

export default function CTableDemo() {
	return (
        <CTable
           style={{ height: 400 }}
           columnData={columns}
           ajaxData={{ totals: data.length, data }}
        />
	);
}
```
