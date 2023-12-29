---
order: 1 title: CTable desc: 默认表格
---

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { CTable, Button } from 'cloud-react';

const getData = count => {
  return new Array(count).fill(1).map((item, index) => (
    { id: 121410327 + index, name: `手机号优先继续发送${index}`, createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: 12222 }
  ))
}

const columns = [
  { title: '活动ID', dataIndex: 'id', width: 130 },
  {
    title: '活动名称', dataIndex: 'name', width: 140, render: val => {
      return <CTable.TextTpl value={val} />
    }
  },
  {
    title: '创建时间', dataIndex: 'createTime', width: 140, render: val => {
      return <CTable.TimeTpl value={val} />
    }
  },
  {
    title: '人数',
    dataIndex: 'num',
    align: 'right',
    width: 120,
    render: val => <CTable.NumberTpl value={val} precision={0} />
  },
  { title: '创建人', dataIndex: 'creator', width: 130 }
];

export default function CTableDemo() {
  const tableRef = useRef();
  const [checkedData, setCheckedData] = useState([]);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(getData(10000));
  }, [])

  return (
    <div>
      <Button onClick={() => {
        setData(getData(9000));
      }}>刷新</Button>
      <CTable
        showTotal
        ref={tableRef}
        virtual
        checkedData={checkedData}
        onCheckedAfter={v => {
          setCheckedData(v);
        }}
        supportCheckbox
        supportPage
        scroll={{ x: '100%', y: 400 }}
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
      />
    </div>
  );
}
```
