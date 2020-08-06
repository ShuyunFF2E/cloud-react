---
order: 8
title: 是否多选
desc: 下拉多选
---

```javascript
import React from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
	{
		label: '苹果',
		value: 'apple'
	},
	{
		label: '草莓',
		value: 'strawberry',
		disabled: true
	},
	{
		label: '特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项',
		value: 'litchi'
	},
	{
		label: '苹果1',
		value: 'apple1'
	},
	{
		label: '草莓1',
		value: 'strawberry1'
	},
	{
		label: '荔枝1',
		value: 'litchi1'
	},
	{
		label: '苹果2',
		value: 'apple2'
	},
	{
		label: '草莓2',
		value: 'strawberry2'
	},
	{
		label: '荔枝2',
		value: 'litchi2'
	},
	{
		label: '苹果3',
		value: 'apple3'
	},
	{
		label: '草莓3',
		value: 'strawberry3'
	},
	{
		label: '荔枝3',
		value: 'litchi3'
	}
];

export default function SelectDemo() {
	const handleChange = (value, prevValue) => {
		console.log(value, prevValue);
	};

	const handleOpen = () => console.log('open');
	const handleClose = () => console.log('close');

	const values = ['apple', 'strawberry', 'litchi'];
	const values2 = [];

	return (
		<div style={{ display: 'flex', height: 150 }}>
			<Select
				placeholder="请选择..."
				searchPlaceholder="multiple"
				defaultValue={values}
				onSelectOpen={handleOpen}
				onSelectClose={handleClose}
				onChange={handleChange}
				position="auto"
				style={{ margin: '0 10px 10px 0', width: 200 }}
				multiple
				searchable
				allowClear>
				{dataList.map((item, index) => (
					<Option value={item.value} disabled={item.disabled} key={index}>
						{item.label}
					</Option>
				))}
			</Select>

			<Select
				placeholder="请选择..."
				labelInValue={true}
				allowClear
				defaultValue={values2}
				onSelectOpen={handleOpen}
				onSelectClose={handleClose}
				onChange={handleChange}
				style={{ margin: '0 10px 10px 0', width: 200 }}
				multiple
				searchable
				hasConfirmButton
				hasSelectAll
				showSelectAll>
				{dataList.map((item, index) => (
					<Option value={item.value} disabled={item.disabled} key={index}>
						{item.label}
					</Option>
				))}
			</Select>

			<Select
				style={{ width: 200 }}
				placeholder="xxxxx"
				defaultValue={values}
				onChange={handleChange}
				dataSource={dataList}
				multiple
				allowClear
				labelInValue
			/>
		</div>
	);
}
```
