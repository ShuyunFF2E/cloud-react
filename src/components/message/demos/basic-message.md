---
title: 基础用法
desc: ''
---

```jsx

            /**
             * title: 基础用法
             * desc: 
             */
import React, { Component } from 'react';
import { Button, Message } from 'cloud-react';

const blank = '\u00A0';

export default class MessageDemo extends Component {
	onSuccessClick() {
		Message.success(
			'文字描述',
			{ duration: 0, title: '提醒文字', operate: '操作按钮' }
		);
	}
	onErrorClick() {
		Message.error('更新失败', { showClose: false });
	}
	onInfoClick() {
		Message.info('提示信息', {
			duration: 10 * 1000,
			operate: '点击',
			onOperate: console.log
		 });
	}
	onWarnClick() {
		Message.warning('警告信息很长警告信息很长警告信息很长警告信息很长警告信息很长警告信息很长')
	}

	render() {
		return (
			<div className="app-contain">
				<Button type="normal" onClick={this.onSuccessClick}>
					success
				</Button>
				{blank}
				<Button type="normal" onClick={this.onErrorClick}>
					error
				</Button>
				<Button type="normal" onClick={this.onInfoClick}>
					info
				</Button>
				<Button type="normal" onClick={this.onWarnClick}>
					warning
				</Button>
			</div>
		);
	}
}
```
