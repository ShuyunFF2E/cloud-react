---
order: 4
title: 状态标签
desc: 用带颜色的标签来区分不同的状态展现
---

```jsx

            /**
             * title: 状态标签
             * desc: 用带颜色的标签来区分不同的状态展现
             */
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

class TagDemo extends Component {
	render() {
		return (
			<React.Fragment>
				<Tag type="success"> 成功 </Tag>
        <Tag type="danger"> 失败 </Tag>
        <Tag type="primary"> 进行中 </Tag>
				<Tag type="warning"> 未开始 </Tag>
        <Tag type="default"> 已完成 </Tag>
			</React.Fragment>
		);
	}
}
export default TagDemo;
```
