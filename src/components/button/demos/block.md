---
order: 5
title: block 按钮
desc: block 属性将使按钮适合其父宽度。
---

```jsx

            /**
             * title: block 按钮
             * desc: block 属性将使按钮适合其父宽度。
             */
import React from 'react';
import { Button } from 'cloud-react';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Button block type="primary">
						主要
					</Button>
					{blank}
					<Button block type="normal">
						普通
					</Button>
					{blank}
					<Button block type="dashed">
						幽灵
					</Button>
					{blank}
					<Button block type="link">
						链接
					</Button>
					{blank}
					<Button block type="text">
						文字
					</Button>
				</div>
			</React.Fragment>
		);
	}
}
```
