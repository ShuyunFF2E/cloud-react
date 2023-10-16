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

class ToggleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  handleBeforeChange = () => {
    Modal.confirm({
      icon: 'info_1',
      iconStyle: {
        color: '#5280FF',
      },
      title: '确定要切换吗？',
      body: '切换后会产生的相应状态描述。',
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
export default ToggleDemo;
```
