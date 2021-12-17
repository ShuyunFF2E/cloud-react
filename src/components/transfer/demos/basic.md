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
        label: `备选项 ${i}`,
        disabled: i % 4 === 0
      });
    }
    return data;
  }

  handleChange(value, a, b) {
    this.setState({ value })
  }

  render() {
    const titles = ['列表1', '列表2'];
    return (
      <div>
        <Transfer name="11"
                  data={this.data}
                  filterable={false}
                  titles={titles}
                  leftDefaultChecked={[1,3]}
                  rightDefaultChecked={[5]}
                  value={this.state.value}
                  onChange={this._handleChange} />
      </div>
    )
  }
}
```

