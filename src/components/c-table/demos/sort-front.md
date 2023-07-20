---
order: 21
title: CTable
desc: 表格排序
---

```jsx

/**
 * title: 表格排序
 * desc: 表格排序（纯前端表格排序），sortWidthOriginStatus 参数可选，此处配置为 true，支持排序恢复默认状态
 */
import React, { useState } from 'react';
import { CTable, Checkbox } from 'cloud-react';

const data = [
  { id: '121410322', name: 'ouid疲劳度2', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', num: '198', orderNum: '122' },
  { id: '121410323', name: '继续发送手机3', createTime: '2021/12/13 15:36:42', creator: 'nan.run', num: '1,232', orderNum: '1,332' },
  { id: '121410321', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12,222', orderNum: '33,342' },
  { id: '121410324', name: '继续发送手机4', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', num: '12,122,112', orderNum: '112,122,112' },
  { id: '121410325', name: '继续发送手机5', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', num: '1000,000', orderNum: '200,000' },
];

const columns = [
    {
      title: '活动ID',
      dataIndex: 'id',
      sortable: true,
      sorter: (a, b, sortParams) => {
        if (sortParams.sortBy === 'ASC') {
          return Number(a.id) - Number(b.id);
        }
        if (sortParams.sortBy === 'DESC') {
          return Number(b.id) - Number(a.id)
        }
        return 0
      }
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      sortable: true,
      sorter: (a, b, sortParams) => {
        if (sortParams.sortBy === 'ASC') {
          return a.name.localeCompare(b.name);
        }
        if (sortParams.sortBy === 'DESC') {
          return b.name.localeCompare(a.name);
        }
        return 0
      }
    },
    { title: '创建时间', dataIndex: 'createTime' },
    { title: '人数', dataIndex: 'num', align: 'right' },
    { title: '创建人', dataIndex: 'creator' }
];

export default function CTableDemo() {
  const [sortMultiColumns, setSortMultiColumns] = useState(false);
  const [sortWidthOriginStatus, setSortWidthOriginStatus] = useState(false);
  const page = (data, { pageNum, pageSize }) => {
    return JSON.parse(JSON.stringify(data.slice(pageSize * (pageNum - 1), pageSize * pageNum)))
  }

  return (
    <div>
      <Checkbox style={{ marginBottom: 20 }} checked={sortMultiColumns} onChange={checked => {
        setSortMultiColumns(checked);
      }}>支持多个列同时排序</Checkbox>
      <Checkbox style={{ marginBottom: 20, marginLeft: 15 }} checked={sortWidthOriginStatus} onChange={checked => {
        setSortWidthOriginStatus(checked);
      }}>支持排序恢复默认状态</Checkbox>
      <CTable
        key={`${sortMultiColumns}${sortWidthOriginStatus}`}
        supportPage
        sortMultiColumns={sortMultiColumns}
        sortWidthOriginStatus={sortWidthOriginStatus}
        columnData={columns}
        ajaxData={(params) => {
          console.log('所有列排序配置:');
          console.table(params.sortParams?.allSortColumns.map(item => {
            return {
              dataIndex: item.dataIndex,
              sortBy: item.sortBy
            }
          }));
          return { totals: data.length, data: page(data, params) }
        }}
      />
    </div>
  );
}
```
