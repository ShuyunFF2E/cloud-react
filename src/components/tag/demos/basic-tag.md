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
				<Tag>Tag Demo</Tag>
				<Tag>
					<a href="http://www.baidu.com">Link Tag</a>
				</Tag>
			</React.Fragment>
		);
	}
}
export default TagDemo
```
