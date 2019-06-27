---
order: 1
title: 基础用法
desc: 使用modal打开基本对话框
---

```javascript
import React from 'react';
import Modal from '../index';
import Button from 'ccms-components-react/button';
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
	 
	 // 关闭回调函数
	 handleClose = () => {
		this.setState({
			visible: false
		});
	 };
	 
	 
	 render() {
		 return (
			 <div>
				 <Button type='primary' onClick={this.openBasicModal}>基本弹出框</Button>
				 <Modal 
				 	title='basic title'
				 	visible={this.state.visible}
				 	onOk={this.handleOk}
				 	onClose={this.handleClose}>
				 	hello,this is a body
				 </Modal>
			 </div>
		 );
	 }
 }
```
