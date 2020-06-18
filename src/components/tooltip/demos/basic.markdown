---
title: 基础用法
desc: 最简单的用法。
---

```javascript
import React from 'react';
import { Tooltip, Tag, Icon, Datepicker } from 'cloud-react';

export default class ToolTipDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '这是一个toolTip',
			isBlue: true,
			tagArr: [
				{ id: 1, name: 'Button 1' },
				{ id: 2, name: 'Button 2' },
				{ id: 3, name: <span style={{ color: 'red' }}>ReactNode</span> }
			]
		};
	}

	changeColor = () => {
		this.setState({
			isBlue: !this.state.isBlue
		});
	};

	render() {
		const { tagArr, isBlue } = this.state;
		return (
			<div>
				<Tooltip content={'Icon'}>
					<Icon type={'config'} style={{ marginRight: 10, color: isBlue ? 'blue' : 'red' }} onClick={this.changeColor} />
				</Tooltip>

				<Tooltip content={'Icon'}>
					<Datepicker />
				</Tooltip>

				{tagArr.map(item => {
					return (
						<Tooltip content={item.name} key={item.id}>
							<Tag>{item.name}</Tag>
						</Tooltip>
					);
				})}
				<Tooltip content={'TextNode Tips'}>TextNode</Tooltip>
			</div>
		);
	}
}
```
