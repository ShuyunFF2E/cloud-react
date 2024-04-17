---
order: 1
title: 按钮类型
desc: 按钮四种类型：主按钮、次按钮、虚线按钮、连接按钮
---

```jsx

            /**
             * title: 按钮类型
             * desc: 按钮四种类型：主按钮、次按钮、虚线按钮、连接按钮
             */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

class ButtonDemo extends React.Component {
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
				</div>
			</React.Fragment>
		);
	}
}
export default ButtonDemo
```
