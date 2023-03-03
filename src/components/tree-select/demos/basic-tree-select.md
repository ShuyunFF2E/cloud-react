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
				label: '栗子1',
				value: 'litchi',
                children: [
                    {
                        label: '栗子11',
                        value: 'litchi1',
                        children: [
                            {
                                label: '栗子1四度空间发哈上岛咖啡哈里斯地方黄金时代恢复了卡精神焕发节点上11',
                                value: 'litchi11',
                            }
                        ]
                    }
                ]
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
				position="auto"
				onSearch={this.handleSearch}
				value={{
                    label: '栗子111',
                    value: 'litchi11',
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
