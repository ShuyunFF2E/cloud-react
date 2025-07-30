---
order: 3
title: 提示框样式
desc: 通过API自定义提示框样式
---

```jsx
/**
 * title: 提示框样式
 * desc: 通过API自定义提示框样式
 */
import React from "react";
import { Button, Modal } from "cloud-react";

const blank = "\u00A0";

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  openWarningModal = () => {
    Modal.warning({
      title: "自定义弹窗样式",
      style: {
        background: "rgb(232, 76, 76)",
      },
      body: "我是背景色是红色的提示",
      onCancel: () => {},
    });
  };

  render() {
    return (
      <div>
        <Button type="normal" onClick={this.openWarningModal}>
          自定义提示框背景色
        </Button>
      </div>
    );
  }
}

export default ModalDemo;
```
