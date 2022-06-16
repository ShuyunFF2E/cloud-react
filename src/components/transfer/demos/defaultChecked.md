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

export default class TransferDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ['3', '6']
    }
    this._handleChange = this.handleChange.bind(this);
  }

  get data() {
    const data = [];
    for (let i = 1; i <= 6; i++) {
      data.push({
        key: '' + i,
        label: `备选文字${i}`,
        disabled: ['4', '5'].includes(i)
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
                  leftDefaultChecked={['4']}
                  rightDefaultChecked={['6']}
                  value={this.state.value}
                  onChange={this._handleChange} />
    )
  }
}
```

