---
order: 5
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
import getQueryString from './query.js';

class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.showType = getQueryString('showType') || 'top';
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
					title="basic title"
					showType={this.showType}
					visible={this.state.visible}
					clickMaskCanClose={this.state.clickMaskCanClose}
					showConfirmLoading={this.state.showConfirmLoading}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					onClose={this.handleCancel}>
					hello, this is a body content
				</Modal>
			</div>
		);
	}
}
export default ModalDemo
```
