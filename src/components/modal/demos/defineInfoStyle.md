---
order: 13
title: 提示框样式
desc: 自定义提示框样式
---

```jsx

            /**
             * title: 提示框样式
             * desc: 自定义提示框样式
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
	openNormalModal = () => {
		Modal.info({
			showType: this.showType,
			body: '我是默认样式的提示',
			onCancel: () => {}
		});
	};

	openInfoModal = () => {
		Modal.info({
			style: {
				width: '200px'
			},
			showType: this.showType,
			body: '我是宽度只有200px的提示',
			onCancel: () => {}
		});
	};

	openSuccessModal = () => {
		Modal.success({
			style: {
				height: '200px'
			},
			showType: this.showType,
			body:
				'我是高度只有200px的提示，但是我数量很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多，所以我出现了滚动条',
			onCancel: () => {}
		});
	};

	openWarningModal = () => {
		Modal.warning({
			style: {
				background: 'rgb(232, 76, 76)',
				color: '#FFF',
				fontSize: '20px'
			},
			showType: this.showType,
			body: '我是背景色是红色的提示',
			onCancel: () => {}
		});
	};

	render() {
		return (
			<div>
				<Button type="normal" onClick={this.openNormalModal}>
					默认样式提示框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openInfoModal}>
					自定义提示框宽度
				</Button>
				{blank}
				<Button type="normal" onClick={this.openSuccessModal}>
					自定义提示框高度
				</Button>
				{blank}
				<Button type="normal" onClick={this.openWarningModal}>
					自定义提示框背景色
				</Button>
			</div>
		);
	}
}
export default ModalDemo
```
