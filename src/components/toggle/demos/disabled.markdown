---
title: 是否禁用
desc: 看着写吧....
---

````javascript
import React from 'react';
import Toggle from 'ccms-components-react/toggle';

export default class DiabledDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false,
			disabled: true
		}
	}

	handleChange = (checked) => {
		console.log('trigger toggle click ');

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
				<Toggle
					checked={checked}
					disabled={disabled}
					onChange={this.handleChange} />

				<div>
					<button
						type="button"
						onClick={this.handleDisabledChange}
					>
						toggle disbaled
					</button>
				</div>
			</div>
		);
	}
}

````
