---
order: 6
title: 确认对话框
desc: 使用confirm快捷弹出确认对话框
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
		 	content: ''
		 };
	 }
	 
	 handleOk = () =>  {
	 	this.setState({
	 		content: 'it is ok'
	 	});
	 };
	 
	 openConfirmModal = () => {
	 	Modal.confirm({
			title: 'Do you want to delete it ?',
			body: 'something you can write here',
			onOk: () => {
				this.handleOk();
			},
			onCancel: () => {
				this.setState({
					content: 'it is cancel'
				});
			}
		});
	 };
	 
	 // 打开确认弹出框
	 openAsyncConfirmModal = () => {
	 	Modal.confirm({
			title: 'Do you want to delete it ?',
			body: 'this is a async confirm demo',
			onOk: () => {
				let promise = new Promise((resolve, reject) => {
						setTimeout(Math.random() > 0.5 ? resolve : reject, 2000);
					}).catch(() => {
						console.log('error');
					});
				return promise;
			},
			onCancel: () => {
				this.setState({
					content: 'it is cancel'
				});
			}
		});
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type='primary' onClick={this.openConfirmModal}>确认对话框</Button>
				 {blank}
				 <Button type='normal' onClick={this.openAsyncConfirmModal}>异步确认对话框</Button>
				 <br/>
				 <br/>
				 {this.state.content}
			 </div>
		 );
	 }
}
```
