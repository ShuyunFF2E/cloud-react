---
order: 3
title: 自定义数据为空时的内容
desc: 自定义数据为空时的内容
---

```javascript
import React, { useState } from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [];

export default function SelectDemo() {
	const emptyRender = '没有数据啊！！！！！';

	const emptyRender2 = <div style={{ color: 'red', alignSelf: 'flex-start' }}>嘿嘿嘿！！！</div>;

	const handleChange = value => {
		console.log('select --- ' + value);
	};

	return (
		<div style={{ display: 'flex' }}>
			<Select
				placeholder="请选择..."
				defaultValue="apple"
				emptyRender={emptyRender}
				style={{ margin: '0 10px 10px 0', width: 200 }}
				onChange={handleChange}>
				{dataList.map((item, index) => (
					<Option value={item.value} key={index}>
						{item.label}
					</Option>
				))}
			</Select>
			<Select
				placeholder="请选择..."
				defaultValue="apple"
				emptyRender={emptyRender2}
				style={{ margin: '0 10px 10px 0', width: 200 }}
				onChange={handleChange}>
				{dataList.map((item, index) => (
					<Option value={item.value} key={index}>
						{item.label}
					</Option>
				))}
			</Select>
		</div>
	);
}
```
