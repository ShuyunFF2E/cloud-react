---
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
				body: 'Do you want to delete it ?'
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
