---
order: 1
title: 基础用法
desc: Tabs组件的基础用法
---

```jsx

            /**
             * title: 基础用法
             * desc: Tabs组件的基础用法
             */
import React, { Component } from 'react';
import { Tabs } from 'cloud-react';

class BasicTabsDemo extends Component {
	handleChange = key => {
		console.log('当前激活面板key值为：' + key);
	};

	render() {
		return (
			<Tabs defaultActiveKey="eat" onChange={this.handleChange} step={500}>
				<Tabs.Panel tab="选项normal" key="1">
                    选项normal
				</Tabs.Panel>
				<Tabs.Panel tab="选项active" key="eat">
                    选项active
				</Tabs.Panel>
				<Tabs.Panel tab="选项normal" key="aaa">
                    选项normal
				</Tabs.Panel>
				<Tabs.Panel tab="选项disabled" key="bbb" disabled>
                    选项disabled
				</Tabs.Panel>
			</Tabs>
		);
	}
}

export default BasicTabsDemo;
```
