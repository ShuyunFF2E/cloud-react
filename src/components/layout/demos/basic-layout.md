---
order: 1
title: 上中下结构
desc: 最基本使用
---

```jsx

            /**
             * title: 上中下结构
             * desc: 最基本使用
             */
import React, { Component } from 'react';
import { Layout } from 'cloud-react';
import './styles/basic-layout.less'


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

