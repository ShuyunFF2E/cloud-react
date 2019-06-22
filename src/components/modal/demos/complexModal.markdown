---
order: 6
title: 复杂modal
desc: 在modal内容区域使用组件并进行相关操作
---

```javascript
import React from "react";
import Modal from "../index";
import Button from '../../button';

export default class ModalDemo extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
		 	visible: false,
		 	content: ''
		 };
	 }
 
	 // 复杂演示
	 openComplexModal = () => {
	 	this.setState({
	 		visible: true
	 	}, () => {
	 		Modal.modal({
				visible: this.state.visible,
				body: <Complex/>
			});
	 	})
	 };
	
	 render() {
		 return (
			 <div>
				 <Button type="primary" onClick={this.openComplexModal}>复杂演示</Button>
			 </div>
		 );
	 }
}

class Complex extends React.Component{
	handelClick() {
		alert('hello,儿子，恭喜你打开了新世界');
	}
	render(){
		const content = 'Complex将会继承我的遗产';
		return (
			<div>
				<span>hello，我是Complex，是Modal的儿子</span>
				<ComplexSon content={content} childClick={() => this.handelClick()}/>
			</div>
		);	
	}
}

class ComplexSon extends React.Component{
	openNewModal() {
		Modal.modal({
			visible: true
		});
	}
	render(){
		const {childClick} = this.props;
		return (
			<div>
				<Button type="primary" onClick={this.openNewModal}>打开新Modal</Button>
				<br/>
				<span>hello，我是ComplexSon，是Complex的儿子，也是Modal的孙子</span>
				<br/>
				<span>后面这句话是我爸爸传给我的：</span><span>{this.props.content}</span>
				<br/>
				<Button type="primary" onClick={childClick}>点击弹出我爸爸给的函数</Button>
			</div>
		);	
	
	}
}
```
