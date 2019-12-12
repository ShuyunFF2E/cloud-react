---
title: 基础用法
desc: 最简单的用法。
---

````javascript
import React from 'react';
import { Tooltip, Tag, Icon } from 'cloud-react';

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
				<Tooltip content={content} placement="top">
					<Tag>Tooltip will show on mouse enter.</Tag>
				</Tooltip>

				<Tooltip content={'就是就是就'} placement="top">
					<Icon type="flag-solid"></Icon>
				</Tooltip>
			</div>
		);
	}
}

````
