---
title: 外部控制触发
desc: 手动触发tooltip。
---

````javascript
import React from 'react';
import Button from 'cloud-react/button';
import Tooltip from 'cloud-react/tooltip';

export default class ToolTipDemo extends React.Component{
  	constructor(props) {
		super(props);
		this.state = {
			content: '这是一个toolTip', 
            show: true
		}
	}

    onChangeStatus = (e) => {
        	this.setState({ show: !this.state.show });
    }

	render() {
  		const {content, show} = this.state;
        const style = {marginRight: '10px'};
		return (
            <div id="wrap">
                <Button style={style} onClick={this.onChangeStatus.bind(this)}>{show ? 'close' : 'show'} tooltip</Button>
				<Tooltip content={content} placement="top" visible={show} container={() => document.getElementById('wrap')}>
					<span>Click button {show ? 'close' : 'show'} toolTip.</span>
				</Tooltip>
			</div>
		);
	}
}

````
