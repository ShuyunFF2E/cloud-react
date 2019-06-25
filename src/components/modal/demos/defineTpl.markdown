---
order: 3
title: 自定义模版
desc: 设置header、body、footer实现自定义模版
---

```javascript
import React from 'react';
import Modal from '../index';
import Button from 'ccms-components-react/button';
import Icon from 'ccms-components-react/icon';

export default class ModalDemo extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
		 	visible: false
		 };
	 }
 
 
	 // 打开自定义模版弹出框
	 openDefineTpsModal = () => {
	 	this.setState({
	 		visible: true
	 	});
	 };
	 
	 closeModal = () => {
		this.setState({
			visible: false
		});
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type='primary' onClick={this.openDefineTpsModal}>自定义模版</Button>
				
				 <Modal 
				 	visible={this.state.visible}
				 	header={<Header closeModal={this.closeModal}/>}
				 	footer={<Footer/>}>
				 	<Body/>
				 </Modal>
			 </div>
		 );
	 }
 }
 
class Body extends React.Component{
	 render() {
		 return (
			 <div>
				 自定义body组件
			 </div>
		 );
	 }
}
class Header extends React.Component{
	 render() {
	 	const { closeModal } = this.props;
		 return (
			 <div>
				 自定义header组件
				 <Icon type='x' className='close-icon' onClick={closeModal}></Icon>
			 </div>
		 );
	 }
}
class Footer extends React.Component{
	 render() {
		 return (
			 <div>
				 自定义footer组件
			 </div>
		 );
	 }
}
```
