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
			isBlue: true,
			tagArr : [{id: 1,name: 'aa'}, {id: 2,name: 'bb'}, {id: 3,name: 'cc'}]
		}
	}

	addItem = () => {
        this.setState({
            tagArr: [...this.state.tagArr, {id: this.state.tagArr.length + 1, name:'ee'}]
        });
	}
	changeColor = () => {
        this.setState({
            isBlue: !this.state.isBlue
        });
	}

	render() {
  		const {content, tagArr, isBlue} = this.state;
		return (
			<div>
				<div onClick={this.addItem}>add</div>
				<Tooltip content={'Icon'}>
                   <Icon type={'config'} style={{color: isBlue ? 'blue' : 'red'}} onClick={this.changeColor}/>
				</Tooltip>
                    {
                        tagArr.map(item => {
                            return (
                                <Tooltip content={item.name} key={item.id}>
                                    <Tag>{item.name}</Tag>
                                </Tooltip>
                                )
                        })
                    }
                <Tooltip content={'string'}>
                   string
				</Tooltip>
			</div>
		);
	}
}

````
