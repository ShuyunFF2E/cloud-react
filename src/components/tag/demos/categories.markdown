---
order: 1
title: 基本使用 - 分类 可选择
desc: 对物件进行类型选择
---

````javascript
import React from 'react';
import Tag from 'cloud-react/tag';
import Button from 'cloud-react/button';


export default class TagDemo extends React.Component {

	constructor(props) {
				super(props);
				this.state = {
					swim: true,
					surfing: true,
					dive: false,
					climbing: true,
					yoga: true
				};
		}

	handleClick = () => {
		
		const type = Object.keys(this.state)[Math.floor(Math.random()*4)]
		this.setState({ 'swim': !this.state.swim });
	}

	render() {
		const { swim, surfing, dive, climbing, yoga } = this.state;
		return (
			<>
				<label>时尚的运动：</label>
				<Tag checkable checked={swim} onClick={status => this.setState({'swim': !status})}>游泳</Tag>
				<Tag checkable checked={surfing} onClick={status => this.setState({'surfing': !status})}>冲浪</Tag>
				<Tag checkable checked={dive} onClick={status => this.setState({'dive': !status})}>潜水</Tag>
				<Tag checkable checked={climbing} onClick={status => this.setState({'climbing': !status})} disabled>攀岩</Tag>
				<Tag checkable checked={yoga} disabled>空中瑜伽</Tag>
				<br/>
				<Button onClick={this.handleClick} style={{marginTop:'13px'}}>修改游泳Tag选中状态</Button>
			</>
		);
	}
}

````
