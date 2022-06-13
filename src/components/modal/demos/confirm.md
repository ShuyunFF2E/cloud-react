---
order: 6
title: 确认对话框
desc: 使用confirm快捷弹出确认对话框
---

```jsx

            /**
             * title: 确认对话框
             * desc: 使用confirm快捷弹出确认对话框
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
			content: ''
		};
	}

	handleOk = () => {
		this.setState({
			content: 'it is ok'
		});
	};

	openConfirmModal = () => {
		Modal.confirm({
			showType: this.showType,
			isShowIcon: false,
			body: 'something you can write here',
			onOk: () => {
				this.handleOk();
			},
			onCancel: () => {
				this.setState({
					content: 'it is cancel'
				});
			}
		});
	};

	openCustomConfirmModal = () => {
		Modal.confirm({
			showType: this.showType,
			okText: '好',
			cancelText: '关闭',
			body: '按钮的文案修改了'
		});
	}

	// 打开确认弹出框
	openAsyncConfirmModal = () => {
		Modal.confirm({
			showType: this.showType,
			body: 'this is a async demo，do you want to test it ？ if you want, please click the button',
			onOk: () => {
				return new Promise((resolve, reject) => {
					setTimeout(Math.random() > 0.5 ? resolve : reject, 2000);
				}).catch(() => {
					console.log('error');
				});
			},
			onCancel: () => {
				this.setState({
					content: 'it is cancel'
				});
			}
		});
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.openConfirmModal}>
					确认对话框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openAsyncConfirmModal}>
					异步确认对话框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openCustomConfirmModal}>
					修改按钮文案
				</Button>
				{blank}
				<br />
				<br />
				{this.state.content}
			</div>
		);
	}
}
```
