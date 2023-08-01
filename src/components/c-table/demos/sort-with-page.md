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
import { CTable, Tooltip, Icon } from 'cloud-react';

const data = [
  { id: '121410321', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12,222', orderNum: '33,342' },
  { id: '121410322', name: 'ouid疲劳度2', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', num: '198', orderNum: '122' },
  { id: '121410323', name: '继续发送手机3', createTime: '2021/12/13 15:36:42', creator: 'nan.run', num: '1,232', orderNum: '1,332' },
  { id: '121410324', name: '继续发送手机4', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', num: '12,122,112', orderNum: '112,122,112' },
  { id: '121410325', name: '继续发送手机5', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', num: '1000,000', orderNum: '200,000' },
];

const columns = [
  {
    title: '活动ID',
    dataIndex: 'id',
    sortable: true,
    fixed: 'left',
    width: 120,
    titleTooltipConfig: {
      content: <span>提示信息</span>
    }
  },
  {
    title: '活动名称',
    dataIndex: 'name',
    sortable: true,
    width: 300
  },
  { title: '创建时间', dataIndex: 'createTime', sortable: true, width: 200 },
  {
    title: '人数',
    dataIndex: 'num',
    align: 'right',
    sortable: true,
    width: 200,
    titleTooltipConfig: {
      content: '提示信息'
    },
  },
  {
    title: '订单数',
    dataIndex: 'orderNum',
    align: 'right',
    sortable: true,
    width: 200,
    titleTooltipConfig: {
      content: '订单数提示信息'
    },
    titleTooltipAlign: 'left',
  },
  { title: '创建人', dataIndex: 'creator', width: 120, sortable: true, fixed: 'right' }
];

export default function CTableDemo() {
  const sort = (data, { sortParams }) => {
    if (sortParams?.dataIndex === 'id') {
      return data.sort((a, b) => sortParams.sortBy === 'ASC' ? Number(a.id) - Number(b.id) : Number(b.id) - Number(a.id));
    }
    if (['name', 'createTime', 'num', 'orderNum', 'creator'].includes(sortParams?.dataIndex)) {
      return data.sort((a, b) => sortParams.sortBy === 'ASC' ? a[sortParams.dataIndex].localeCompare(b[sortParams.dataIndex]) : b[sortParams.dataIndex].localeCompare(a[sortParams.dataIndex]));
    }
    return data;
  };

  const page = (data, { pageNum, pageSize }) => {
    return JSON.parse(JSON.stringify(data.slice(pageSize * (pageNum - 1), pageSize * pageNum)))
  }

  return (
    <CTable 
      supportPage
      columnData={columns}
      ajaxData={(params) => {
        console.log('给后端传递参数：', '字段:', params.sortParams?.dataIndex, params.sortParams?.sortBy === 'ASC' ? '；升序:' : '；降序:', params.sortParams?.sortBy);
        return new Promise(resolve => {
          const sortedData = sort(data, params);
          setTimeout(() => {
            resolve({ totals: sortedData.length, data: page(sortedData, params) });
          }, 500)
        })
      }}
    />
  );
}
```
