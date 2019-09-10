---
order: 5
title: block 按钮
desc: block 属性将使按钮适合其父宽度。
---

````javascript
import React from 'react';
import Button from 'cloud-react/button';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	render() {
		return (
			<>
				<div>
					<Button block type="primary">primary</Button>
					{blank}
					<Button block type="normal">normal</Button>
					{blank}
					<Button block type="dashed">dashed</Button>
					{blank}
					<Button block type="link">link</Button>
				</div>
			</>
		);
	}
}
````
