---
order: 1
title: 基本使用
desc: 基础使用
---

```javascript
import React from 'react';
import { TreeSelect } from 'cloud-react';

export default class TreeSelectDemo extends React.Component {
	constructor(props) {
		super(props);
	}

	handleChange = node => {
		console.log(node);
	};

	render() {
		const treeData = [
			{
				label: '栗子',
				value: 'apple',
				children: [
					{
						label: '荔枝',
						value: 'litchi'
					}
				]
			},
			{
				label: '草莓',
				value: 'caomei',
				children: [
					{
						label: '栗子',
						value: 'lizi'
					}
				]
			}
		];

		return (
			<TreeSelect
				searchable
				allowClear
				value={{
					label: '荔枝',
					value: 'litchi'
				}}
				placeholder="选择一个选项"
				searchPlaceholder="搜索一个选项"
				dataSource={treeData}
				onChange={this.handleChange}
			/>
		);
	}
}
```
