---
order: 2
title: 侧边栏
desc: 侧边栏包含在中间
---

```jsx

            /**
             * title: 侧边栏
             * desc: 侧边栏包含在中间
             */
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

