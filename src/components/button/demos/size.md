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

class ButtonDemo extends React.Component {
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
				</div>
			</React.Fragment>
		);
	}
}
export default ButtonDemo
```
