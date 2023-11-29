---
order: 1
title: 级联选择器
desc: 默认样式
---

```jsx

import React, { useState, useEffect } from 'react';
import { CCascader, Radio } from 'cloud-react';
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
  const [borderRadiusSize, setBorderRadiusSize] = useState('default');
	const onChange = (value) => {
		console.log(value);
	}
	return (
			<div>
              <Radio.Group
                value={borderRadiusSize}
                onChange={v => {
                  setBorderRadiusSize(v);
                }}>
                <Radio value="small">圆角：3px</Radio>
                <Radio value="default">圆角：6px</Radio>
                <Radio value="large">圆角：12px</Radio>
              </Radio.Group>
              <br/>
              <CCascader
                borderRadiusSize={borderRadiusSize}
                options={addressOptions}
                onChange={onChange}
                placeholder="Please select"
              />
			</div>
		);
}
```
