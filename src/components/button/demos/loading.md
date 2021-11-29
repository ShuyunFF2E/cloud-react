---
order: 6
title: loading状态控制
desc: 按钮点击添加loading
---

```jsx

            /**
             * title: loading状态控制
             * desc: 按钮点击添加loading
             */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};
	}

	handlerCLick = () => {
		this.setState(prevState => {
			return {
				loading: !prevState.loading
			};
		});
	};

	render() {
		return (
			<Button type="primary" loading={this.state.loading} onClick={this.handlerCLick}>
				确定
			</Button>
		);
	}
}
```
