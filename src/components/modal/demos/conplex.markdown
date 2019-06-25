---
order: 6
title: 组件内外数据传输
desc: 使用Modal实现复杂逻辑交互
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
 
 
	 // 复杂演示
	 openComplexModal = () => {
	 	const name = 'I come from outside';
	 	this.setState({
	 		visible: true
	 	}, () => {
	 		Modal.modal({
				visible: this.state.visible,
				body: <Body content={name} defineEvent={this.openModal}/>
			});
	 	})
	 };
 
	 openModal = () => {
	 	alert('hello， 我是组件传入的事件');
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type="primary" onClick={this.openComplexModal}>复杂演示</Button>
			 </div>
		 );
	 }
 }
 
 class Body extends React.Component{
	 render() {
	 	const { content, defineEvent } = this.props;
		 return (
			 <div>
				<span>Body content</span>				
				<br/>
				<br/>
				<span>{content}</span>
				<br/>
				<br/>
				<Button type="primary" onClick={defineEvent}>触发外部传入的事件</Button>
			 </div>
		 );
	 }
}
```
