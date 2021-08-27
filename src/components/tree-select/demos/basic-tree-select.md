---
order: 1
title: 基本使用
desc: 基础使用
---

```jsx

            /**
             * title: 基本使用
             * desc: 基础使用
             */
import React from 'react';
import { TreeSelect } from 'cloud-react';

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

export default class TreeSelectDemo extends React.Component {

	handleChange = node => {
		console.log(node);
	};

	handleSearch = (value, nodes) => {
		console.log(value, nodes);
	};

	render() {

		return (
			<TreeSelect
				searchable
				allowClear
                defaultOpen
                isAppendToBody
				onSearch={this.handleSearch}
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
