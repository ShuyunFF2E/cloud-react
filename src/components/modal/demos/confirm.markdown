---
order: 6
title: 确认对话框
desc: 使用confirm快捷弹出确认对话框
---

```javascript
import React from 'react';
import Modal from '../index';
import Button from 'ccms-components-react/button';

export default class ModalDemo extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
		 	content: ''
		 };
	 }
 
 
	 // 打开确认弹出框
	 openConfirmModal = () => {
	 	Modal.confirm({
			title: 'Do you want to delete it ?',
			body: 'something you can write here',
			onOk: () => {
				this.setState({
					content: 'it is ok'
				});
			},
			onClose: () => {
				this.setState({
					content: 'it is close'
				});
			}
		});
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type='primary' onClick={this.openConfirmModal}>确认对话框</Button>
				 <br/>
				 <br/>
				 {this.state.content}
			 </div>
		 );
	 }
}
```
