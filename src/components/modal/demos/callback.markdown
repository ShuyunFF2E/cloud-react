---
order: 2
title: 自定义回调函数
desc: 设置onOk、onCancel、onClose实现自定义回调函数
---

```javascript
import React from 'react';
import { Button, Modal } from 'cloud-react';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			content: ''
		};
	}

	// 自定义回调函数
	openDefineCallbackModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = () => {
		this.setState({
			visible: false,
			content: 'it is ok callback'
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false,
			content: 'it is cancel callback'
		});
	};

	handleClose = () => {
		this.setState({
			visible: false,
			content: 'it is close callback'
		});
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.openDefineCallbackModal}>
					自定义回调函数
				</Button>
				<br />
				<Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} onClose={this.handleClose}>
					this is callback demo
				</Modal>
				<br />
				<span>{this.state.content}</span>
			</div>
		);
	}
}
```
