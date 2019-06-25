---
order: 5
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
	 }
 
 
	 // 打开确认弹出框
	 openConfirmModal = () => {
	 	Modal.confirm({
			message: 'Do you want to delete it ?',
			body: 'something you can write here',
			onOk() {
				alert('it is ok');
			},
			onClose() {
				alert('it is close')
			}
		});
	 };
	
	 render() {
		 return (
			 <div>
				 <Button type='primary' onClick={this.openConfirmModal}>确认对话框</Button>
			 </div>
		 );
	 }
}
```
