---
order: 10
title: 自定义样式
desc: 使用style属性自定义modal组件样式
---

```javascript
import React from 'react';
import { Button, Modal, Message } from 'cloud-react';

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

		 return (
			 <div>
				 <Button type='primary' onClick={this.openBasicModal}>自定义样式弹出框</Button>
				 <Modal
				 	title='basic title'
				 	bodyStyle={bodyStyle}
                    modalStyle={modalStyle}
				 	visible={this.state.visible}
				 	onOk={this.handleOk}
				 	onCancel={this.handleOk}
				 	onClose={this.handleOk}>
				 	this is a long content, this is a long content, this is a long content, this is a long content, this is a long content, this is a long content, this is a long content, this is a long content, this is a long content
				 </Modal>
			 </div>
		 );
	 }
}
```
