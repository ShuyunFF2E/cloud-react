---
order: 4
title: 按钮组合
desc: '通过 Button.Group 容器组件来包装 Button，可以统一设置 size, type'
---

```jsx

            /**
             * title: 按钮组合
             * desc: 通过 Button.Group 容器组件来包装 Button，可以统一设置 size, type
             */
import React from 'react';
import { Button } from 'cloud-react';

export default class ButtonDemo extends React.Component {
	render() {
		return (
			<ul>
				<li style={{ marginBottom: 10 }}>
					<h5>主要：</h5>
					<Button.Group type="primary">
						<Button disabled icon="double-left">上一页</Button>
						<Button>第 1 页</Button>
						<Button icon="double-right">下一页</Button>
					</Button.Group>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>普通：</h5>
					<Button.Group>
						<Button disabled icon="double-left">上一页</Button>
						<Button>第 1 页</Button>
						<Button icon="double-right">下一页</Button>
					</Button.Group>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>幽灵：</h5>
					<Button.Group type="dashed">
						<Button disabled icon="double-left">上一页</Button>
						<Button>第 1 页</Button>
						<Button icon="double-right">下一页</Button>
					</Button.Group>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>链接：</h5>
					<Button.Group type="link">
						<Button disabled icon="double-left">上一页</Button>
						<Button>第 1 页</Button>
						<Button icon="double-right">下一页</Button>
					</Button.Group>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>文字：</h5>
					<Button.Group type="text">
						<Button disabled icon="double-left">上一页</Button>
						<Button>第 1 页</Button>
						<Button icon="double-right">下一页</Button>
					</Button.Group>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>混合多个：</h5>
					<Button.Group size="large">
						<Button>主题色</Button>
						<Button colorType="tips">警告</Button>
						<Button colorType="danger">危险</Button>
						<Button colorType="success">成功</Button>
					</Button.Group>
				</li>
			</ul>
		);
	}
}
```
