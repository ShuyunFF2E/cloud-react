---
order: 2
title: 侧边栏
desc: 侧边栏包含在中间
---

```javascript
import React, { Component } from 'react';
import { Layout } from 'cloud-react';


const { Header, Sider, Content, Footer } = Layout;

export default class LayoutDemo extends Component {

	render() {

		return (
			<>
				<h3>侧边栏在左边</h3>
				<Layout>
					<Header>Header</Header>
					<Layout hasSider>
						<Sider>Sider</Sider>
						<Content>Content</Content>
					</Layout>
					<Footer>Footer</Footer>
				</Layout>
				<h3>侧边栏在右边</h3>
				<Layout>
					<Header>Header</Header>
					<Layout hasSider>
						<Content>Content</Content>
						<Sider>Sider</Sider>
					</Layout>
					<Footer>Footer</Footer>
				</Layout>
			</>
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
