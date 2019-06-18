---
title: 使用方法
desc: 示例demo
---

```javascript
import React from 'react';
import Modal from 'ccms-components-react/modal';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			title: '标题',
			hasFooter: true,
			header: '',
			style: {},
			footer: '',
			uid: '',
			isConfirm: '',
			body: '<p>hello world</p>'
		};
		
		this.openModal = this.openModal.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.openConfirm = this.openConfirm.bind(this);
		this.openNestingModal = this.openNestingModal.bind(this);
		this.openDefinedTpl = this.openDefinedTpl.bind(this);
		this.openDefineStyleModal = this.openDefineStyleModal.bind(this);
	}

	// 打开普通modal
	openModal() {
		this.setState({
			visible: true,
			isConfirm: false
		})
	}
	
	// 打开confirm
	openConfirm() {
		this.setState({
			visible: true,
			isConfirm: true,
			body: '是否确认关闭？'
		})
	}
	
	// 打开嵌套modal
	openNestingModal() {
		this.setState({
			visible: true,
			isConfirm: false,
			body: <Test/>
		});
	}
	
	// 自定义模版modal
	openDefinedTpl() {
		this.setState({
			visible: true,
			body: '这是个可以自定义的模版',
			footer: '这里是自定义的底部',
			header: '这里自定义的是顶部'
		})
	}
	
	// 自定义modal内容区域样式
	openDefineStyleModal() {
		this.setState({
        	visible: true,
        	style: {
        		width: '300px',
        		height: '400px'
        	}
		});
	}
	
	onClose() {
		this.setState({
			visible: false
		});
		console.log('执行关闭后的回调');
	}
	
	onOk() {
		this.setState({
        	visible: false
		});
		console.log('执行确认后的回调');
	}
	
	onCancel() {
		this.setState({
			visible: false
		});
		console.log('执行取消后的回调');
	}
	
	render() {
		return (
			<div>
				<button onClick={this.openConfirm} style={{marginRight: '10px'}}>二次确认Confirm</button>
				
				<button onClick={this.openModal} style={{marginRight: '10px'}}>普通Modal</button>
				
				<button onClick={this.openNestingModal} style={{marginRight: '10px'}}>嵌套Modal</button>
				
				<button onClick={this.openDefinedTpl} style={{marginRight: '10px'}}>模版Modal</button>
				
				<button onClick={this.openDefineStyleModal}>自定义样式Modal</button>
				
				<Modal
					  visible={this.state.visible}
					  title={this.state.title}
					  isConfirm={this.state.isConfirm}
					  uid={this.state.uid}
					  body={this.state.body}
					  footer={this.state.footer}
					  header={this.state.header}
					  hasFooter={this.state.hasFooter}
					  style={this.state.style}
					  onOk={this.onOk}
					  onCancel={this.onCancel}
					  onClose={this.onClose}/>
			</div>
		);
	}
};

class Test extends React.Component {
	render() {
		return (
			<p>这是一个传递到Modal的test组件</p>
		);
	}
}
```
