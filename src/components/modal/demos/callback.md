---
order: 2
title: 自定义回调函数
desc: 设置onOk、onCancel、onClose实现自定义回调函数
---

```jsx

            /**
             * title: 自定义回调函数
             * desc: 设置onOk、onCancel、onClose实现自定义回调函数
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.showType = getQueryString('showType') || 'top';
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
				<Modal 
					showType={this.showType}
					visible={this.state.visible}
					onOk={this.handleOk} 
					onCancel={this.handleCancel} 
					onClose={this.handleClose}>
					this is callback demo
				</Modal>
				<br />
				<span>{this.state.content}</span>
			</div>
		);
	}
}
```
