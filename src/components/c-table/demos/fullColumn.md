---
order: 8
title: CTable
desc: 表格通栏
---

```jsx
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
    {
        key: 1,
        name: '0 - 快速、灵活的对Table标签进行实例化，让Table标签充满活力。该项目已开源,点击进入github',
        id: '',
        details: '',
        children: [
          {
            key: 11,
            name: '原生跨框架的表格组件，三步实现万条不卡',
            id: 653,
            details: '确定在GridManager内实现万条不卡的想法，最早出现于2021',
          },
          {
            key: 13,
            name: '开源项目从js到ts，我所遇到的一些问题',
            id: '123,460',
            details: '记录一下日常开发中遇到的问题，好记性不如烂键盘。',
          },
        ],
    },
  {
    key: 3,
    name: '1 - 快速、灵活的对Table标签进行实例化，让Table标签充满活力。该项目已开源,点击进入github',
    id: '',
    details: '',
    children: [
      {
        key: 31,
        name: '从前端角度分析：西安一码通崩溃事件	',
        id: '123,499',
        details: '没有一个不可逾越的冬天，一切问题都会解决',
      }
    ],
  },
    {
        key: 4,
        name: '2 - 快速、灵活的对Table标签进行实例化，让Table标签充满活力。该项目已开源,点击进入github',
        id: '',
        details: '',
        children: [
            {
                key: 41,
                name: '产品经理天马行空，表格组件应对自如	',
                id: '123,468',
                details: '福兮祸兮，在折腾中磨炼了许多年后，表格组件成为我在圈内',
            }
        ],
    },
];

const parentKeys = data.map(item => item.key); //所有父元素的key组成的数组
const columnNum = 3; // 列数

const columns = [
    {
        title: '标题',
        dataIndex: 'name',
        align: 'left',
        width: 300,
      onCell: (row, index) => {
        if (parentKeys.includes(row.key)) {
          return { colSpan: columnNum }; 
        }
        return {};
      },
      render: (val, row) => {
          return (
            <div style={parentKeys.includes(row.key) ? { textAlign: 'center' } : {}}>
              {row.name}
            </div>
          )
      }
    },
    {
        title: '阅读量',
        dataIndex: 'id',
        align: 'left',
        width: 300,
      onCell: (row, index) => {
        if (parentKeys.includes(row.key)) {
          return { colSpan: 0 };
        }
        return {};
      },
    },
    {
        title: '简介',
        dataIndex: 'details',
        align: 'left',
        width: 200,
      onCell: (row, index) => {
        if (parentKeys.includes(row.key)) {
          return { colSpan: 0 };
        }
        return {};
      },
    },
];

export default function CTableDemo() {
	return (
        <CTable
            supportExpend
            supportTree
            bordered
            supportGroup
            supportFullColumn
            supportPage
            expandable={{
              expandedRowKeys: parentKeys,
            }}
            rowKey="key"
            columnData={columns}
            ajaxData={(params) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({ totals: data.length, data: JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum))) });
                }, 500)
              })
            }}
        />
	);
}
```
