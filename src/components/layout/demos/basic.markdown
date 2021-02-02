---
order: 1
title: 上中下结构
desc: 最基本使用
---

```javascript
import React, { Component } from 'react';
import { Layout } from 'cloud-react';


const { Header, Sider, Content, Footer } = Layout;

export default class LayoutDemo extends Component {

	render() {

		return (
			<Layout>
				<Header>Header</Header>
				<Content>Content</Content>
				<Footer>Footer</Footer>
			</Layout>
		);
	}
}
```

```less
.cloud-layout {
	text-align: center;
}
.cloud-layout-header,
.cloud-layout-footer {
	color: #fff;
	background: #7dbcea;
}
.cloud-layout-content {
	min-height: 100px;
	line-height: 100px;
	color: #fff;
	background: #108ee9;
}
```
