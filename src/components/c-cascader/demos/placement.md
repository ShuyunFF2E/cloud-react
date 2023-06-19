---
order: 1
title: 级联选择器
desc: 弹出位置
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
			<div style={{ marginBottom: 24 }}>左下</div>
			<CCascader
          		options={addressOptions}
          		onChange={onChange}
				placeholder="Please select"
				showSearch={{ filter: filter }}
				popupPlacement="bottomLeft"
			/>
			<div style={{ marginBottom: 24, marginTop: 40 }}>左上</div>
			<CCascader
          		options={addressOptions}
          		onChange={onChange}
				placeholder="Please select"
				showSearch={{ filter: filter }}
				popupPlacement="topLeft"
			/>
			<div style={{ marginBottom: 24, marginTop: 40 }}>右下</div>
			<CCascader
          		options={addressOptions}
          		onChange={onChange}
				placeholder="Please select"
				showSearch={{ filter: filter }}
				popupPlacement="bottomRight"
			/>
			<div style={{ marginBottom: 24, marginTop: 40 }}>右上</div>
			<CCascader
          		options={addressOptions}
          		onChange={onChange}
				placeholder="Please select"
				showSearch={{ filter: filter }}
				popupPlacement="topRight"
			/>

		</div>
		);
}
```
