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
			size: 'default'
		};
	}

	onChangeSize(size) {
		this.setState({ size });
	}

	render() {
		const { size } = this.state;

		return (
			<React.Fragment>
				<h4>切换尺寸</h4>
				<div style={{ marginBottom: 10 }}>
					<Button onClick={() => this.onChangeSize('large')}>大尺寸</Button>
					{blank}
					<Button onClick={() => this.onChangeSize('default')}>中尺寸</Button>
					{blank}
					<Button onClick={() => this.onChangeSize('small')}>小尺寸</Button>
					{blank}
					<Button type="link" disabled>
						current: {size}
					</Button>
				</div>

				<h4>无图标</h4>
				<div>
					<Button type="normal" size={size}>普通</Button>
					{blank}
					<Button type="primary" size={size}>主要</Button>
					{blank}
					<Button type="secondary" size={size}>次要</Button>
					{blank}
					<Button type="dashed" size={size}>幽灵</Button>
					{blank}
					<Button type="link" size={size}>链接</Button>
					{blank}
					<Button type="text" size={size}>文字</Button>
				</div>
				<div>
					<h4>有图标</h4>
					<Button type="normal" icon="plus-solid" size={size}>普通</Button>
					{blank}
					<Button type="primary" icon="plus-solid" size={size}>主要</Button>
					{blank}
					<Button type="secondary" icon="plus-solid" size={size}>次要</Button>
					{blank}
					<Button type="dashed" icon="plus-solid" size={size}>幽灵</Button>
					{blank}
					<Button type="link" icon="plus-solid" size={size}>链接</Button>
					{blank}
					<Button type="text" icon="plus-solid" size={size}>文字</Button>
				</div>
			</React.Fragment>
		);
	}
}
export default ButtonDemo;
```
