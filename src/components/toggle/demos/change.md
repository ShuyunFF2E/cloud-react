---
order: 2
title: 状态改变前事件
desc: onBeforeChange 函数使用
---

```jsx
/**
 * title: 状态改变前事件
 * desc: onBeforeChange 函数使用
 */
import React from 'react';
import { Modal, Toggle } from 'cloud-react';

export default class ToggleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  handleBeforeChange = () => {
    Modal.confirm({
      title: '确定切换吗？',
      onOk: () => {
        this.setState((prevState) => ({ checked: !prevState.checked }));
      },
    });
  };

  render() {
    const { checked } = this.state;
    return <Toggle checked={checked} onBeforeChange={this.handleBeforeChange} />
  }
}
```
