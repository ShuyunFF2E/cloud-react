---
order: 1
title: 级联选择器
desc: 清空选中项
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

	return (
        <div>
			<div style={{ marginBottom: 24 }}>未填写场景</div>
			<CCascader
                disabled
				options={addressOptions}
				onChange={onChange}
				placeholder="Please select"
                allowClear/>
			<div style={{ marginBottom: 24, marginTop: 40 }}>已填写场景</div>
			<CCascader
				disabled
				options={addressOptions}
				value={["jiangsu"]}
				placeholder="Please select"
				changeOnSelect/>
		</div>
			
		);
}
```
