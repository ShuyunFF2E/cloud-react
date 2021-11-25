---
order: 3
title: 禁用数字输入框
desc: 添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。
---

```jsx

            /**
             * title: 禁用数字输入框
             * desc: 添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。
             */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

export default class InputNumberDemo extends React.Component {
	state = {
		disabled: false
	};
	toggle = () => {
		this.setState({
			disabled: !this.state.disabled
		});
	};
	render() {
		return (
			<React.Fragment>
				<div>
					<InputNumber disabled={this.state.disabled} />
					<br />
					<br />
					<Button type="primary" onClick={this.toggle}>
						Toggle disabled
					</Button>
				</div>
			</React.Fragment>
		);
	}
}
```
