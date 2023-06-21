---
order: 1
title: 级联选择器
desc: 支持选择子选项，选中后，仅展示最后一级
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

	const displayRender = labels => labels[labels.length - 1];

	return (
			<CCascader
				options={addressOptions}
				onChange={onChange}
				placeholder="Please select"
				displayRender={displayRender}
				showSearch={{ filter: filter }}/>
		);
}
```
