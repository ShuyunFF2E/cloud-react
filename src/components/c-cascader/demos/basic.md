---
order: 1
title: 级联选择器
desc: 默认样式
---

```jsx

import React from 'react';
import { CCascader } from 'cloud-react';
const addressOptions =  [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
		           

    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

const defaultOptions = [{
  label: '浙江',
  value: 'zj',
}, {
  label: '杭州',
  value: 'hangzhou',
}, {
  label: '余杭',
  value: 'yuhang',
}];
export default class Demo extends React.Component {
onChange(value) {
  console.log(value);
}
 filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}
  render() {
    const defaultValue = defaultOptions.map(o => o.value);

    return (
			<>
			  <CCascader options={addressOptions} onChange={this.onChange} placeholder="Please select"   showSearch={{filter:this.filter }}/>

			</>
    );
  }
}
```
