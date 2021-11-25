---
order: 11
title: 指定使用的键值
desc: 指定使用的键值
---

```jsx

            /**
             * title: 指定使用的键值
             * desc: 指定使用的键值
             */
import React, { useState } from 'react';
import { Select, Modal, Button, Tabs } from 'cloud-react';

const Option = Select.Option;

const dataList = [
	{
		title: '苹果',
		name: 'apple'
	},
	{
		title: '草莓',
		name: 'cc'
	},
	{
		title: '荔枝',
		name: 'lizhi'
	},
	{
		title: '特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项',
		name: 4
	}
];

export default function SelectDemo() {
	const handleChange = value => {
		console.log('select --- ' + value);
	};

	return (
		<div style={{ height: 200 }}>
			指定特定的键值key：
			<Select placeholder="xxxxx" labelKey="title" valueKey="name" onChange={handleChange} dataSource={dataList} />
		</div>
	);
}
```
