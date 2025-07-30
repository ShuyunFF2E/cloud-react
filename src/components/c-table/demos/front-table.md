```jsx
/**
 * title: 纯前端表格增删操作
 * desc: 此例子用来解决：纯前端表格，对表格进行增删操作时，表格数据源异常的问题（利用对象的引用特性解决。如果有更好的解决方案欢迎戳我，我来更新文档！！！）
 */
import React, { useState, useEffect } from "react";
import { CTable, Button } from "cloud-react";

export default function CTableDemo() {
  const [data, setData] = useState([
    {
      id: "121410327",
      name: "手机号优先继续发送1",
      createTime: "2021/12/14 10:19:02",
      creator: "liyuan.meng",
      num: 12222,
    },
    {
      id: "121410328",
      name: "ouid疲劳度3",
      createTime: "2021/12/13 15:47:33	",
      creator: "jiaojiao.diao",
      num: "198",
    },
    {
      id: "121410329",
      name: "继续发送手机1",
      createTime: "2021/12/13 15:36:42",
      creator: "nan.run",
      num: "1232",
    },
    {
      id: "121408294",
      name: "继续发送手机2",
      createTime: "2021/12/13 11:14:40",
      creator: "xiaotong.fan",
      num: 12122112,
    },
    {
      id: "121407191",
      name: "继续发送手机3",
      createTime: "2021/12/13 11:03:05",
      creator: "zhenxiao.guo",
      num: "1000000",
    },
  ]);

  // （1）定义一个 buffer 对象，将 data 赋值给 buffer.bufferData，并监听 data 变化更新 buffer
  const [buffer] = useState({ bufferData: data });
  useEffect(() => {
    buffer.bufferData = data;
  }, [data]);

  // （2）删除操作使用 buffer.bufferData 处理
  const onDelete = (row) => {
    const targetIndex = buffer.bufferData.findIndex(
      (item) => item.id === row.id
    );
    if (targetIndex > -1) {
      buffer.bufferData.splice(targetIndex, 1);
    }
    setData([...buffer.bufferData]);
  };

  // （3）新增操作使用 buffer.bufferData 处理
  const onAdd = () => {
    setData([
      ...buffer.bufferData,
      {
        id: new Date().getTime(),
        name: "手机号优先继续发送1",
        createTime: "2021/12/14 10:19:02",
        creator: "liyuan.meng",
        num: "12,222",
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
      fixed: "right",
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
        maxHeight={260}
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
      />
    </div>
  );
}
```
