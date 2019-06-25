---
order: 7
title: info信息提示
desc: 弹出一个信息提示框
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
	 openInfoModal = () => {
		this.setState({
			visible: true
		}, () => {
			Modal.info({
				visible: this.state.visible,
				body: 'something you can write here'
			});
		})
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type="primary" onClick={this.openInfoModal}>信息提示弹出框</Button>
			 </div>
		 );
	 }
}
```
