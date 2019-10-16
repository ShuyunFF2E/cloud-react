---
order: 2
title: 支持清除的下拉框
desc: 支持清除的下拉框
---

```javascript
import React, { useState } from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
	{
		label: '苹果',
		value: 'apple'
	},
	{
		label: '草莓',
		value: 'strawberry'
	},
	{
		label: '荔枝',
		value: null
	},
	{
		label: '特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项',
		value: 4
	}
];

export default function SelectDemo() {
	const handleChange = value => {
		console.log('select --- ' + value);
	};

	return (
		<div style={{height: 150}}>
			<Select
				placeholder="请选择..."
				defaultValue={4}
				allowClear
				onChange={handleChange}
			>
				{dataList.map((item, index) => (
					<Option value={item.value} disabled={item.disabled} key={index}>
						{item.label}
					</Option>
				))}
			</Select>
		</div>
	);
}
```
