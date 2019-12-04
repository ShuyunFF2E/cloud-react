---
order: 1
title: 基本使用
desc: 普通标签、link标签
---

````javascript
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

export default class TagDemo extends Component {

	render() {

		return (
			<>
				<Tag>Tag Demo</Tag>
				<Tag><a href="http://www.baidu.com">Link Tag</a></Tag>
			</>
		);
	}
}
````
