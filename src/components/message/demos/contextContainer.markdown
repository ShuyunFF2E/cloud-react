---
title: 自定义Message上下文容器
desc: 指定 message 挂载的 HTML 节点
---

````javascript
import React, { Component } from 'react';
import { Button, Message, Modal } from 'cloud-react';

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
		Message.success('更改成功', { duration: 0, contextContainer: document.getElementsByClassName('cloud-modal-body')[0]});
	};

    render() {
        return (
            <div className="app-contain">
                <Button type="normal" onClick={this.onOpenModal}>show modal message</Button>

	            <Modal
					title='Message'
					bodyStyle={{height: '100px'}}
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
