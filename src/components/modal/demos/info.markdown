---
order: 7
title: 信息提示
desc: 弹出一个信息提示框
---

```javascript
import React from 'react';
import Modal from '../index';
import Button from 'ccms-components-react/button';
const blank = '\u00A0';

export default class ModalDemo extends React.Component {
	 constructor(props) {
		 super(props);
	 }
	 
	 // 默认弹出框
	 openInfoModal = () => {
		Modal.info({
			title: 'this is a info message!',
			body: 'something you can write here',
			onCancel: () => {}
		});
	 };
	 
	 openSuccessModal = () => {
		Modal.success({
			title: 'this is a success message!',
			body: 'something you can write here',
			onCancel: () => {}
		});
	 };
	 
	 openWarningModal = () => {
		Modal.warning({
			title: 'this is a warning message!',
			body: 'something you can write here',
			onCancel: () => {}
		});
	 };
	 
	 openErrorModal = () => {
		Modal.error({
			title: 'this is a error message!',
			body: 'something you can write here',
			onCancel: () => {}
		});
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type='normal' onClick={this.openInfoModal}>信息提示弹出框</Button>
				 {blank}
				 <Button type='normal' onClick={this.openSuccessModal}>成功提示弹出框</Button>
				 {blank}
				 <Button type='normal' onClick={this.openErrorModal}>错误提示弹出框</Button>
				 {blank}
				 <Button type='normal' onClick={this.openWarningModal}>警告提示弹出框</Button>
			 </div>
		 );
	 }
}
```
