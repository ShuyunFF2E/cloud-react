---
title: 自定义回调函数
desc: 设置onOk、onCancel、onClose实现自定义回调函数
---

```javascript
import React from "react";
import Modal from "../index";
import Button from '../../button';
const blank = '\u00A0';

export default class ModalDemo extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
		 	visible: false,
		 	content: ''
		 };
	 }
 
	 // 自定义确认回调函数
	 openDefineOkModal = () => {
	 	this.setState({
	 		visible: true
	 	}, () => {
	 		Modal.modal({
				visible: this.state.visible,
				onOk: () => {
					this.setState({
						content: 'it is ok callback'
					})
				}
			});
	 	})
	 };
	 
	 // 自定义取消回调函数
	 openDefineCancelModal = () => {
		this.setState({
			visible: true
		}, () => {
			Modal.modal({
				visible: this.state.visible,
				onCancel: () => {
					this.setState({
						content: 'it is cancel callback'
					})
				}
			});
		})
	 };
	 // 自定义关闭回调函数
	 openDefineCloseModal = () => {
		this.setState({
			visible: true
		}, () => {
			Modal.modal({
				visible: this.state.visible,
				onClose: () => {
					this.setState({
						content: 'it is close callback'
					})
				}
			});
		})
	 };
	
	 render() {
		 return (
			 <div>
				 <Button type="primary" onClick={this.openDefineOkModal}>自定义确认回调函数</Button>
				 {blank}
				 <Button type="primary" onClick={this.openDefineCancelModal}>自定义取消回调函数</Button>
				 {blank}
				 <Button type="primary" onClick={this.openDefineCloseModal}>自定义关闭回调函数</Button>
				 <br/>
				 <div>{this.state.content}</div>
			 </div>
		 );
	 }
}
```
