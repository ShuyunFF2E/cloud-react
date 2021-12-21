---
order: 1
title: Transfer
desc: 默认样式
---

```jsx

/**
 * title: 基础用法
 * desc: 111
 */
import React from 'react';
import { Transfer } from 'cloud-react';

export default class TransferDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: [1, 5]
    }
    this._handleChange = this.handleChange.bind(this);
  }

  get data() {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `内容${i}`,
        disabled: i === 2
      });
    }
    return data;
  }

  handleChange(value, a, currentValue) {
    console.log(value, a, currentValue, '----');
    this.setState({ value })
  }

  render() {
    const titles = ['标题1', '标题2'];
    return (
        <Transfer data={this.data}
                  titles={titles}
                  leftDefaultChecked={[1,3]}
                  rightDefaultChecked={[5]}
                  value={this.state.value}
                  onChange={this._handleChange} />
    )
  }
}
```

