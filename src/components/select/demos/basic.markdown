---
order: 1
title: 基础用法
desc: 基础用法
---

```javascript
import React, { useState } from 'react';
import { Select, Modal, Button, Tabs } from 'cloud-react';

const Option = Select.Option;

const dataList = [
	{
		label: '苹果',
		value: 'apple'
	},
	{
		label: '草莓',
		value: undefined
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
	const [visible, setVisible] = useState(false);
	const handleChange = value => {
		console.log('select --- ' + value);
	};

	const handleOpen = () => console.log('open');
	const handleClose = () => console.log('close');

	const openModal = () => setVisible(true);
	const closeModal = () => setVisible(false);

	return (
		<div style={{height:200}}>
			<Select
				placeholder="请选择..."
				defaultValue={4}
				onSelectOpen={handleOpen}
				onSelectClose={handleClose}
				onChange={handleChange}
			>
				{dataList.map((item, index) => (
					<Option value={item.value} disabled={item.disabled} key={index}>
						{item.label}
					</Option>
				))}
			</Select>
			<div style={{margin: '20px 0'}}>
				<Button onClick={openModal}>打开弹框</Button>
				<Modal 
					title="内容"
					visible={visible}
					onOk={closeModal}
					onCancel={closeModal}
					onClose={closeModal}>
					<Select
						placeholder="请选择..."
						defaultValue={4}>
						{dataList.map((item, index) => (
							<Option value={item.value} disabled={item.disabled} key={index}>
								{item.label}
							</Option>
						))}
					</Select>
				</Modal>
			</div>

			<Tabs defaultActiveKey="eat">
				<Tabs.Panel tab="选项1" key='1'>
						<Select
							placeholder="请选择..."
							defaultValue={4}>
							{dataList.map((item, index) => (
								<Option value={item.value} disabled={item.disabled} key={index}>
									{item.label}
								</Option>
							))}
						</Select>
				</Tabs.Panel>
				<Tabs.Panel tab="吃饭" key="eat">吃饭啊啊啊啊啊</Tabs.Panel>
			</Tabs>
		</div>
	);
}
```
