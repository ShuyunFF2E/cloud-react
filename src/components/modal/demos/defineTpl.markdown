---
order: 3
title: 自定义模版
desc: 设置header、body、footer实现自定义模版
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
 
 
	 // 自定义Header
	 openDefineHeaderModal = () => {
	 	this.setState({
	 		visible: true
	 	}, () => {
	 		Modal.modal({
				visible: this.state.visible,
				header: <Header/>
			});
	 	})
	 };
 
	 // 自定义Body
	 openDefineBodyModal = () => {
		 this.setState({
			visible: true
		}, () => {
			Modal.modal({
				visible: this.state.visible,
				body: <Body/>
			});
		});
	 };
 
	 // 自定义Footer
	 openDefineFooterModal = () => {
  		this.setState({
			visible: true
		}, () => {
			Modal.modal({
				visible: this.state.visible,
				footer: <Footer/>
			});
		});
	 };
	 
	 render() {
		 return (
			 <div>
				 <Button type="primary" onClick={this.openDefineHeaderModal}>自定义Header</Button>
				 {blank}
				 <Button type="primary" onClick={this.openDefineBodyModal}>自定义Body</Button>
				 {blank}
				 <Button type="primary" onClick={this.openDefineFooterModal}>自定义Footer</Button>
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
		 return (
			 <div>
				 自定义header组件
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
