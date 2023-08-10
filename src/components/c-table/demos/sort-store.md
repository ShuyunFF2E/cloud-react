---
order: 20
title: CTable
desc: 表格排序
---

```jsx

/**
 * title: 表格排序
 * desc: 表格排序（指定列默认排序规则：给 columnData 配置 sortBy 参数即可）
 */
import React from 'react';
import { CTable, Tooltip, Icon } from 'cloud-react';

const data = new Array(50).fill(1).map((item, index) => (
  { id: 121410327 + index, name: `手机号优先继续发送${index}`, createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12,222', orderNum: '33,342' }
))

const columns = [
  {
    title: '活动ID',
    dataIndex: 'id',
    sortable: true,
    fixed: 'left',
    width: 120,
    sortBy: 'DESC',
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
    const { dataIndex, sortBy } = sortParams?.allSortColumns?.find(item => item.sortBy) || {};
    if (dataIndex === 'id') {
      return data.sort((a, b) => sortBy === 'ASC' ? Number(a.id) - Number(b.id) : Number(b.id) - Number(a.id));
    }
    if (['name', 'createTime', 'num', 'orderNum', 'creator'].includes(dataIndex)) {
      return data.sort((a, b) => sortBy === 'ASC' ? a[dataIndex].localeCompare(b[dataIndex]) : b[dataIndex].localeCompare(a[dataIndex]));
    }
    return data;
  };

  const page = (data, { pageNum, pageSize }) => {
    return JSON.parse(JSON.stringify(data.slice(pageSize * (pageNum - 1), pageSize * pageNum)))
  }

  return (
    <CTable
      style={{ height: 400 }}
      supportPage
      columnData={columns}
      ajaxData={(params) => {
        console.log('所有列排序配置:');
        console.table(params.sortParams?.allSortColumns?.map(item => {
          return {
            dataIndex: item.dataIndex,
            sortBy: item.sortBy
          }
        }));
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
