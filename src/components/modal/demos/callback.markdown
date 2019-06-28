---
order: 2
title: 自定义回调函数
desc: 设置onOk、onClose实现自定义回调函数
---

```javascript
import React from 'react';
import Modal from '../index';
import Button from 'ccms-components-react/button';

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
	 
	 handleClose = () => {
	 	this.setState({
	 		visible: false,
			content: 'it is close callback'
		});
	 };
	 
	
	 render() {
		 return (
			 <div>
				 <Button type='primary' onClick={this.openDefineCallbackModal}>自定义回调函数</Button>
				 <br/>
				 <Modal
				 	visible={this.state.visible}
					onOk={this.handleOk}
					onClose={this.handleClose}>
					this is callback demo
				 </Modal>
				 <br/>
				 <span>{this.state.content}</span>
			 </div>
		 );
	 }
}
```
