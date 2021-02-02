---
order: 3
title: 左右结构
desc: 侧边栏在整体左侧
---

```javascript
import React, { Component } from 'react';
import { Layout } from 'cloud-react';


const { Header, Sider, Content, Footer } = Layout;

export default class LayoutDemo extends Component {

	render() {

		return (
			<Layout hasSider>
				<Sider>Sider</Sider>
				<Layout>
					<Header>Header</Header>
					<Content>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
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
.cloud-layout-sider {
	width: 200px;
	line-height: 100px;
	color: #fff;
	background: #3ba0e9;
}
```
