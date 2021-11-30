---
title: Tab 在左侧固定
desc: Tab 在左侧固定
---

```jsx

            /**
             * title: Tab 在左侧固定
             * desc: 支持部分 Tab 在左侧固定
             */
import React, { Component } from 'react';
import { Tabs } from 'cloud-react';

export default class BasicTabsDemo extends Component {
	tabList = [
		{ tab: '选项卡一', content: '不可以移动', fixed: true },
		{ tab: '选项卡二', content: '不可以移动', fixed: true },
		{ tab: '选项卡三超长超长超长', content: '超长' },
		{ tab: '选项卡四', content: '4' },
		{ tab: '选项卡五', content: '5' },
		{ tab: '选项卡六', content: '6' },
		{ tab: '选项卡七', content: '7' },
		{ tab: '选项卡八', content: '8' },
		{ tab: '选项卡九', content: '9' },
		{ tab: '选项卡十', content: '10' },
		{ tab: '选项卡十一', content: '11' },
		{ tab: '选项卡十二', content: '12' },
		{ tab: '选项卡十三', content: '13' },
		{ tab: '选项卡十四', content: '14' },
		{ tab: '选项卡十五', content: '15' },
		{ tab: '选项卡十六', content: '16' },
		{ tab: '选项卡十七', content: '17' }
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
