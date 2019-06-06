import React, { Component} from 'react';
import Toggle from '../../src/components/toggle';

export default class ToggleDemo extends Component {


	constructor(props) {
		super(props);

		this.state = {
			checked: false,
			size: 'small',
			disabled: true
		}
	}

	handleChange = (value) => {
		console.log('trigger toggle click ');

		this.setState({
			checked: value
		});

	}

	handleDisabledChange = () => {

		const { disabled } = this.state;

		this.setState({
			disabled: !disabled
		});
	}

	render() {

		const { checked, size, disabled } = this.state;

		return (
			<section>
				<h2> Switch Component Demo </h2>

				<article>
					<h4>size使用：</h4>
					<div>
						size为默认：<Toggle  checked={checked} onChange={this.handleChange} />
					</div>
					<div>
						size为normal：<Toggle size="normal" checked={checked} onChange={this.handleChange}/>
					</div>
					<div>
						size为 {size}：<Toggle size={size} checked={checked} onChange={this.handleChange} />
					</div>
				</article>

				<article>
					<h4>是否禁用</h4>
					<div>
						选中禁用状态：<Toggle checked={checked} disabled={disabled} onChange={this.handleChange} />
						<button type="button" onClick={this.handleDisabledChange}>toggle disbaled</button>
					</div>
				</article>

				<article>
					<h4>自定义文案：</h4>
					<Toggle checked={checked} checkedText="开" unCheckedText="关" onChange={this.handleChange} />
				</article>

				<article>
					<h4>点击切换开关</h4>
					<Toggle checked={checked} onChange={this.handleChange} />
				</article>

			</section>
		);
	}
}
