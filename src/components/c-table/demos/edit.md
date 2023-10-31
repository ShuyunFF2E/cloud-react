---
order: 1 title: CTable desc: 表格可编辑
---

```jsx
import React, { Component, createRef } from 'react';
import { CTable, Input } from 'cloud-react';
import './style/index.less';

const data = [
  { id: '121410327', name: 'click me1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: '12222' },
  { id: '121410328', name: 'click me2', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', num: '198' },
  { id: '121410329', name: 'click me3', createTime: '2021/12/13 15:36:42', creator: 'nan.run', num: 1232 },
  { id: '121408294', name: 'click me4', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', num: '12122112' },
  { id: '121407191', name: 'click me5', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', num: 1000000 },
];

class RcTableDemo extends Component {
  ref = createRef();

  state = {
    ajaxData: { totals: data.length, data },
    editId: null
  };

  columns = [
    { title: '活动ID', dataIndex: 'id', width: 140 },
    {
      title: '活动名称',
      dataIndex: 'name',
      width: 300,
      render: (value, row) => {
        return (
          <div className={`cloud-react-edit ${row.id === this.state.editId && 'current-edit'}`}
               style={{ height: 28, width: 206, display: 'flex', alignItems: 'center' }}>
            {row.id === this.state.editId ? (
              <Input
                ref={this.ref}
                size="small"
                defaultValue={row.name}
                onBlur={evt => {
                  const target = data.find(item => item.id === row.id);
                  if (target) {
                    Object.assign(target, { name: this.ref.current.inputRef.current.value });
                  }
                  this.setState({ editId: null, ajaxData: { totals: data.length, data: data } })
                }}
              />
            ) : (
              <span onClick={() => {
                this.setState({
                  editId: row.id,
                  ajaxData: { totals: data.length, data: JSON.parse(JSON.stringify(data)) }
                }, () => {
                  setTimeout(() => {
                    this.ref.current.inputRef.current.focus();
                  })
                });
              }}>{value || '--'}</span>
            )}
          </div>
        )
      }
    },
    {
      title: '创建时间', dataIndex: 'createTime', width: 140, render: val => {
        return <CTable.TimeTpl value={val} format="YYYY-MM-DD" />
      }
    },
    {
      title: '人数',
      dataIndex: 'num',
      align: 'right',
      width: 120,
      render: val => <CTable.NumberTpl value={val} precision={0} />
    },
    { title: '创建人', dataIndex: 'creator',  width: 140 }
  ];

  render() {
    return (
      <CTable
        className="cloud-table-demo"
        columnData={this.columns}
        ajaxData={this.state.ajaxData}
      />
    );
  }
}
export default RcTableDemo;
```
