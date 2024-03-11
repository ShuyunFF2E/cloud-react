```jsx

/**
 * title: 设置 noScroll，表格不展示纵向滚动条，表格高度由内容撑开
 * desc: 使用场景：期望一屏能看到更多表格内容，但是不希望表格和表格外侧容器都产生滚动条，设置此参数后，表格不产生滚动条。
 */
import React, { useState, useEffect, createRef } from 'react';
import { CTable, Button } from 'cloud-react';

function TableDemo({ data, setData }) {
  const tableRef = createRef();

  const onDelete = row => {
    const targetIndex = data.findIndex(item => item.id === row.id);
    if (targetIndex > -1) {
      data.splice(targetIndex, 1);
    }
    setData([...data]);
  }

  const onAdd = () => {
    setData([...data, { id: new Date().getTime(), name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: 12222 }])
  };

  const columns = [
    { title: '活动ID', dataIndex: 'id', width: 130 },
    { title: '活动名称', dataIndex: 'name', width: 140 },
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
    { title: '创建人', dataIndex: 'creator', width: 130 },
    {
      title: '操作',
      dataIndex: 'creator',
      width: 100,
      render: (_, row) => {
        return (
          <Button type="text" onClick={() => onDelete(row)}>删除</Button>
        )
      }
    }
  ];

  return (
    <div>
      <Button style={{ marginBottom: 20 }} onClick={onAdd}>新增数据</Button>
      <CTable
        ref={tableRef}
        noScroll
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
        onCell={(row, index) => {
          console.log(data);
          row.data = data;
        }}
      />
    </div>
  );
}

export default function CTableDemo() {
  const [data, setData] = useState([]);

  return (
    <div>
      <TableDemo key={`${data?.map(item => item.id).join(',')}`} data={data} setData={setData}/>
    </div>
  );
}
```
