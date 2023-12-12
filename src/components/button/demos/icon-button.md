---
order: 1
title: 按钮文字前添加图标
desc: 可选值为组件库内所有 Icon 图标对应的类型代码
---

```jsx
/**
 * title: 按钮文字前添加图标
 * desc: 可选值为组件库内所有 Icon 图标对应的类型代码
 */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

class ButtonDemo extends React.Component {
	render() {
		return (
			<ul>
              <li style={{ marginBottom: 10 }}>
                <h5>主要：</h5>
                <Button type="primary" icon="plus-solid">添加</Button>
              </li>
				<li style={{ marginBottom: 10 }}>
					<h5>描边：</h5>
					<Button icon="plus-solid">添加</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>次要：</h5>
					<Button type="secondary" icon="plus-solid">添加</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>幽灵：</h5>
					<Button type="dashed" icon="plus-solid">添加</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>链接：</h5>
					<Button type="link" icon="plus-solid">添加</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>文字：</h5>
					<Button type="text" icon="plus-solid">添加</Button>
				</li>
			</ul>
		);
	}
}
export default ButtonDemo;
```
