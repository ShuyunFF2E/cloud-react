```jsx
/**
 * title: 纯前端表格带增删操作
 * desc: 此例子用来解决：纯前端表格，对表格进行增删操作时，表格数据源异常的问题（主要思想是在删除之后，通过改变 key 值让表格重新初始化，这种写法也有弊端，就是每次删除之后，表格滚动条无法维持位置，不过可以通过 scrollIntoView 来解决。如果有更好的解决方案欢迎戳我，我来更新文档！！！）
 */
import React, { useState, useEffect, createRef } from "react";
import { CTable, Button } from "cloud-react";

function TableDemo({ data, setData }) {
  const tableRef = createRef();

  const onDelete = (row) => {
    const targetIndex = data.findIndex((item) => item.id === row.id);
    if (targetIndex > -1) {
      data.splice(targetIndex, 1);
    }
    setData([...data]);
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
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
      />
    </div>
  );
}

export default function CTableDemo() {
  const [data, setData] = useState([
    {
      id: "121410327",
      name: "手机号优先继续发送1",
      createTime: "2021/12/14 10:19:02",
      creator: "liyuan.meng",
      num: "12222",
    },
  ]);

  return (
    <div>
      <TableDemo
        key={`${data?.map((item) => item.id).join(",")}`}
        data={data}
        setData={setData}
      />
    </div>
  );
}
```
