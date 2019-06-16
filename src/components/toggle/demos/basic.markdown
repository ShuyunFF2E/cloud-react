---
title: 基础用法
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
			disabled: true,
			size: 'normal'
		}
	}

	handleChange = (checked) => {
		this.setState({ checked });
	}

	handleSize = (size) => {
		this.setState({ size })
	}

	render() {
		const { size, checked } = this.state;

		return (
			<div>
				<Toggle
					size={size}
					checked={checked}
					onChange={this.handleChange} />

				<Toggle
					size={size}
					checked={checked}
					checkedText="开"
					unCheckedText="关"
					onChange={this.handleChange} />

				<div>
					<button
						type="button"
						onClick={this.handleSize.bind(this, 'normal')}
					>
						normal
					</button>

					<button
						type="button"
						onClick={this.handleSize.bind(this, 'small')}
					>
						small
					</button>
				</div>
			</div>
		);
	}
}

````
