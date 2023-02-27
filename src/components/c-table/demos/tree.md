---
order: 8
title: CTable
desc: 树状表格（两级）
---

```jsx
import React, { useState } from 'react';
import { CTable, Button } from 'cloud-react';

const data = [
  {
    key: 1,
    name: '一级条目1',
    id: 123456,
    details: '一级条目1详情',
    children: [
      {
        key: 11,
        name: '二级条目11',
        id: 123457,
        details: '二级条目11详情',
      },
      {
        key: 12,
        name: '二级条目12',
        id: 123458,
        details: '二级条目12详情',
      },
      {
        key: 13,
        name: '二级条目13',
        id: 123460,
        details: '二级条目13详情',
      },
    ],
  },
  {
    key: 2,
    name: '一级条目2',
    id: 123464,
    details: '一级条目2详情',
  },
  {
    key: 3,
    name: '一级条目3',
    id: 123465,
    details: '一级条目3详情',
    children: [
      {
        key: 31,
        name: '二级条目31',
        id: 123466,
        details: '二级条目31详情',
      }
    ],
  },
  {
    key: 4,
    name: '一级条目4',
    id: 123467,
    details: '一级条目4详情',
    children: [
      {
        key: 41,
        name: '二级条目42',
        id: 123468,
        details: '二级条目42详情',
      }
    ],
  },
  {
    key: 5,
    name: '一级条目5',
    id: 5123456,
    details: '一级条目5详情',
    children: [
      {
        key: 51,
        name: '二级条目51',
        id: 5123457,
        details: '二级条目51详情',
      },
      {
        key: 52,
        name: '二级条目52',
        id: 5123458,
        details: '二级条目52详情',
      },
      {
        key: 53,
        name: '二级条目53',
        id: 5123460,
        details: '二级条目53详情',
      },
    ],
  },
  {
    key: 6,
    name: '一级条目6',
    id: 6123464,
    details: '一级条目6详情',
  },
  {
    key: 7,
    name: '一级条目7',
    id: 7123465,
    details: '一级条目7详情',
    children: [
      {
        key: 71,
        name: '二级条目71',
        id: 123466,
        details: '二级条目71详情',
      }
    ],
  },
  {
    key: 8,
    name: '一级条目8',
    id: 8123467,
    details: '一级条目8详情',
    children: [
      {
        key: 81,
        name: '二级条目82',
        id: 8123468,
        details: '二级条目82详情',
      }
    ],
  },
  {
    key: 9,
    name: '一级条目9',
    id: 9123456,
    details: '一级条目9详情',
    children: [
      {
        key: 91,
        name: '二级条目91',
        id: 9123457,
        details: '二级条目91详情',
      },
      {
        key: 92,
        name: '二级条目92',
        id: 9123458,
        details: '二级条目92详情',
      },
      {
        key: 93,
        name: '二级条目93',
        id: 9123460,
        details: '二级条目93详情',
      },
    ],
  },
  {
    key: 10,
    name: '一级条目10',
    id: 10123464,
    details: '一级条目10详情',
  },
  {
    key: 11,
    name: '一级条目11',
    id: 11123465,
    details: '一级条目11详情',
    children: [
      {
        key: 111,
        name: '二级条目111',
        id: 11123466,
        details: '二级条目111详情',
      }
    ],
  },
  {
    key: 12,
    name: '一级条目12',
    id: 12123467,
    details: '一级条目12详情',
    children: [
      {
        key: 121,
        name: '二级条目122',
        id: 12123468,
        details: '二级条目122详情',
      }
    ],
  },
];
const columns = [
  {
    title: '类目名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '类目ID',
    dataIndex: 'id',
    align: 'left',
  },
  {
    title: '详情',
    dataIndex: 'details',
    align: 'left',
  },
];

export default function CTableDemo() {
    const [isExpandAll, setIsExpandAll] = useState(true);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [currentData, setCurrentData] = useState([]);

  /**
   * 展开行
   * @param expanded
   * @param record
   */
  const onExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.key]);
      return;
    }
    expandedRowKeys.splice(expandedRowKeys.findIndex(key => key === record.key), 1);
    setExpandedRowKeys(expandedRowKeys);
  }

  /**
   * 展开全部
   */
  const onExpandAll = () => {
    setIsExpandAll(!isExpandAll);
    if (isExpandAll) {
      setExpandedRowKeys(Array.from(new Set([...currentData.map(item => item.key), ...expandedRowKeys])));
      return;
    }
    setExpandedRowKeys(expandedRowKeys.filter(key => !currentData.find(item => item.key === key)));
  }

  /**
   * 表格加载完成后执行
   * @param res
   */
  const onLoadGridAfter = res => {
    setCurrentData(res.data);
  }

  return (
      <div>
        <Button style={{ marginBottom: 20 }} onClick={onExpandAll}>{isExpandAll ? '展开全部' : '收起全部'}</Button>
        <CTable
          style={{ width: '100%', height: 400 }}
          supportExpend
          supportTree
          supportCheckbox
          supportPage
          isExpendAloneColumn
          rowKey="key"
          /**
             * 更多 expandable 功能查看 API：https://table-react-component.vercel.app/#api
            */
          expandable={{
            expandedRowKeys: expandedRowKeys,
            onExpand
          }}
          checkedData={[data[0].children[0], data[1]]}
          columnData={columns}
          onCheckedAfter={checkedList => {
            console.log('已选列表:', checkedList);
          }}
          onCheckedAllAfter={checkedList => {
            console.log('已选列表:', checkedList);
          }}
          onLoadGridAfter={onLoadGridAfter}
          ajaxData={(params) => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({ totals: data.length, data: JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum))) });
              }, 500)
            })
          }}
        />
      </div>
	);
}
```
