---
order: 2
title: 按钮尺寸
desc: 按钮三种尺寸：large、default、small
---

```jsx

            /**
             * title: 按钮尺寸
             * desc: 按钮三种尺寸：large、default、small
             */
import React from 'react';
import { Button } from 'cloud-react';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			size: 'large'
		};
	}

	onChangeSize(size) {
		this.setState({ size });
	}

	render() {
		const { size } = this.state;

		return (
			<React.Fragment>
				<div style={{ marginBottom: 10 }}>
					<Button onClick={this.onChangeSize.bind(this, 'large')}>large</Button>
					{blank}
					<Button onClick={this.onChangeSize.bind(this, 'default')}>default</Button>
					{blank}
					<Button onClick={this.onChangeSize.bind(this, 'small')}>small</Button>
					{blank}
					<Button type="link" disabled>
						current: {size}
					</Button>
				</div>

				<div>
					<h4>无图标</h4>
					<Button type="primary" size={size}>
						primary
					</Button>
					{blank}
					<Button type="normal" size={size}>
						normal
					</Button>
					{blank}
					<Button type="dashed" size={size}>
						dashed
					</Button>
					{blank}
					<Button type="link" size={size}>
						link
					</Button>
					{blank}
					<Button type="text" size={size}>
						text
					</Button>
				</div>
				<div>
					<h4>有图标</h4>
					<Button type="primary" icon="plus-solid" size={size}>
						primary
					</Button>
					{blank}
					<Button type="normal" icon="plus-solid" size={size}>
						normal
					</Button>
					{blank}
					<Button type="dashed" icon="plus-solid" size={size}>
						dashed
					</Button>
					{blank}
					<Button type="link" icon="plus-solid" size={size}>
						link
					</Button>
					{blank}
					<Button type="text" icon="plus-solid" size={size}>
						text
					</Button>
				</div>
			</React.Fragment>
		);
	}
}
```
