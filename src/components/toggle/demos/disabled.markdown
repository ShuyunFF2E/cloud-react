---
order: 3
title: toggle是否禁用
desc: disabled 为 true 的时候，toggle不可用
---

````javascript
import React from 'react';
import Toggle from 'ccms-components-react/toggle';
import Button from 'ccms-components-react/button';

export default class ToggleDisabledDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false,
			disabled: true
		}
	}

	handleChange = (checked) => {
		this.setState({ checked });
	}

	handleDisabledChange = () => {

		const { disabled } = this.state;

		this.setState({ disabled: !disabled });
	}

	render() {

		const { disabled, checked } = this.state;

		return (
			<div>
				toggle{ disabled ? '禁用': '可用' }
				<Toggle checked={checked} disabled={disabled} onChange={this.handleChange} />
				<Button size="small" type="primary" onClick={this.handleDisabledChange}>切换禁用状态</Button>
			</div>
		);
	}
}

````
