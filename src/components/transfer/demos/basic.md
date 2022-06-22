---
order: 1
title: Transfer
desc: 默认样式
---

```jsx

/**
 * title: 基础用法
 * desc: 数据穿梭选择
 */
import React from 'react';
import { Transfer } from 'cloud-react';

export default class TransferDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: []
    }
    this._handleChange = this.handleChange.bind(this);
  }

  get data() {
    const data = [];
    for (let i = 1; i <= 6; i++) {
      data.push({
        key: '' + i,
        label: `备选文字${i}`,
        disabled: [4, 5].includes(i)
      });
    }
    return data;
  }

  handleChange(value, a, currentValue) {
    this.setState({ value })
  }

  render() {
    const titles = ['标题1', '标题2'];
    return (
        <Transfer data={this.data}
                  titles={titles}
                  value={this.state.value}
                  onChange={this._handleChange} />
    )
  }
}
```

