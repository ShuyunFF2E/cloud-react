---
order: 7
title: 自定义回调函数
desc: 设置onOk、onCancel、onClose实现自定义回调函数
---

```jsx
/**
 * title: 自定义回调函数
 * desc: 设置onOk、onCancel、onClose实现自定义回调函数
 */
import React from "react";
import { Button, Modal } from "cloud-react";

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      content: "",
    };
  }

  // 自定义回调函数
  openDefineCallbackModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      content: "it is ok callback",
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      content: "it is cancel callback",
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
      content: "it is close callback",
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.openDefineCallbackModal}>
          自定义回调函数
        </Button>
        <br />
        <Modal
          size="medium"
          title="自定义回调函数"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          onClose={this.handleClose}
        >
          这是一个演示Modal自定义回调函数的example。
        </Modal>
        <br />
        <span>{this.state.content}</span>
      </div>
    );
  }
}

export default ModalDemo;
```
