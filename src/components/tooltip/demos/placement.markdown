---
title: 位置
desc: Tooltip 组件提供了十二个不同的位置
---

````javascript
import React from 'react';
import ToolTip from 'ccms-components-react/tooltip';
import Button from 'ccms-components-react/button';

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
  		const leftWrap = {float: 'left', width: '60px'};
  		const rightWrap = {float: 'right', width: '60px'};
  		const bottomWrap = {clear: 'both'};
  		const wrap = {width: '400px', margin: '20px auto', textAlign: 'center'}
		return (
			<div style={wrap}>
				<div>
					<ToolTip content={content} placement="top-left">
						<Button type="normal">上左</Button>
					</ToolTip>
					{blank}
					<ToolTip content={content} placement="top">
						<Button type="normal">上中</Button>
					</ToolTip>
					{blank}
					<ToolTip content={content} placement="top-right">
						<Button type="normal">上右</Button>
					</ToolTip>
				</div>
				<div style={rightWrap}>
					<ToolTip content={content} placement="right-top">
						<Button type="normal">右上</Button>
					</ToolTip>
					{blank}
					<ToolTip content={content} placement="right">
						<Button type="normal">右中</Button>
					</ToolTip>
					{blank}
					<ToolTip content={content} placement="right-bottom">
						<Button type="normal">右下</Button>
					</ToolTip>
				</div>
				<div style={leftWrap}>
					<ToolTip content={content} placement="left-top">
						<Button type="normal">左上</Button>
					</ToolTip>
					{blank}
					<ToolTip content={content} placement="left">
						<Button type="normal">左中</Button>
					</ToolTip>
					{blank}
					<ToolTip content={content} placement="left-bottom">
						<Button type="normal">左下</Button>
					</ToolTip>
				</div>	
				<div style={bottomWrap}>
					<ToolTip content={content} placement="bottom-left">
						<Button type="normal">下左</Button>
					</ToolTip>
					{blank}
					<ToolTip content={content} placement="bottom">
						<Button type="normal">下中</Button>
					</ToolTip>
					{blank}
					<ToolTip content={content} placement="bottom-right">
						<Button type="normal">下右</Button>
					</ToolTip>	
				</div>
			</div>
		);
	}
}

````
