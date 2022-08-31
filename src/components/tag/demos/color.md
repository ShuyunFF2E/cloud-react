---
order: 5
title: 颜色标签
desc: 不同的主题色标签
---

```jsx

/**
 * title: 多重状态标签
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
					<div style={{ marginBottom: 5 }}>圆形标签</div>
					<Tag color="blue" rounded> 蓝色 </Tag>
					<Tag color="yellow" rounded> 黄色 </Tag>
					<Tag color="orange" disabled rounded> 橙色 </Tag>
					<Tag color="red" rounded> 红色 </Tag>
					<Tag color="green" rounded> 绿色 </Tag>
					<Tag color="gray" rounded> 灰色 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>禁用的标签</div>
					<Tag checked={false} disabled> 默认 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>可关闭的标签</div>
					<Tag color="blue" closable> 蓝色 </Tag>
					<Tag color="yellow" closable> 黄色 </Tag>
					<Tag color="orange" closable> 橙色 </Tag>
					<Tag color="red" closable> 红色 </Tag>
					<Tag color="green" closable> 绿色 </Tag>
					<Tag color="gray" closable> 灰色 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>带icon的标签</div>
					<Tag color="blue" icon="people"> 蓝色 </Tag>
					<Tag color="blue" icon="people"> 蓝色 </Tag>
					<Tag color="yellow" icon="people"> 黄色 </Tag>
					<Tag color="orange" icon="people"> 橙色 </Tag>
					<Tag color="red" icon="people"> 红色 </Tag>
					<Tag color="green" icon="people"> 绿色 </Tag>
					<Tag color="gray" icon="people"> 灰色 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>带icon的标签+可关闭的标签</div>
					<Tag color="blue" icon="people" closable> 蓝色 </Tag>
					<Tag color="blue" icon="people" closable> 蓝色 </Tag>
					<Tag color="yellow" icon="people" closable> 黄色 </Tag>
					<Tag color="orange" icon="people" closable> 橙色 </Tag>
					<Tag color="red" icon="people" closable> 红色 </Tag>
					<Tag color="green" icon="people" closable> 绿色 </Tag>
					<Tag color="gray" icon="people" closable> 灰色 </Tag>
				</div>
				
			</React.Fragment>
		);
	}
}
```
