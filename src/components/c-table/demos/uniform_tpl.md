---
order: 1
title: CTable
desc: 默认表格
---

```jsx

/**
 * title: 使用列模板
 * desc: 使用列模板组件：CTable.NumberTpl、CTable.TimeTpl、CTable.TimeRangeTpl、CTable.TextTpl、CTable.LinkTpl、CTable.MultiTextTpl、CTable.MultiLinkTpl、CTable.TagTpl
 */
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
  {
    number: '1234455',
    startTime: '2021/12/14 10:19:02',
    endTime: '2021/12/14 10:19:02',
    name: '文本文本超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长',
    tagInfo: [
      { label: '标签1', value: 1 },
      { label: '标签2', value: 2 },
      { label: '标签3', value: 3 },
      { label: '标签4', value: 4 }
    ]
  },
  {
    number: 122,
    startTime: '2021/12/14 10:19:02',
    endTime: '2021/12/14 10:19:02',
    name: '文本文本超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长',
    tagInfo: [
      { label: '标签1', value: 1 },
      { label: '标签2', value: 2 },
      { label: '标签3', value: 3 },
      { label: '标签4', value: 4 }
    ]
  },
  {
    number: 12243,
    startTime: '2021/12/14 10:19:02',
    endTime: '2021/12/14 10:19:02',
    name: '文本文本超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长',
    tagInfo: [
      { label: '标签1', value: 1 },
      { label: '标签2', value: 2 },
      { label: '标签3', value: 3 },
      { label: '标签4', value: 4 }
    ]
  },
  {
    number: 1231322,
    startTime: '2021/12/14 10:19:02',
    endTime: '2021/12/14 10:19:02',
    name: '文本文本2',
    tagInfo: [
      { label: '标签1', value: 1 },
      { label: '标签2', value: 2 },
      { label: '标签3', value: 3 },
      { label: '标签4', value: 4 }
    ]
  },
];

const columns = [
  {
    title: '数值类型',
    dataIndex: 'number',
    width: 120,
    render: val => {
      return <CTable.NumberTpl value={val} precision={1} prefix="¥" />
    }
  },
  {
    title: '时间类型',
    dataIndex: 'startTime',
    width: 120,
    render: val => {
      return <CTable.TimeTpl value={val} format="YYYY-MM-DD" />
    }
  },
  {
    title: '时间范围类型',
    dataIndex: 'startTime',
    width: 160,
    render: (val, row) => {
      return <CTable.TimeRangeTpl value={val} format="YYYY-MM-DD" startValue={row.startTime} endValue={row.endTime} />
    }
  },
  {
    title: '单行文本',
    dataIndex: 'name',
    width: 120,
    render: val => {
      return <CTable.TextTpl value={val} />
    }
  },
  {
    title: '单行链接',
    dataIndex: 'name',
    width: 120,
    render: (val, row) => {
      return <CTable.LinkTpl value={val} link="https://www.taobao.com" />
    }
  },
  {
    title: '多行文本',
    dataIndex: 'name',
    width: 120,
    render: val => {
      return <CTable.MultiTextTpl value={val} />
    }
  },
  {
    title: '多行链接',
    dataIndex: 'name',
    width: 120,
    render: (val, row) => {
      return <CTable.MultiLinkTpl value={val} link="https://www.taobao.com" />
    }
  },
  {
    title: '标签',
    dataIndex: 'tagInfo',
    width: 120,
    render: (val, row) => {
      return <CTable.TagTpl value={val.map(item => item.label)}/>
    }
  },
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
