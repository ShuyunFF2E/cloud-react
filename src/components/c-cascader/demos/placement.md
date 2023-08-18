---
order: 1
title: 级联选择器
desc: 弹出位置
---

```jsx

import React, { useState } from 'react';
import { Button, CCascader } from 'cloud-react';
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
	const [ placement, setPlacement ] = useState('bottomLeft');
	const onChange = value => {
		console.log(value);
	}
	return (
    	<div>
			<Button.Group>
				<Button onClick={() => setPlacement('bottomLeft')}>左下</Button>
				<Button onClick={() => setPlacement('topLeft')}>左上</Button>
				<Button onClick={() => setPlacement('bottomRight')}>右下</Button>
				<Button onClick={() => setPlacement('topRight')}>右上</Button>
			</Button.Group>
			<div style={{ marginTop: 24 }}>
				<CCascader
					options={addressOptions}
					onChange={onChange}
					placeholder="Please select"
					placement={placement}
				/>
			</div>
		</div>
		);
}
```
