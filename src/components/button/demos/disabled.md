---
order: 3
title: 禁用按钮
desc: 添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。
---

```jsx

            /**
             * title: 禁用按钮
             * desc: 添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。
             */
import React from 'react';
import { Button } from 'cloud-react';

const blank = '\u00A0';

class ButtonDemo extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Button type="primary" disabled>
						primary
					</Button>
					{blank}
					<Button type="normal" disabled>
						normal
					</Button>
					{blank}
					<Button type="dashed" disabled>
						dashed
					</Button>
					{blank}
					<Button type="link" disabled>
						link
					</Button>
				</div>
			</React.Fragment>
		);
	}
}
export default ButtonDemo
```
