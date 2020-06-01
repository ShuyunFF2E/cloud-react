---
order: 13
title: 方法打开弹框
desc: 使用createModal方法创建一个弹出框，open方法打开
---

```javascript
import React from 'react';
import { Button, Modal } from 'cloud-react';

export default class ModalDemo extends React.Component {
	// 弹出框
	openNestModal = () => {
		const modalStyle = {
			width: '600px'
		};
		const bodyStyle = {
			width: 'auto',
			fontSize: '20px',
			color: 'green',
			height: '100px',
			overflow: 'auto'
		};
		const attr = {
			title: '方法打开',
			bodyStyle: bodyStyle,
			className: 'test',
			modalStyle: modalStyle
		};

		Modal.createModal({ body: <SecondModal />, attributes: attr })
			.open()
			.then(res => {
				console.log(res);
			});
	};

	// 确认按钮回调函数
	handleOk = () => {
		console.log('it is ok');
	};

	// 关闭回调函数
	handleClose = () => {
		console.log('it is close');
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
	render() {
		return <div>这是一个通过createModal方法创建的modal，接受字符串、html、JSX</div>;
	}
}
```
