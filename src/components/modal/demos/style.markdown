---
order: 10
title: 自定义样式
desc: 使用style属性自定义modal组件样式
---

```javascript
import React from 'react';
import { Button, Modal } from 'cloud-react';

export default class ModalDemo extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
		 	visible: false
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
			visible: false
		});
	 };

	 render() {
	 	const defineStyle = {
	 		width: '600px',
	 		height: '500px',
	 		fontSize: '20px',
	 		color: 'green'
	 	};
		 return (
			 <div>
				 <Button type='primary' onClick={this.openBasicModal}>自定义样式弹出框</Button>
				 <Modal
				 	title='basic title'
				 	style={defineStyle}
				 	visible={this.state.visible}
				 	onOk={this.handleOk}
				 	onCancel={this.handleOk}
				 	onClose={this.handleOk}>
				 	hello, this is a body content
				 </Modal>
			 </div>
		 );
	 }
}
```
