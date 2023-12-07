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
				<Tag>超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag超级超级长的tag</Tag>
				<Tag type="link" onClick={() => {
                    window.open('http://www.baidu.com')
                }}>Link Tag</Tag>

              <Tag type="link" disabled>disabled Link</Tag>
			</React.Fragment>
		);
	}
}
export default TagDemo;
```
