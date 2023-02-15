---
order: 1
title: 字体图标Tabs用法
desc: Tabs组件的基础用法
---

```jsx

            /**
             * title: 基础用法
             * desc: Tabs组件的基础用法
             */
import React, { Component } from 'react';
import { Tabs, Icon } from 'cloud-react';

export default class IconsTabsDemo extends Component {
	render() {
		return (
			<Tabs defaultActiveKey="1" type="capsule" onChange={this.handleChange} step={500}>
				<Tabs.Panel tab={<Icon type="group-fill1"/>} key="1" />
				<Tabs.Panel tab={<Icon type="shop-fill"/>} key="2" />
				<Tabs.Panel tab={<Icon type="thumb-up-fill"/>} key="3" />
				<Tabs.Panel tab={<Icon type="sent"/>} key="4" />
			</Tabs>
		);
	}
}
```
