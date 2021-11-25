---
order: 13
title: 方法打开弹框
desc: 使用createModal方法创建一个弹出框，open方法打开
---

```jsx

            /**
             * title: 方法打开弹框
             * desc: 使用createModal方法创建一个弹出框，open方法打开
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';

export default class ModalDemo extends React.Component {
	// 弹出框
	openNestModal = () => {
		Modal.createModal(SecondModal)
			.open({ ID: 111 })
			.then(res => {
				console.log(res);
			});
	};

	render() {
		return (
			<div>
				<Button type="normal" onClick={this.openNestModal}>
					打开弹出框
				</Button>
			</div>
		);
	}
}

class SecondModal extends React.Component {
	// 确认按钮回调函数
	handleOk = () => {
		Modal.confirm({
			body: '即将打开一个内部嵌套的modal，是否打开？',
			onOk: () => {
				new Promise(resolve => {
					resolve('success');
				}).then(res => {
					Modal.createModal(modalEntity)
						.open()
						.then(res => {
							this.props.onOk(res);
						});
				});
			}
		});
	};

	// 关闭回调函数
	handleClose = () => {
		this.props.onClose();
	};

	render() {
		const attr = {
			title: '打开一个jsx组件',
			okText: '打开',
			className: 'test'
		};
		return (
			<Modal visible {...attr} onOk={this.handleOk} onClose={this.handleClose} onCancel={this.handleClose}>
				这是一个通过createModal方法创建的modal，接受字符串、html、JSX
			</Modal>
		);
	}
}

function modalEntity(props) {
	const handleOk = () => {
		props.onOk('你关闭了一个函数式组件');
	};
	return (
		<Modal visible title="打开一个嵌套的函数组件" onOk={handleOk}>
			这是内部嵌套的一个modal，高级组件
		</Modal>
	);
}
```
