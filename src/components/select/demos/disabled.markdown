---
order: 4
title: 是否禁用
desc: 下拉禁用
---

```javascript
import React, { useState } from 'react';
import Select from 'cloud-react/select';
import Button from 'cloud-react/button';

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
		value: 'litchi'
	}
];

export default function SelectDemo() {
	const [disabled, setDisabled] = useState(false);

	const onClick = () => setDisabled(!disabled);

	return (
		<div>
			<Select
				placeholder="请选择..."
				defaultValue="apple"
				style={{ marginBottom: '10px' }}
				disabled={disabled}
			>
				{dataList.map((item, index) => (
					<Option value={item.value} key={index}>
						{item.label}
					</Option>
				))}
			</Select>
			<Button type="primary" onClick={onClick}>
				修改禁用状态
			</Button>
		</div>
	);
}
```
