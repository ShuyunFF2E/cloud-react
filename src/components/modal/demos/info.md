---
order: 1
title: 信息提示
desc: 通过API调用方式弹出一个信息提示框
---

```jsx

            /**
             * title: 信息提示
             * desc: 通过API调用方式弹出一个信息提示框
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';

const blank = '\u00A0';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
	}

	// 默认弹出框
	openInfoModal = () => {
		Modal.info({
			title: '提醒类弹窗',
			body: '正文文案',
			onCancel: () => {}
		});
	};

	openSuccessModal = () => {
		Modal.success({
			title: '成功类弹窗',
			body: '正文文案',
			onCancel: () => {}
		});
	};

	openWarningModal = () => {
		Modal.warning({
			title: '警示类弹窗',
			body: '正文文案',
			onCancel: () => {}
		});
	};

	openErrorModal = () => {
		Modal.error({
			title: '失败类弹窗',
			body: '正文文案',
			onCancel: () => {}
		});
	};

	openJSXModal = () => {
		const dom = <p>这是一段JSX DOM渲染节点</p>;
		Modal.info({
			title: '动态JSX渲染弹窗',
			isShowIcon: false,
			body: dom,
			onCancel: () => {}
		});
	};

	openNoIconModal = () => {
		const dom = <p>这是一段弹窗内容信息</p>;
		Modal.info({
			title: '不显示ICON弹窗',
			isShowIcon: false,
			body: dom,
			onCancel: () => {}
		});
	};

	openDefineIconModal = () => {
		Modal.info({
			title: '自定义ICON弹窗',
			icon: 'flag-solid',
			body: '这是一段弹窗内容信息',
			onCancel: () => {}
		});
	};

	openDefineIconStyleModal = () => {
		Modal.info({
			title: '自定义ICON弹窗',
			icon: 'flag-solid',
			iconStyle: { color: '#aaa' },
			body: '这是一段弹窗内容信息',
			onCancel: () => {}
		});
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.openInfoModal}>
					信息提示弹出框
				</Button>
				{blank}
				<Button type="primary" onClick={this.openSuccessModal}>
					成功提示弹出框
				</Button>
				{blank}
				<Button type="primary" onClick={this.openErrorModal}>
					错误提示弹出框
				</Button>
				{blank}
				<Button type="primary" onClick={this.openWarningModal}>
					警告提示弹出框
				</Button>
				{blank}
				<br />
				<br />
				<Button type="normal" onClick={this.openJSXModal}>
					jsx语法提示
				</Button>
				{blank}
				<Button type="normal" onClick={this.openNoIconModal}>
					不显示icon
				</Button>
				{blank}
				<Button type="normal" onClick={this.openDefineIconModal}>
					自定义Icon
				</Button>
				{blank}
				<Button type="normal" onClick={this.openDefineIconStyleModal}>
					自定义Icon+样式
				</Button>
			</div>
		);
	}
}
```
