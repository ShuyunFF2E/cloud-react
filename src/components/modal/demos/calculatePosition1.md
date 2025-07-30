---
order: 9 title: 自定义模版 desc: 设置title、body、footer、okText、cancelText实现自定义模版
---

```jsx
/**
 * title: 自动更新Modal位置（V1 版组件库）
 * desc: 解决异步加载数据，modal 高度变化导致位置不居中的问题
 */
import React from "react";
import { Button, Modal, CTable } from "cloud-react";

const blank = "\u00A0";

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleBody: false,
    };
  }

  // 打开自定义body区域弹出框
  openDefineBodyModal = () => {
    this.setState({
      title: "标题是自定义的",
      visibleBody: true,
    });
  };

  closeModal = () => {
    this.setState({
      visibleBody: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.openDefineBodyModal}>
          打开 Modal
        </Button>
        <Modal
          bodyStyle={{ maxHeight: 500, minHeight: 400 }}
          size="medium"
          visible={this.state.visibleBody}
          title={this.state.title}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          onClose={this.closeModal}
        >
          <Body />
        </Modal>
      </div>
    );
  }
}

class Body extends React.Component {
  data = new Array(30)
    .fill(1)
    .map((item, index) => ({
      id: 121410327 + index,
      name: "手机号优先继续发送1",
      createTime: "2021/12/14 10:19:02",
      creator: "liyuan.meng",
    }));

  columns = [
    { title: "活动ID", dataIndex: "id", width: 130 },
    {
      title: "活动名称",
      dataIndex: "name",
      width: 140,
      render: (val) => {
        return <CTable.TextTpl value={val} />;
      },
    },
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
  ];

  render() {
    const { data, columns } = this;
    return (
      <CTable
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
}

export default ModalDemo;
```
