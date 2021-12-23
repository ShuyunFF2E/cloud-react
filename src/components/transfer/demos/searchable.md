---
order: 2
title: 支持实时搜索
desc: 支持实时搜索，在搜索框输入内容时进行搜索
---

```jsx

/**
 title: 支持实时搜索
 desc: 支持实时搜索，在搜索框输入内容时进行搜索
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
    for (let i = 1; i <= 5; i++) {
      data.push({
        key: i,
        label: `内容${i}`,
        disabled: false
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
                  filterable
                  value={this.state.value}
                  onChange={this._handleChange} />
    )
  }
}
```

