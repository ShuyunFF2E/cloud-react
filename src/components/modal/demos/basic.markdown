---
order: 1
title: 基础用法
desc: 使用modal打开基本对话框，点击遮罩区域关闭对话框
---

```javascript
import React from 'react';
import Modal from '../index';
import Button from 'ccms-components-react/button';
const blank = '\u00A0';

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
	 		visible: true,
	 		showMask: true
	 	});
	 };
	 
	 // 打开可在遮罩区域关闭的弹出框 
	 openMaskCloseModal = () => {
	 	this.setState({
		 	visible: true,
		 	showMask: true,
		 	clickMaskCanClose: true
	 	});
	 };
	 
	 // 打开无遮罩层对话框
	 openHideMaskModal = () => {
	 	this.setState({
			visible: true,
			showMask: false
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
	 
	 
	 render() {
		 return (
			 <div>
				 <Button type='primary' onClick={this.openBasicModal}>基本弹出框</Button>
				 {blank}
				 <Button type='normal' onClick={this.openMaskCloseModal}>点击遮罩区域关闭对话框</Button>
				 {blank}
				 <Button type='normal' onClick={this.openHideMaskModal}>不显示遮罩层</Button>
				 <Modal 
				 	title='basic title'
				 	visible={this.state.visible}
				 	showMask={this.state.showMask}
				 	clickMaskCanClose={this.state.clickMaskCanClose}
				 	onOk={this.handleOk}
				 	onCancel={this.handleCancel}
				 	onClose={this.handleClose}>
				 	hello, this is a body content
				 </Modal>
			 </div>
		 );
	 }
 }
```
