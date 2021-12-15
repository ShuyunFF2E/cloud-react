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
					<Button type="primary">primary</Button>
					{blank}
					<Button type="normal">normal</Button>
					{blank}
					<Button type="dashed">dashed</Button>
					{blank}
					<Button type="link">link</Button>
					{blank}
					<Button type="text">text</Button>
				</div>
			</React.Fragment>
		);
	}
}
```
