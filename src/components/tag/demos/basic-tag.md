---
order: 1
title: 基本使用
desc: 普通标签、link标签
---

```jsx
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

class TagDemo extends Component {
	render() {
		return (
			<React.Fragment>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<Tag type="success">成功</Tag>
					<Tag type="danger">失败</Tag>
					<Tag type="warning">未开始</Tag>
					<Tag type="default">已完成</Tag>
					<Tag color="blue">进行中</Tag>
				</div>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<Tag type="success" icon="success-fill">成功</Tag>
					<Tag type="danger" icon="close-fill-1">失败</Tag>
					<Tag type="warning" icon="checkbox-indeterminate">未开始</Tag>
					<Tag type="default" icon="success-fill">已完成</Tag>
					<Tag color="blue" icon="time">进行中</Tag>
				</div>
				
			</React.Fragment>
		);
	}
}
export default TagDemo;
```
