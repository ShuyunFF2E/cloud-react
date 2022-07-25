---
order: 13
title: 自定义样式
desc: 使用style属性自定义modal组件样式，禁用确定按钮
---

```jsx

            /**
             * title: 自定义样式
             * desc: 使用style属性自定义modal组件样式，禁用确定按钮
             */
import React from 'react';
import { Button, Modal, Message } from 'cloud-react';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	// 打开弹出框
	openBasicModal = () => {
		this.setState({
			visible: true
		});
	};

	// 确认按钮回调函数
	handleOk = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const modalStyle = {
			width: '600px'
		};
		const headerStyle = {
			background: 'linear-gradient(to right, #feac5e,#c779d0,#4bc0c8)',
			borderColor: '#af7e7e'
		};
		const bodyStyle = {
			width: 'auto',
			fontSize: '20px',
			color: '#bd5b21',
			height: '100px',
			background: 'linear-gradient(to top left, rgb(211 178 149), rgb(191, 230, 186), rgb(209 198 199), rgb(191, 230, 186))',
			overflow: 'auto'
		};
		const footerStyle = {
			background: 'linear-gradient(to right, #d3959b,#cdb275)',
			borderColor: '#af7e7e'
		};

		return (
			<div>
				<Button type="normal" onClick={this.openBasicModal}>
					自定义样式弹出框
				</Button>
				<Modal
					title="自定义样式弹窗"
					size="medium"
					headerStyle={headerStyle}
					bodyStyle={bodyStyle}
					footerStyle={footerStyle}
					className="test"
					modalStyle={modalStyle}
					disabledOk={true}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleOk}
					onClose={this.handleOk}>
            从明天起，做一个幸福的人<br />
            喂马，劈柴，周游世界<br />
            从明天起，关心粮食和蔬菜<br />
            我有一所房子，面朝大海，春暖花开<br />
            
            从明天起，和每一个亲人通信<br />
            告诉他们我的幸福<br />
            那幸福的闪电告诉我的<br />
            我将告诉每一个人<br />
            
            给每一条河每一座山取一个温暖的名字<br />
            陌生人，我也为你祝福<br />
            愿你有一个灿烂的前程<br />
            愿你有情人终成眷属<br />
            愿你在尘世获得幸福<br />
            我只愿面朝大海，春暖花开<br />
				</Modal>
			</div>
		);
	}
}
```
