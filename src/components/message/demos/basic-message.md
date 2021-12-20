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
			'成功内容很多成功内容很多成功内容很多成功内容很多成功内容很多成功内容很多成功内容很多成功内容很多',
			{ duration: 0 }
		);
	}
	onErrorClick() {
		Message.error('更新失败', { showClose: false });
	}
	onInfoClick() {
		Message.info('提示信息')
	}
	onWarnClick() {
		Message.warning('警告信息')
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
					warn
				</Button>
			</div>
		);
	}
}
```
