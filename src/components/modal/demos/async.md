---
order: 4
title: 异步关闭
desc: 点击确定按钮后异步关闭对话框，如提交请求场景
---

```jsx

            /**
             * title: 异步关闭
             * desc: 点击确定按钮后异步关闭对话框，如提交请求场景
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			showConfirmLoading: false
		};
	}

	// 打开弹出框
	openBasicModal = () => {
		this.setState({
			visible: true
		});
	};

	// 确认按钮回调函数
	handleOk = () => {
		this.setState({
			showConfirmLoading: true
		});

		// 两秒之后关闭
		setTimeout(() => {
			this.setState({
				visible: false,
				showConfirmLoading: false
			});
		}, 2000);
	};

	// 取消回调函数
	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.openBasicModal}>
					异步关闭弹出框
				</Button>
				<Modal
					title="异步弹出"
					size="medium"
					visible={this.state.visible}
					clickMaskCanClose={this.state.clickMaskCanClose}
					showConfirmLoading={this.state.showConfirmLoading}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					onClose={this.handleCancel}>
					这是一段弹出窗的内容
				</Modal>
			</div>
		);
	}
}
```
