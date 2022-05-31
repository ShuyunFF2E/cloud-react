---
order: 6
title: 小标签
desc: 不同的标签大小
---

```jsx

/**
 * title: 小标签
 * desc: 用带颜色的小标签来区分不同的状态展现
 */
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

export default class TagDemo extends Component {
	render() {
		return (
			<React.Fragment>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>小标签</div>
					<Tag color="blue"  size="small"> 蓝色 </Tag>
					<Tag color="yellow" size="small"> 黄色 </Tag>
					<Tag color="orange" size="small"> 橙色 </Tag>
					<Tag color="red" size="small"> 红色 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>禁用小标签</div>
					<Tag color="blue" disabled size="small"> 蓝色 </Tag>
					<Tag color="yellow" disabled size="small"> 黄色 </Tag>
					<Tag color="orange" disabled size="small"> 橙色 </Tag>
					<Tag color="red" disabled size="small"> 红色 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>可关闭的小标签</div>
					<Tag color="blue" size="small" closable> 蓝色 </Tag>
					<Tag color="yellow" size="small" closable> 黄色 </Tag>
					<Tag color="orange" size="small" closable> 橙色 </Tag>
					<Tag color="red" size="small" closable> 红色 </Tag>
				</div>

				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>带icon的小标签</div>
					<Tag color="blue" size="small" icon="people"> 蓝色 </Tag>
					<Tag color="yellow" size="small" icon="people"> 黄色 </Tag>
					<Tag color="orange" size="small" icon="people"> 橙色 </Tag>
					<Tag color="red" size="small" icon="people"> 红色 </Tag>
				</div>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>带icon的标签+可关闭的小标签</div>
					<Tag color="blue" icon="people" size="small" closable> 蓝色 </Tag>
					<Tag color="yellow" size="small" icon="people" closable> 黄色 </Tag>
					<Tag color="orange" size="small" icon="people" closable> 橙色 </Tag>
					<Tag color="red" size="small" icon="people" closable> 红色 </Tag>
				</div>
				
			</React.Fragment>
		);
	}
}
```
