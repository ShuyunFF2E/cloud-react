---
order: 1
title: 按钮类型
desc: 按钮五种类型：主按钮、次按钮、链接按钮、文字按钮、虚线按钮
---

```jsx

            /**
             * title: 按钮类型
             * desc: 按钮五种类型：主按钮、次按钮、链接按钮、文字按钮、虚线按钮
             */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Button type="normal">普通</Button>
					{blank}
					<Button type="primary">主要</Button>
					{blank}
					<Button type="secondary">次要</Button>
					{blank}
					<Button type="dashed">幽灵</Button>
					{blank}
					<Button href="https://www.baidu.com/" target="_blank" title="百度一下，你就知道" type="link">链接</Button>
					{blank}
					<Button type="text">文字</Button>
				</div>
			</React.Fragment>
		);
	}
}
```
