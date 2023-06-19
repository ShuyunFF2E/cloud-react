---
order: 1
title: 级联选择器
desc: 鼠标移动展示子项
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
export default function Demo() {
	const onChange = value => {
		console.log(value);
	}

	const filter = (inputValue, path) => {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}


	return (
    <div>
				<div style={{ marginBottom: 24 }}>鼠标点击展示子项</div>
				<CCascader
          options={addressOptions}
          onChange={onChange}
          placeholder="Please select"
          showSearch={{ filter: filter }}
          />
				<div style={{ marginBottom: 24, marginTop: 40 }}>鼠标移动展示子项</div>
				<CCascader
          options={addressOptions}
          onChange={onChange}
          placeholder="Please select"
          showSearch={{ filter: filter }}
          expandTrigger="hover"
          dropdownMenuColumnStyle={
            { width: 100, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}/>
			</div>
		);
}
```
