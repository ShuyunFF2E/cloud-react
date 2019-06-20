---
title: 底部区域自定义
desc: 使用hasFooter控制底部按钮区域显示/隐藏
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
		 	visible: false
		 };
	 }
	 
	 // 默认弹出框
	 openHasFooterTrueModal = () => {
		this.setState({
			visible: true
		}, () => {
			Modal.modal({
				visible: this.state.visible,
				hasFooter: true
			});
		})
	 };
     	 
	 // 默认弹出框
	 openHasFooterFalseModal = () => {
		this.setState({
			visible: true
		}, () => {
			Modal.modal({
				visible: this.state.visible,
				hasFooter: false
			});
		})
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type="primary" onClick={this.openHasFooterTrueModal}>显示底部区域弹出框</Button>
				 {blank}
				 <Button type="primary" onClick={this.openHasFooterFalseModal}>隐藏底部区域弹出框</Button>
			 </div>
		 );
	 }
}
```
