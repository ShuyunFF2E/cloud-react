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
			show: false,
			title: '标题',
			zIndex: 1000
		};
		
		this.openModal = this.openModal.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	openModal() {
		this.setState({
			show: true
		})
	}
	
	onOk() {
		this.setState({
        	show: false
		})
	}
	
	onCancel() {
		this.setState({
			show: false
		})
	}
	
	render() {
		return (
			<div>
				<button onClick={this.openModal}>点击</button>
				<Modal
				  show={this.state.show}
				  title="测试"
				  onOk={this.onOk}
                  onCancel={this.onCancel}
				/>
			</div>
		);
	}
}
```
