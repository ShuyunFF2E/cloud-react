---
order: 4
title: Transfer
desc: 默认样式
---
```jsx


/**
 * title: 树形结构支持
 * desc: 支持树形结构，仅支持选择叶子结点，穿梭后会保留树形结构
 */
import React from 'react';
import { Transfer, Tree } from 'cloud-react';

export default class TransferDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: []
    }
    this._handleChange = this.handleChange.bind(this);
  }

  get data() {
    return [
      {
        key: '1',
        label: '一级文字',
        children: [
          {
            key: '1-1',
            label: '二级文字',
          }
        ]
      },
      {
        key: '2',
        label: '一级文字',
        children: [
          {
            key: '2-1',
            label: '二级文字',
            pid: '2',
            children: [
              {
                key: '2-1-1',
                label: '三级文字',
                pid: '2-1',
              },
              {
                key: '2-1-2',
                label: '三级文字',
                pid: '2-1',
              }
            ]
          }
        ]
      },
      {
      key: '3',
        label: '一级文字',
        children: [
          {
          key: '3-1',
            label: '二级文字',
            pid: '3',
          }
        ]
      },
    ]
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
                  onChange={this._handleChange} >
        </Transfer>
    )
  }
}


```