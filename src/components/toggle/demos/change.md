---
order: 4
title: onBeforeChange函数使用
desc: 在状态改变前调用
---

```jsx

            /**
             * title: onBeforeChange函数使用
             * desc: 在状态改变前调用
             */
import React from 'react';
import { Modal, Toggle } from 'cloud-react';

class ToggleDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: true
		};
	}

	handleBeforeChange = () => {
		Modal.confirm({
			body: '确定切换吗？',
			onOk: () => {
				this.setState(prevState => ({ checked: !prevState.checked }));
			}
		});
	};

	render() {
		const { checked } = this.state;

		return <Toggle checkedText="on" unCheckedText="off" checked={checked} onBeforeChange={this.handleBeforeChange} />;
	}
}
export default ToggleDemo
```
