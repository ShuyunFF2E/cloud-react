---
order: 1
title: 级联选择器
desc: 下拉没有数据时，暂时内容
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
export default function Demo() {
	const onChange = value => {
		console.log(value);
	}

	const filter = (inputValue, path) => {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}

	return (
		<div>
			<div style={{ marginBottom: 24 }}>下拉列表没有数据，默认为空内容</div>
			<CCascader
				options={[]}
        style={{ width: 328 }}
				placeholder="Please select"/>
			<div style={{ marginBottom: 24, marginTop: 40 }}>自定义下拉列表没有数据展示内容</div>
			<CCascader
				options={addressOptions}
        style={{ width: 328 }}
				onChange={onChange}
				placeholder="Please select"
				showSearch={{filter:filter }}
				notFoundContent="自定义为空内容"/>
		</div>
	)
				
}
```
