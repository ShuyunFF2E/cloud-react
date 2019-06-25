---
order: 1
title: 基础用法
desc: 使用modal打开基本对话框
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
	 openBasicModal = () => {
	 	this.setState({
	 		visible: true
	 	}, () => {
	 		Modal.modal({
				visible: this.state.visible,
			});
	 	})
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type="primary" onClick={this.openBasicModal}>基本弹出框</Button>
			 </div>
		 );
	 }
 }
```
