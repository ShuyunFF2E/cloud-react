---
title: 基础用法
desc: 最简单的用法。
---

```javascript
import React from 'react';
import { Tooltip, Tag, Icon } from 'cloud-react';
function jspTest() {
  return (
        <div>
            <span style={{color: "blue"}}>还是jsp_1</span><br/><span>还是jsp_2</span>
        </div>
    )
}

export default class ToolTipDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '这是一个toolTip',
			isBlue: true,
			tagArr: [
				{ id: 1, name: 'jsp' }
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
				<Tooltip content={<span>测试jsp</span>}>
					<Icon type={'config'} style={{ color: isBlue ? 'blue' : 'red' }} onClick={this.changeColor} />
				</Tooltip>
				{tagArr.map(item => {
					return (
						<Tooltip content={jspTest} key={item.id}>
							<Tag>{item.name}</Tag>
						</Tooltip>
					);
				})}
				<Tooltip content="基础用法">基础用法</Tooltip>
			</div>
		);
	}
}
```
