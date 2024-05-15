---
order: 1
title: 级联选择器
desc: 下来动画
---

```jsx

import React from 'react';
import { CCascader } from 'cloud-react';
const addressOptions =  [
  {
    value: 'zhejiang',
    label: 'ZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiang',
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

	return (
		<CCascader
      style={{ width: 328 }}
      options={addressOptions}
      placeholder="Please select"
      transitionName="slide-up"
    />
		);
}
```
