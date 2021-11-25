---
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

export default class BasicTabsDemo extends Component {
	handleChange = key => {
		console.log('当前激活面板key值为：' + key);
	};

	render() {
		return (
			<Tabs defaultActiveKey="eat" onChange={this.handleChange} step={500}>
				<Tabs.Panel tab="选项1" key="1">
					选项1111111111111
				</Tabs.Panel>
				<Tabs.Panel tab="吃饭" key="eat">
					吃饭啊啊啊啊啊
				</Tabs.Panel>
				<Tabs.Panel tab="加关闭按钮" key="aaa" closable>
					为什么要关掉我！
				</Tabs.Panel>
				<Tabs.Panel tab="禁用我？？" key="bbb" disabled>
					试试
				</Tabs.Panel>
				<Tabs.Panel tab={<span style={{ color: 'red' }}>自定义标题</span>} key="ccc">
					测试自定义啊
				</Tabs.Panel>
				<Tabs.Panel tab="选项1" key="11">
					选项1111111111111
				</Tabs.Panel>
				<Tabs.Panel tab="吃饭" key="eat1">
					吃饭啊啊啊啊啊
				</Tabs.Panel>
				<Tabs.Panel tab="加关闭按钮" key="aaa1" closable>
					为什么要关掉我！
				</Tabs.Panel>
				<Tabs.Panel tab="禁用我？？" key="bbb1" disabled>
					试试
				</Tabs.Panel>
				<Tabs.Panel tab="选项1" key="12">
					选项1111111111111
				</Tabs.Panel>
				<Tabs.Panel tab="吃饭" key="eat2">
					吃饭啊啊啊啊啊
				</Tabs.Panel>
				<Tabs.Panel tab="加关闭按钮" key="aaa2" closable>
					为什么要关掉我！
				</Tabs.Panel>
				<Tabs.Panel tab="禁用我？？" key="bbb2" disabled>
					试试
				</Tabs.Panel>
				<Tabs.Panel tab="选项1" key="13">
					选项1111111111111
				</Tabs.Panel>
				<Tabs.Panel tab="吃饭" key="eat3">
					吃饭啊啊啊啊啊
				</Tabs.Panel>
				<Tabs.Panel tab="加关闭按钮" key="aaa3" closable>
					为什么要关掉我！
				</Tabs.Panel>
				<Tabs.Panel tab="禁用我？？" key="bbb3" disabled>
					试试
				</Tabs.Panel>
				<Tabs.Panel tab="选项1" key="14">
					选项1111111111111
				</Tabs.Panel>
				<Tabs.Panel tab="吃饭" key="eat4">
					吃饭啊啊啊啊啊
				</Tabs.Panel>
				<Tabs.Panel tab="加关闭按钮" key="aaa4" closable>
					为什么要关掉我！
				</Tabs.Panel>
				<Tabs.Panel tab="禁用我？？" key="bbb4" disabled>
					试试
				</Tabs.Panel>
			</Tabs>
		);
	}
}
```
