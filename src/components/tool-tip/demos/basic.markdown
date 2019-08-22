---
title: 基础用法
desc: 最简单的用法。
---

````javascript
import React from 'react';
import ToolTip from 'ccms-components-react/tool-tip';

export default class ToolTipDemo extends React.Component{
  	constructor(props) {
		super(props);
		this.state = {
			content: '这是一个toolTip',
		}
	}

	render() {
  		const {content} = this.state;
		return (
			<div>
				<ToolTip content={content} placement="top">
					<span>Tooltip will show on mouse enter.</span>
				</ToolTip>
			</div>
		);
	}
}

````
