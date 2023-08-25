---
order: 1
title: CTable
desc: 默认表格
---

```jsx
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
  { number: '1234455', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12,222' },
  { number: 122, name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', num: '198' },
  { number: 12243, name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', num: '1,232' },
  { number: 2345, name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', num: '12,122,112' },
  { number: 1231322, name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', num: '1000,000' },
];

const columns = [
  {
    title: '年月日时分秒',
    dataIndex: 'createTime',
    width: 190,
    type: 'TIME',
  },
  {
    title: '年月日',
    dataIndex: 'createTime',
    width: 130,
    type: 'TIME',
    typeConfig: {
      format: 'YYYY-MM-DD',
    }
  },
  {
    title: '年月',
    dataIndex: 'createTime',
    width: 90,
    type: 'TIME',
    typeConfig: {
      format: 'YYYY-MM',
    }
  },
  {
    title: '月日',
    dataIndex: 'createTime',
    width: 90,
    type: 'TIME',
    typeConfig: {
      format: 'MM-DD',
    }
  },
  {
    title: '时分秒',
    dataIndex: 'createTime',
    width: 100,
    type: 'TIME',
    typeConfig: {
      format: 'HH:MM:SS',
    }
  },
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
