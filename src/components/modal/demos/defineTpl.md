---
order: 3
title: 自定义模版
desc: 设置title、body、footer、okText、cancelText实现自定义模版
---

```jsx

            /**
             * title: 自定义模版
             * desc: 设置title、body、footer、okText、cancelText实现自定义模版
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';

const blank = '\u00A0';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibleTitle: false,
			visibleBody: false,
			visibleFooterText: false,
			visibleFooter: false
		};
	}

	// 打开自定义title弹出框
	openDefineTitleModal = () => {
		this.setState({
			visibleTitle: true,
			title: '自定义title'
		});
	};

	// 打开自定义底部区域按钮文字弹出框
	openDefineBtnTextModal = () => {
		this.setState({
			visibleFooterText: true,
			okText: '好的',
			cancelText: '不了'
		});
	};

	// 打开自定义body区域弹出框
	openDefineBodyModal = () => {
		this.setState({
			visibleBody: true
		});
	};

	// 打开自定义底部区域弹出框
	openDefineFooterModal = () => {
		this.setState({
			visibleFooter: true,
			footer: <Footer />
		});
	};

	closeModal = () => {
		this.setState({
			visibleTitle: false,
			visibleBody: false,
			visibleFooterText: false,
			visibleFooter: false
		});
	};

	render() {
		return (
			<div>
				<Button type="normal" onClick={this.openDefineTitleModal}>
					自定义title
				</Button>
				{blank}
				<Button type="normal" onClick={this.openDefineBodyModal}>
					自定义body
				</Button>
				{blank}
				<Button type="normal" onClick={this.openDefineBtnTextModal}>
					自定义底部按钮文本
				</Button>
				{blank}
				<Button type="normal" onClick={this.openDefineFooterModal}>
					自定义底部区域
				</Button>

				<Modal visible={this.state.visibleTitle} title={this.state.title} onOk={this.closeModal} onCancel={this.closeModal} onClose={this.closeModal}>
					something you can write
				</Modal>

				<Modal visible={this.state.visibleBody} onOk={this.closeModal} onCancel={this.closeModal} onClose={this.closeModal}>
					<Body />
				</Modal>

				<Modal
					visible={this.state.visibleFooter}
					footer={this.state.footer}
					onOk={this.closeModal}
					onCancel={this.closeModal}
					onClose={this.closeModal}>
					我会自定义底部区域
				</Modal>

				<Modal
					visible={this.state.visibleFooterText}
					okText={this.state.okText}
					cancelText={this.state.cancelText}
					onOk={this.closeModal}
					onCancel={this.closeModal}
					onClose={this.closeModal}>
					我会自定义底部区域按钮文字
				</Modal>
			</div>
		);
	}
}

class Body extends React.Component {
	render() {
		return <div>我是自定义body组件</div>;
	}
}

class Footer extends React.Component {
	render() {
		return <div>我是自定义Footer组件</div>;
	}
}
```
