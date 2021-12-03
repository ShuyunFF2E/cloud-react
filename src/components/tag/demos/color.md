---
order: 5
title: 颜色标签
desc: 不同的主题色标签
---

```jsx

/**
 * title: 状态标签
 * desc: 用带颜色的标签来区分不同的状态展现
 */
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

export default class TagDemo extends Component {
	render() {
		return (
			<React.Fragment>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>一般标签</div>
					<Tag color="blue"> 蓝色 </Tag>
					<Tag color="yellow"> 黄色 </Tag>
					<Tag color="orange" disabled> 橙色 </Tag>
					<Tag color="red"> 红色 </Tag>
					<Tag color="green"> 绿色 </Tag>
					<Tag color="gray"> 灰色 </Tag>
					<Tag> 默认 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>禁用的标签</div>
					<Tag color="blue" disabled> 蓝色 </Tag>
					<Tag color="yellow" disabled> 黄色 </Tag>
					<Tag color="orange" disabled> 橙色 </Tag>
					<Tag color="red" disabled> 红色 </Tag>
					<Tag color="green" disabled> 绿色 </Tag>
					<Tag color="gray" disabled> 灰色 </Tag>
					<Tag disabled> 默认 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>可关闭的标签</div>
					<Tag color="blue" closable> 蓝色 </Tag>
					<Tag color="yellow" closable> 黄色 </Tag>
					<Tag color="orange" closable> 橙色 </Tag>
					<Tag color="red" closable> 红色 </Tag>
					<Tag color="green" closable> 绿色 </Tag>
					<Tag color="gray" closable> 灰色 </Tag>
					<Tag closable> 默认 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>带icon的标签</div>
					<Tag color="blue" icon="people-solid"> 蓝色 </Tag>
				</div>
				
			</React.Fragment>
		);
	}
}
```
