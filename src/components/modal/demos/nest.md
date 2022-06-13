---
order: 9
title: 嵌套弹窗
desc: 弹出一个提示框，在其内部再弹出一个提示框
---

```jsx

            /**
             * title: 嵌套弹窗
             * desc: 弹出一个提示框，在其内部再弹出一个提示框
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';

const blank = '\u00A0';

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
			visible: false
		};
	}

	// 弹出框
	openNestModal = () => {
		this.setState({
			visible: true
		});
	};

	// 确认按钮回调函数
	handleOk = () => {
		this.setState({
			visible: false
		});
	};

	// 关闭回调函数
	handleClose = () => {
		this.setState({
			visible: false
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	openErrorModal = () => {};

	render() {
		return (
			<div>
				<Button type="normal" onClick={this.openNestModal}>
					打开嵌套弹出框
				</Button>
				<Modal
					showType={this.showType}
					title="basic title"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					onClose={this.handleClose}>
					<SecondModal showType={this.showType} />
				</Modal>
			</div>
		);
	}
}

class SecondModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}
	openInfoModal = () => {
		this.setState({
			visible: true
		});
	};

	// 关闭回调函数
	handleClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		return (
			<div>
				<Button type="normal" onClick={this.openInfoModal}>
					信息提示弹出框
				</Button>
				<Modal hasFooter={false} showType={this.props.showType} title="basic title111" visible={this.state.visible} onClose={this.handleClose}>
					<ConfirmModal showType={this.props.showType} />
				</Modal>
			</div>
		);
	}
}

class ConfirmModal extends React.Component {
	openInfoModal = () => {
		Modal.info({
			showType: this.props.showType,
			body: 'something you can write here',
			onCancel: () => {}
		});
	};

	render() {
		return (
			<Button type="normal" onClick={this.openInfoModal}>
				信息提示弹出框
			</Button>
		);
	}
}
```
