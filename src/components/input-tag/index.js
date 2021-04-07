import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ShunyunUtils from 'shuyun-utils';
import { noop, prefixCls } from '@utils';
import Icon from '../icon';
import Tooltip from '../tooltip';
import Radio from '../radio';
import Input from '../input';
import Message from '../message';

import './index.less';

const selector = `${prefixCls}-input-tag`;

export default class InputTag extends Component {
	inputRef = createRef();

	containerRef = createRef();

	constructor(props) {
		super(props);
		this.state = {
			data: props.data || [],
			separator: '',
			character: ''
		};
	}

	componentDidMount() {
		if (!this.props.disabled) {
			this.computedInputWidth();
			this.inputRef.current.focus();
		}
	}

	componentDidUpdate() {
		this.computedInputWidth();
	}

	handleKeyUp = event => {
		const { value } = event.target;
		const keyCode = event.key;
		const { data: tags } = this.state;
		const { max, onChange } = this.props;

		// 按下 enter 键，保存当前input的值
		if (keyCode === 'Enter' && value.trim().length) {
			const values = this.sign ? value.split(this.sign).filter(item => item) : value;
			const result = tags.concat(values);

			if (result.length > max) {
				result.splice(max);
				Message.error(`超过最大数量，已截取前${max}个，可删除部分后再重新添加`);
			}

			this.setState(() => ({
				data: result
			}));

			// eslint-disable-next-line
			event.target.value = '';

			onChange(result);
		}

		// 按下 Backspace 键， 如果当前input为空，则删除最后一个tag
		if (keyCode === 'Backspace' && !value && tags.length) {
			tags.pop();

			this.setState(() => ({
				data: tags
			}));

			onChange(tags);
		}
	};

	handleRemove = index => {
		const { data: tags } = this.state;

		tags.splice(index, 1);

		this.setState({
			data: tags
		});

		this.props.onChange(tags);
	};

	handleClear = () => {
		this.setState({
			data: []
		});
		this.props.onChange([]);
	};

	handleCopy = () => {
		const { data } = this.state;
		const text = this.sign ? data.join(this.sign) : data.join(';');

		ShunyunUtils.copyText(text);
		Message.success('复制成功');
	};

	// 根据容器和最后一个 tag 的位置计算 input 的宽度
	computedInputWidth = () => {
		const { left, width } = this.containerRef.current.getBoundingClientRect();

		const eles = this.containerRef.current.querySelectorAll(`.${selector}-item`);

		let inputWidth = width - 20;

		if (eles.length) {
			const lastElement = eles[eles.length - 1];

			const { left: lastItemLeft, width: lastItemWidth } = lastElement.getBoundingClientRect();

			inputWidth = width - (lastItemLeft - left + lastItemWidth + 30);

			if (inputWidth < 100) {
				inputWidth = width - 20;
			}
		}

		this.inputRef.current.style.cssText = `width: ${parseInt(inputWidth, 10)}px`;
	};

	handleChangeSeparator = value => {
		this.setState({
			separator: value
		});

		if (value !== 'other') {
			this.setState({
				character: ''
			});
		}
	};

	handleChange = event => {
		const { value } = event.target;
		const regex = /[^a-zA-Z0-9\u4e00-\u9fa5]+$/g;

		if (regex.test(value)) {
			this.setState({
				character: value
			});
		} else {
			// eslint-disable-next-line
			event.target.value = '';
			this.setState({
				character: ''
			});
		}
	};

	renderTags() {
		const { data } = this.state;
		const { maxWidth, disabled } = this.props;

		return (
			<>
				{data.length
					? data.map((item, index) => (
							<span key={Math.random() * 10} className={`${selector}-item`} style={{ maxWidth: `${maxWidth}px` }}>
								<Tooltip content={item}>
									<span className="text" title={item}>
										{item}
									</span>
								</Tooltip>
								{!disabled && <Icon type="close" onClick={() => this.handleRemove(index)} />}
							</span>
					  ))
					: null}
			</>
		);
	}

	renderConfig() {
		const { separator } = this.state;
		const { isConfigSeparator } = this.props;

		return (
			<>
				{isConfigSeparator ? (
					<div className={`${selector}-config`}>
						<Radio.Group value={separator} onChange={this.handleChangeSeparator}>
							<Radio value="，">中文逗号，</Radio>
							<Radio value="；">中文分号；</Radio>
							<Radio value="、">中文顿号、</Radio>
							<Radio value=",">英文逗号,</Radio>
							<Radio value=";">英文分号;</Radio>
							<Radio value="other">其他</Radio>
							{separator === 'other' && (
								<Input size="small" maxLength={1} placeholder="请输入一个指定分隔符" onChange={this.handleChange} style={{ width: '140px' }} />
							)}
						</Radio.Group>
					</div>
				) : null}
			</>
		);
	}

	get placeholder() {
		const { separator, character } = this.state;

		let placeholder = '按回车保存，可输入多个';

		if (separator && separator !== 'other') {
			placeholder = `输入字符按回车以${separator}分隔为多段保存`;
		}

		if (separator === 'other' && character) {
			placeholder = `输入字符按回车以${character}分隔为多段保存`;
		}

		return placeholder;
	}

	get sign() {
		const { separator, character } = this.state;
		return separator && separator !== 'other' ? separator : character;
	}

	get count() {
		return this.state.data.length;
	}

	render() {
		const { style, disabled, max } = this.props;

		return (
			<div ref={this.containerRef} className={selector} style={style}>
				{!disabled && this.renderConfig()}
				<div className={`${selector}-list`}>
					{this.renderTags()}
					{!disabled && <input ref={this.inputRef} onKeyUp={this.handleKeyUp} placeholder={this.placeholder} />}
				</div>
				<div className={`${selector}-operate`}>
					<span style={{ color: 'red' }}>
						{this.count}/{max}
					</span>
					<Tooltip content="一键复制，以指定分隔符拼接，默认为英文分号">
						<Icon type="remark" onClick={this.handleCopy} />
					</Tooltip>
					{!disabled && (
						<Tooltip content="一键清空所有内容">
							<Icon type="close-circle-solid" onClick={this.handleClear} />
						</Tooltip>
					)}
				</div>
			</div>
		);
	}
}

InputTag.propTypes = {
	data: PropTypes.array,
	disabled: PropTypes.bool,
	max: PropTypes.number,
	maxWidth: PropTypes.number,
	isConfigSeparator: PropTypes.bool,
	style: PropTypes.object,
	onChange: PropTypes.func
};

InputTag.defaultProps = {
	data: [],
	disabled: false,
	max: 50,
	maxWidth: 200,
	isConfigSeparator: false,
	style: {},
	onChange: noop
};
