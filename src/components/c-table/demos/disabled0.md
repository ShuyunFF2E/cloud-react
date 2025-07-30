---
order: 9 title: CTable desc: 表格禁用行（设置 disabled: true 的形式）
---

```jsx
/**
 * title: 表格禁用行
 * desc: 表格禁用行（设置 disabled: true 的形式）
 */
import React from "react";
import { CTable, Modal, Button } from "cloud-react";

const data = [
  {
    id: "121410327",
    name: "手机号优先继续发送1",
    createTime: "2021/12/14 10:19:02",
    creator: "liyuan.meng",
    disabled: true,
  },
  {
    id: "121410328",
    name: "ouid疲劳度3",
    createTime: "2021/12/13 15:47:33	",
    creator: "jiaojiao.diao",
  },
  {
    id: "121410329",
    name: "继续发送手机1",
    createTime: "2021/12/13 15:36:42",
    creator: "nan.run",
  },
  {
    id: "121408294",
    name: "继续发送手机2",
    createTime: "2021/12/13 11:14:40",
    creator: "xiaotong.fan",
  },
  {
    id: "121407191",
    name: "继续发送手机3",
    createTime: "2021/12/13 11:03:05",
    creator: "zhenxiao.guo",
  },
  {
    id: "121407192",
    name: "继续发送手机4",
    createTime: "2021/12/13 11:03:07",
    creator: "han.wu",
  },
  {
    id: "121407193",
    name: "继续发送手机5",
    createTime: "2021/12/13 11:03:34",
    creator: "yue.ren",
  },
  {
    id: "121407194",
    name: "继续发送手机6",
    createTime: "2021/12/13 11:03:05",
    creator: "wanjuan.dong",
    disabled: true,
  },
  {
    id: "121407195",
    name: "继续发送手机7",
    createTime: "2021/12/13 11:03:55",
    creator: "ying.yan",
  },
  {
    id: "121407196",
    name: "继续发送手机8",
    createTime: "2021/12/13 11:03:23",
    creator: "xian.yong",
  },
];

const columns = [
  { title: "活动ID", dataIndex: "id", align: "left" },
  { title: "活动名称", dataIndex: "name", align: "left" },
  {
    title: "创建时间",
    dataIndex: "createTime",
    render: (val) => {
      return <CTable.TimeTpl value={val} />;
    },
  },
  { title: "创建人", dataIndex: "creator", align: "left" },
];

function CTableDemo(props) {
  return (
    <CTable
      style={{ width: "100%", height: 400 }}
      supportCheckbox
      supportPage
      rowKey="id"
      tooltipConfigs={[
        {
          tooltipMsg: "当前条目不可选当前条目不可选", // tooltip 展示的内容
          tooltipRowCls: "cloud-table-row-disabled", // 需要展示 tooltip 行的类名，
        },
      ]}
      checkedData={[data[1]]}
      pageOpts={{ pageSize: 6 }}
      columnData={columns}
      ajaxData={(params) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              totals: data.length,
              data: JSON.parse(
                JSON.stringify(
                  data.slice(
                    params.pageSize * (params.pageNum - 1),
                    params.pageSize * params.pageNum
                  )
                )
              ),
            });
          }, 500);
        });
      }}
    />
  );
}

function CTableModal(props) {
  return (
    <Modal
      visible
      title="表格"
      modalStyle={{ width: 800 }}
      onClose={props.onClose}
      onCancel={props.onClose}
    >
      <CTableDemo />
    </Modal>
  );
}

export default function Demo() {
  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          Modal.createModal(CTableModal)
            .open()
            .then((res) => {
              console.log(res);
            });
        }}
      >
        打开弹窗
      </Button>
      <CTableDemo />
    </div>
  );
}
```
