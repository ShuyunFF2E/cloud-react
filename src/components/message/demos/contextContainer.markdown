---
title: 自定义Message上下文容器
desc: '指定 message 挂载的 HTML 节点'
---

````javascript
import React, { Component } from 'react';
import message from 'cloud-react/message';
import Button from 'cloud-react/button';
import Modal from 'cloud-react/modal';

export default class MessageDemo extends Component {

	 constructor(props) {
		 super(props);
		 this.state = {
		 	visible: false,
		 	hasFooter: false
		 };
	 }
	 
    onOpenModal = () => {
    	this.setState({
    		visible: true,
    		showMask: true
    	})
    };
    
	handleClose = () => {
	 	this.setState({
    		visible: false,
    		showMask: false
    	})
	};
	onShowSuccess = () => {
		message.success('更改成功', { duration: 0, contextContainer: document.getElementsByClassName('modal-body')[0]});
	};

    render() {
        return (
            <div className="app-contain">
                <Button type="normal" onClick={this.onOpenModal}>show modal message</Button>
                
	            <Modal
				    title='Message'
				    visible={this.state.visible}
				    showMask={this.state.showMask}
				    hasFooter={this.state.hasFooter}
				    onOk={this.handleOk}
				    onClose={this.handleClose}>
				    <div>
				     	<Button type="normal" onClick={this.onShowSuccess}>show success</Button>
					</div>
				</Modal>
            </div>
        )
    }
}

````

````less
.modal-container {
	width: 500px;
	.modal-body {
		height: 200px;
	}
}

````
