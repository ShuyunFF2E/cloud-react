---
order: 3
title: 默认选中
desc: 默认左侧和右侧数据选中，进行数据穿梭
---

```jsx

/**
 title: 默认选中及指定禁选
 desc: 默认左侧和右侧数据选中
 */
import React from 'react';
import { Transfer } from 'cloud-react';

class TransferDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: [1, 5]
    }
    this._handleChange = this.handleChange.bind(this);
  }

  get data() {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      data.push({
        key: i,
        label: `内容${i}`,
        disabled: i === 3
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
                  filterable
                  leftDefaultChecked={[4, 6]}
                  rightDefaultChecked={[5]}
                  value={this.state.value}
                  onChange={this._handleChange} />
    )
  }
}

export default TransferDemo;
```

