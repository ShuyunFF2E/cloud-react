---
title: 位置
desc: Tooltip 组件提供了十二个不同的位置
---

````javascript
import React from 'react';
import Tooltip from 'cloud-react/tooltip';
import Button from 'cloud-react/button';

export default class ToolTipDemo extends React.Component{
  	constructor(props) {
		super(props);
		this.state = {
			content: '提示文字',
		}
	}

	render() {
  		const {content} = this.state;
  		const blank = '\u00A0';
  		const leftWrap = {float: 'left', width: '60px', wordBreak: 'break-word'};
  		const rightWrap = {float: 'right', width: '60px', wordBreak: 'break-word'};
  		const bottomWrap = {clear: 'both'};
  		const wrap = {width: '400px', margin: '20px auto', textAlign: 'center'}
		return (
			<div style={wrap}>
				<div>
					<Tooltip content={content} placement="top-left">
						<Button type="normal">上左</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="top">
						<Button type="normal">上中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="top-right">
						<Button type="normal">上右</Button>
					</Tooltip>
				</div>
				<div style={rightWrap}>
					<Tooltip content={content} placement="right-top">
						<Button type="normal">右上</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="right">
						<Button type="normal">右中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="right-bottom">
						<Button type="normal">右下</Button>
					</Tooltip>
				</div>
				<div style={leftWrap}>
					<Tooltip content={content} placement="left-top">
						<Button type="normal">左上</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="left">
						<Button type="normal">左中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="left-bottom">
						<Button type="normal">左下</Button>
					</Tooltip>
				</div>
				<div style={bottomWrap}>
					<Tooltip content={content} placement="bottom-left">
						<Button type="normal">下左</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="bottom">
						<Button type="normal">下中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="bottom-right">
						<Button type="normal">下右</Button>
					</Tooltip>
				</div>
			</div>
		);
	}
}

````
