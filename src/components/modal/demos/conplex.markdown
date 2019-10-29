---
order: 7
title: 组件内外数据传输
desc: 使用modal实现复杂逻辑交互
---

```javascript
import React from 'react';
import Modal from '../index';
import Button from 'cloud-react/button';

export default class ModalDemo extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
		 	visible: false,
		 	content: 'hello world, I come from outside'
		 };
	 }


	 // 复杂演示
	 openComplexModal = () => {
	 	this.setState({
	 		visible: true
	 	});
	 };

	 handleClick = () => {
	 	alert('hello，how are you ?');
	 };

	 handleOk = () => {
		this.setState({
			visible: false
		});
	 };

	 handleCancel = () => {
		this.setState({
			visible: false
		});
	 };

	 render() {
		 return (
			 <div>
				 <Button type='primary' onClick={this.openComplexModal}>复杂演示</Button>
				 <Modal
				 	visible={this.state.visible}
				 	onOk={this.handleOk}
				 	onClose={this.handleCancel}
				 	onCancel={this.handleCancel}>
				 	this is a complex demo,you can click it
				 	<br/>
				 	<br/>
				 	<Button onClick={this.handleClick}>click me</Button>
				 	<br/>
				 	<br/>
				 	<Body content={this.state.content} defineEvent={this.handleClick}/>
				 </Modal>
			 </div>
		 );
	 }
 }

 class Body extends React.Component{
	 render() {
	 	const { content, defineEvent } = this.props;
		 return (
			 <div>
				<span>{content}</span>
				<br/>
				<br/>
				<Button type='primary' onClick={defineEvent}>click me（from outside）</Button>
			 </div>
		 );
	 }
}
```
