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
					<Tag>默认标签</Tag>
					<Tag type="link" onClick={() => {
						window.open('http://www.baidu.com')
					}}>超链接标签</Tag>
					<Tag type="stroke">描边标签</Tag>
					<Tag type="fill-stroke">填充描边标签</Tag>

					<Tag>超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag</Tag>
					<Tag icon="people">图标标签</Tag>
				</div>
			</React.Fragment>
		);
	}
}
export default TagDemo;
```
