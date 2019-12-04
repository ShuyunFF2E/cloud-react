---
order: 4
title: 状态标签
desc: 用带颜色的标签来区分不同的状态展现
---

````javascript
import React, { Component } from 'react';
import { Tag } from 'cloud-react';


export default class TagDemo extends Component {

	render() {
		return (
			<>
				<Tag type="success"> 启动 </Tag>
				<Tag type="warning"> 进行中 </Tag>
				<Tag type="default"> 禁用 </Tag>
				<Tag type="danger"> 错误 </Tag>
				<Tag> 默认 </Tag>
			</>
		);
	}
}

````
