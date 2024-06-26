---
order: 7
title: 信息提示
desc: 弹出一个信息提示框
---

```jsx

            /**
             * title: 信息提示
             * desc: 弹出一个信息提示框
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';
import getQueryString from './query.js';

const blank = '\u00A0';

class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.showType = getQueryString('showType') || 'top';
	}

	// 默认弹出框
	openInfoModal = () => {
		Modal.info({
			showType: this.showType,
			body: 'something you can write here',
			onCancel: () => {}
		});
	};

	openSuccessModal = () => {
		Modal.success({
			showType: this.showType,
			title: 'this is a success message!',
			body: 'something you can write here',
			onCancel: () => {}
		});
	};

	openWarningModal = () => {
		Modal.warning({
			showType: this.showType,
			body: 'something you can write here',
			onCancel: () => {}
		});
	};

	openErrorModal = () => {
		Modal.error({
			showType: this.showType,
			body: 'something you can write here',
			onCancel: () => {}
		});
	};

	openJSXModal = () => {
		const dom = <p>hello world, this is a p element</p>;
		Modal.info({
			showType: this.showType,
			isShowIcon: false,
			body: dom,
			onCancel: () => {}
		});
	};

	openNoIconModal = () => {
		const dom = <p>hello world, there is no icon</p>;
		Modal.info({
			showType: this.showType,
			isShowIcon: false,
			body: dom,
			onCancel: () => {}
		});
	};

	openDefineIconModal = () => {
		Modal.info({
			showType: this.showType,
			icon: 'flag-solid',
			body: 'this is a defined icon',
			onCancel: () => {}
		});
	};

	openDefineIconStyleModal = () => {
		Modal.info({
			showType: this.showType,
			icon: 'flag-solid',
			iconStyle: { color: '#aaa' },
			body: 'this is a defined icon',
			onCancel: () => {}
		});
	};

	render() {
		return (
			<div>
				<Button type="normal" onClick={this.openInfoModal}>
					信息提示弹出框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openSuccessModal}>
					成功提示弹出框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openErrorModal}>
					错误提示弹出框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openWarningModal}>
					警告提示弹出框
				</Button>
				{blank}
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
				<br />
				<br />
				<Button type="normal" onClick={this.openDefineIconStyleModal}>
					自定义Icon样式
				</Button>
			</div>
		);
	}
}
export default ModalDemo
```
