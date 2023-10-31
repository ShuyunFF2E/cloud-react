---
title: 动态用法
desc: 动态添加/删除Tabs
---

```jsx

            /**
             * title: 动态用法
             * desc: 动态添加/删除Tabs
             */
import React, { Component } from 'react';
import { Button, Tabs } from 'cloud-react';

class DynamicTabsDemo extends Component {
	state = {
		tabList: [{ title: '选项卡', content: '动态选项卡', key: '0' }],
		activeKey: ''
	};

	count = 1;

	handleClose = key => {
		const { activeKey, tabList } = this.state;

		const pos = tabList.findIndex(item => item.key === key);
		const lastPos = Math.max(0, pos - 1);
		const panes = tabList.filter(item => item.key !== key);

		if (!panes.length) {
			return;
		}
		const nextActiveKey = panes[lastPos].key;

		this.setState({
			tabList: panes,
			activeKey: nextActiveKey
		});
	};

	handleAdd = () => {
		const newKey = this.count++ + '';
		const newList = [
			...this.state.tabList,
			{
				title: '选项卡' + newKey,
				content: '当前时间:' + Date.now(),
				key: newKey
			}
		];
		this.setState({
			tabList: newList,
			activeKey: newKey
		});
	};

	handleChange = () => {};

	render() {
		const { tabList, activeKey, count } = this.state;

		return (
			<React.Fragment>
				<Button onClick={this.handleAdd} type="primary">
					添加tab
				</Button>
				<div style={{ height: 10 }} />
				<Tabs defaultActiveKey={'0'} activeKey={activeKey} onChange={this.handleChange} onClose={this.handleClose}>
					{tabList.map((item, index) => (
						<Tabs.Panel tab={item.title} closable key={item.key} index={item.index}>
							{item.content}
						</Tabs.Panel>
					))}
				</Tabs>
			</React.Fragment>
		);
	}
}

export default DynamicTabsDemo;
```
