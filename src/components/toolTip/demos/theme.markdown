---
title: 主题
desc: Tooltip 组件提供了三个不同的主题：dark light error。默认dark主题
---

````javascript
import React from 'react';
import ToolTip from 'ccms-components-react/toolTip';
import Button from 'ccms-components-react/button';

export default class ToolTipDemo extends React.Component{
  	constructor(props) {
		super(props);
		this.state = {
			darkContent: 'dark theme',
			lightContent: 'light theme',
			errorContent: 'error theme',
		}
	}

	render() {
  		const {darkContent, lightContent, errorContent} = this.state;
  		const blank = '\u00A0';
		return (
			<div>
				<ToolTip content={darkContent}>
            		<Button type="normal">dark 主题</Button>
				</ToolTip>
				{blank}
				<ToolTip content={lightContent} theme="light">
					<Button type="normal">light 主题</Button>
				</ToolTip>
				{blank}
                <ToolTip content={errorContent} theme="error">
					<Button type="normal">error 主题</Button>
				</ToolTip>
			</div>
		);
	}
}

````
