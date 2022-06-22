---
order: 1
title: 按钮颜色类型
desc: 按钮三种颜色类型：tips（提示按钮）、danger（危险按钮）、success（成功按钮）
---

```jsx

            /**
             * title: 按钮颜色类型
             * desc: 按钮三种颜色类型：tips（提示按钮）、danger（危险按钮）、success（成功按钮）
             */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

export default class ButtonDemo extends React.Component {
	render() {
		return (
			<ul>
				<li style={{ marginBottom: 10 }}>
					<h5>普通：</h5>
					<Button style={{ marginRight: 5 }}>主题色</Button>
					<Button style={{ marginRight: 5 }} colorType="tips">警告</Button>
					<Button style={{ marginRight: 5 }} colorType="danger">危险</Button>
					<Button style={{ marginRight: 5 }} colorType="success">成功</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>主要：</h5>
					<Button type="primary" style={{ marginRight: 5 }}>主题色</Button>
					<Button type="primary" style={{ marginRight: 5 }} colorType="tips">警告</Button>
					<Button type="primary" style={{ marginRight: 5 }} colorType="danger">危险</Button>
					<Button type="primary" style={{ marginRight: 5 }} colorType="success">成功</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>次要：</h5>
					<Button type="secondary" style={{ marginRight: 5 }}>主题色</Button>
					<Button type="secondary" style={{ marginRight: 5 }} colorType="tips">警告</Button>
					<Button type="secondary" style={{ marginRight: 5 }} colorType="danger">危险</Button>
					<Button type="secondary" style={{ marginRight: 5 }} colorType="success">成功</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>幽灵：</h5>
					<Button type="dashed" style={{ marginRight: 5 }}>主题色</Button>
					<Button type="dashed" style={{ marginRight: 5 }} colorType="tips">警告</Button>
					<Button type="dashed" style={{ marginRight: 5 }} colorType="danger">危险</Button>
					<Button type="dashed" style={{ marginRight: 5 }} colorType="success">成功</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>链接：</h5>
					<Button type="link" style={{ marginRight: 5 }}>主题色</Button>
					<Button type="link" style={{ marginRight: 5 }} colorType="tips">警告</Button>
					<Button type="link" style={{ marginRight: 5 }} colorType="danger">危险</Button>
					<Button type="link" style={{ marginRight: 5 }} colorType="success">成功</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>文字：</h5>
					<Button type="text" style={{ marginRight: 5 }}>主题色</Button>
					<Button type="text" style={{ marginRight: 5 }} colorType="tips">警告</Button>
					<Button type="text" style={{ marginRight: 5 }} colorType="danger">危险</Button>
					<Button type="text" style={{ marginRight: 5 }} colorType="success">成功</Button>
				</li>
			</ul>
		);
	}
}
```
