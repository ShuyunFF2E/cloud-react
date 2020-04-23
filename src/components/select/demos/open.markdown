---
order: 7
title: 外部控制下拉展示
desc: 组件不再控制可选项展示，由外部提供参数控制
---

```javascript
import React, { useState } from 'react';
import { Button, Select } from 'cloud-react';

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
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('apple');

	const onClick = () => setOpen(!open);
	const onSet = () => setValue('litchi');

	const handleChange = (value, prevValue) => {
		console.log('select --- ' + value);
		console.log('prevSelect --- ' + prevValue);
	};

	return (
		<div style={{ display: 'flex' }}>
			<Select placeholder="请选择..." value={value} style={{ margin: '0 10px 10px 0', width: 200 }} open={open} onChange={handleChange}>
				{dataList.map((item, index) => (
					<Option value={item.value} key={index}>
						{item.label}
					</Option>
				))}
			</Select>
			<Button type="primary" onClick={onClick}>
				修改展开状态
			</Button>
			<Button type="primary" onClick={onSet}>
				设置值
			</Button>
		</div>
	);
}
```
