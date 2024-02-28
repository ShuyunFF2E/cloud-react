---
order: 3
title: 左右结构
desc: 侧边栏在整体左侧
---

```jsx

            /**
             * title: 左右结构
             * desc: 侧边栏在整体左侧
             */
import React, { Component } from 'react';
import { Layout } from 'cloud-react';


const { Header, Sider, Content, Footer } = Layout;

class LayoutDemo extends Component {

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
export default LayoutDemo
```

