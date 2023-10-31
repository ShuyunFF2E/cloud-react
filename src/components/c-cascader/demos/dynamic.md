---
order: 1
title: 级联选择器
desc: 异步加载子项目，自定义加载图标
---

```jsx

import React, { useState } from 'react';
import { CCascader, Icon } from 'cloud-react';
const addressOptions =  [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
	isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
	isLeaf: false,
  },
];
const children = {
	'zhejiang': [
			{
				value: 'hangzhou',
				label: 'Hangzhou',
			},
			{
				value: 'xihu',
				label: 'West Lake',
			},
			{
				value: 'xiasha',
				label: 'Xia Sha',
			},
		],
	'jiangsu': [
		{
		value: 'nanjing',
		label: 'Nanjing',
		},
	]
}
export default function Demo() {
	const [options, setOptions] = useState(addressOptions);
	const onChange = value => {
		console.log(value);
	}

	const filter = (inputValue, path) => {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}

	const loadData  = selectedOptions => {
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;
		// 动态加载下级数据
		setTimeout(() => {
			targetOption.children = children[targetOption.value];

			setOptions([...options]);
			
			targetOption.loading = false;
		}, 1000);
  	};

	return (
			<div>
				<div style={{ marginBottom: 24 }}>异步加载</div>
				<CCascader
					options={options}
					onChange={onChange}
					placeholder="Please select"
					showSearch={{ filter: filter }}
					loadData={loadData}
				/>
				<div style={{ marginBottom: 24, marginTop: 40 }}>异步加载，修改加载图标</div>
				<CCascader
					options={options}
					onChange={onChange}
					placeholder="Please select"
					showSearch={{ filter: filter }}
					loadData={loadData}
					loadingIcon={<Icon type='refresh' />}
				/>
			</div>
			);
}
```
