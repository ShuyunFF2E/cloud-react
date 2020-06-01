---
title: 位置
desc: Tooltip 组件提供了十二个不同的位置
---

```javascript
import React from 'react';
import { Button, Tooltip } from 'cloud-react';

export default class ToolTipDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '提示文字'
		};
	}

	render() {
		const { content } = this.state;
		const blank = '\u00A0';
		const leftWrap = { float: 'left', width: '60px', wordBreak: 'break-word' };
		const rightWrap = { float: 'right', width: '60px', wordBreak: 'break-word' };
		const bottomWrap = { clear: 'both' };
		const wrap = { width: '400px', margin: '20px auto', textAlign: 'center' };
		return (
			<div style={wrap}>
				<div>
					<Tooltip content={content} placement="top-left" container=".wrapClass">
						<Button type="normal">上左</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="top" container='.wrapClass'>
						<Button type="normal">上中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="top-right" container={() => document.getElementById('wrap')}>
						<Button type="normal">上右</Button>
					</Tooltip>
				</div>
				<div style={rightWrap}>
					<Tooltip content={content} placement="right-top" container={() => document.getElementById('wrap')}>
						<Button type="normal">右上</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="right" container={() => document.getElementById('wrap')}>
						<Button type="normal">右中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="right-bottom" container={() => document.getElementById('wrap')}>
						<Button type="normal">右下</Button>
					</Tooltip>
				</div>
				<div style={leftWrap}>
					<Tooltip content={content} placement="left-top" container={() => document.getElementById('wrap')}>
						<Button type="normal">左上</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="left" container={() => document.getElementById('wrap')}>
						<Button type="normal">左中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="left-bottom" container={() => document.getElementById('wrap')}>
						<Button type="normal">左下</Button>
					</Tooltip>
				</div>
				<div style={bottomWrap}>
					<Tooltip content={content} placement="bottom-left" container={() => document.getElementById('wrap')}>
						<Button type="normal">下左</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="bottom" container={() => document.getElementById('wrap')}>
						<Button type="normal">下中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="bottom-right" container={() => document.getElementById('wrap')}>
						<Button type="normal">下右</Button>
					</Tooltip>
				</div>
			</div>
		);
	}
}
```
