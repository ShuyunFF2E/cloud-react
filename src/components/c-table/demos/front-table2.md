```jsx
/**
 * title: 纯前端表格带增删操作
 * desc: 此例子用来解决：纯前端表格，对表格进行增删操作时，render 内部拿不到完整表格数据源的问题
 */
import React, { useState, useEffect, createRef } from "react";
import { CTable, Button } from "cloud-react";

function TableDemo() {
  const tableRef = createRef();
  const [data, setData] = useState([
    {
      id: "121410327",
      name: "手机号优先继续发送1",
      createTime: "2021/12/14 10:19:02",
      creator: "liyuan.meng",
      num: "12222",
    },
  ]);
  const [currentDeleteRow, setCurrentDeleteRow] = useState(null);

  useEffect(() => {
    if (currentDeleteRow) {
      const targetIndex = data.findIndex(
        (item) => item.id === currentDeleteRow.id
      );
      if (targetIndex > -1) {
        data.splice(targetIndex, 1);
      }
      setData([...data]);
    }
  }, [currentDeleteRow]);

  const onDelete = (row) => {
    setCurrentDeleteRow(row);
  };

  const onAdd = () => {
    setData([
      ...data,
      {
        id: new Date().getTime(),
        name: "手机号优先继续发送1",
        createTime: "2021/12/14 10:19:02",
        creator: "liyuan.meng",
        num: 12222,
      },
    ]);
  };

  const columns = [
    { title: "活动ID", dataIndex: "id", width: 130 },
    { title: "活动名称", dataIndex: "name", width: 140 },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: 140,
      render: (val) => {
        return <CTable.TimeTpl value={val} />;
      },
    },
    {
      title: "人数",
      dataIndex: "num",
      align: "right",
      width: 120,
      render: (val) => <CTable.NumberTpl value={val} precision={0} />,
    },
    { title: "创建人", dataIndex: "creator", width: 130 },
    {
      title: "操作",
      dataIndex: "creator",
      width: 100,
      render: (_, row) => {
        return (
          <Button type="text" onClick={() => onDelete(row)}>
            删除
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Button style={{ marginBottom: 20 }} onClick={onAdd}>
        新增数据
      </Button>
      <CTable
        ref={tableRef}
        maxHeight={260}
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
      />
    </div>
  );
}

export default TableDemo;
```
