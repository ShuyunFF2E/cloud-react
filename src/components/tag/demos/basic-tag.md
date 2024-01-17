---
order: 1
title: 基本使用
desc: 普通标签、link标签
---

```jsx

            /**
             * title: 基本使用
             * desc: 普通标签、link标签
             */
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

class TagDemo extends Component {
	render() {
		return (
			<React.Fragment>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<Tag>默认标签</Tag>
					<Tag type="link" onClick={() => {
						window.open('http://www.baidu.com')
					}}>超链接标签</Tag>
					<Tag type="stroke">描边标签</Tag>

					<Tag>超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag</Tag>
				</div>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>预设状态标签</div>
					<Tag type="success">成功</Tag>
					<Tag type="danger">失败</Tag>
					<Tag type="warning">未开始</Tag>
					<Tag type="default">已完成</Tag>
					<Tag color="blue">进行中</Tag>
				</div>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
					<div style={{ marginBottom: 5 }}>预设状态标签 + 图标</div>
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
