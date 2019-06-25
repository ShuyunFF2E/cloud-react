---
order: 5
title: 确认对话框
desc: 使用confirm快捷弹出确认对话框
---


```javascript
import React from "react";
import Modal from "../index";
import Button from '../../button';
export default class ModalDemo extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
		 	visible: false
		 };
	 }
 
 
	 // 默认弹出框
	 openConfirmModal = () => {
	 	this.setState({
	 		visible: true
	 	}, () => {
	 		Modal.confirm({
				visible: this.state.visible,
				message: 'Do you want to delete it ?',
				body: 'something you can write here'
			});
	 	})
	 };
	
	 render() {
		 return (
			 <div>
				 <Button type="primary" onClick={this.openConfirmModal}>确认对话框</Button>
			 </div>
		 );
	 }
}
```
