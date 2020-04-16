---
title: Tab 在左侧固定
desc: Tab 在左侧固定
---

```javascript
import React, { Component } from 'react';
import { Tabs } from 'cloud-react';

export default class BasicTabsDemo extends Component {
	tabList = [
		{ tab: '固定的tab1', content: '不可以移动', fixed: true },
		{ tab: '固定的tab2', content: '不可以移动', fixed: true },
		{ tab: '超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长', content: '超长' },
		{ tab: '禁用我？？', content: '试试' },
		{ tab: '选项1', content: '选项1111111111111' },
		{ tab: '吃饭', content: '吃饭啊啊啊啊啊' },
		{ tab: '加关闭按钮', content: '为什么要关掉我！' },
		{ tab: '禁用我？？', content: '试试' },
		{ tab: '选项1', content: '选项1111111111111' },
		{ tab: '吃饭', content: '吃饭啊啊啊啊啊' },
		{ tab: '加关闭按钮', content: '为什么要关掉我！' },
		{ tab: '吃饭', content: '吃饭啊啊啊啊啊' },
		{ tab: '加关闭按钮', content: '为什么要关掉我！' },
		{ tab: '禁用我？？', content: '试试' },
		{ tab: '选项1', content: '选项1111111111111' },
		{ tab: '吃饭', content: '吃饭啊啊啊啊啊' },
		{ tab: '加关闭按钮', content: '为什么要关掉我！' }
	];

	tabBarStyle = { width: '110px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };

	handleChange = key => {
		console.log('当前激活面板key值为：' + key);
	};

	render() {
		return (
			<Tabs defaultActiveKey="2" onChange={this.handleChange} step={500}>
				{this.tabList.map((item, index) => (
					<Tabs.Panel tab={item.tab} key={index} fixed={item.fixed} tabBarStyle={this.tabBarStyle}>
						{item.content}
					</Tabs.Panel>
				))}
			</Tabs>
		);
	}
}
```
