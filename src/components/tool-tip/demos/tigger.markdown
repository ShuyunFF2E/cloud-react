---
title: 触发方式
desc: Tooltip 组件提供了两种不同的显示方式：hover click。默认hover
---

````javascript
import React from 'react';
import ToolTip from 'ccms-components-react/tool-tip';
import Button from 'ccms-components-react/button';

export default class ToolTipDemo extends React.Component{
  	constructor(props) {
		super(props);
		this.state = {
			hoverContent: 'hover content',
			clickContent: 'click content',
		}
	}

	render() {
  		const {hoverContent, clickContent} = this.state;
  		const blank = '\u00A0';
		return (
			<div>
				<ToolTip content={hoverContent}>
            		<Button type="normal">鼠标移入显示 Tooltip</Button>
				</ToolTip>
				{blank}
				<ToolTip content={clickContent} trigger="click">
					<Button type="normal">点击显示 Tooltip</Button>
				</ToolTip>
			</div>
		);
	}
}

````
