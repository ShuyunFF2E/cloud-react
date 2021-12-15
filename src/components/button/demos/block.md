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
						primary
					</Button>
					{blank}
					<Button block type="normal">
						normal
					</Button>
					{blank}
					<Button block type="dashed">
						dashed
					</Button>
					{blank}
					<Button block type="link">
						link
					</Button>
					{blank}
					<Button block type="text">
						text
					</Button>
				</div>
			</React.Fragment>
		);
	}
}
```
