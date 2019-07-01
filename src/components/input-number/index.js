import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import './index.less';

const selector = 'input-number';
export default class InputNumber extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			precision: props.precision,
			upBtnStatus: false,
			downBtnStatus: false
		};
	}

	componentDidMount() {
		this.init();
	}

	getMax(value) {
		const { max } = this.props;
		return {
			lessEqualMax: value === '' ? false : value <= max,
			greaterEqualMax: value === '' ? false : value >= max
		};
	}

	getMin(value) {
		const { min } = this.props;
		return {
			lessEqualMin: value === '' ? false : value >= min,
			greaterEqualMin: value === '' ? false : value <= min
		};
	}

	getPrecision() {
		const { step } = this.props;
		if (!Number.isInteger(step)) {
			this.setState({
				precision: step.toString().split('.')[1].length
			});
		}
	}

	setBtnStatus(upBtnStatus, downBtnStatus) {
		this.setState({
			upBtnStatus,
			downBtnStatus
		});
	}

	handleValue = currentValue => {
		const { value } = this.state;
		this.setBtnStatus(this.getMax(currentValue).greaterEqualMax, this.getMin(currentValue).greaterEqualMin);
		if (currentValue !== value) {
			this.setState({
				value: currentValue
			});
			this.triggerOnChange(currentValue);
		}
	}

	handlePlusMinus = isPlus => {
		const { value, precision } = this.state;
		const { step, max, min } = this.props;
		let tempValue = '';
		if (value !== '') {
			tempValue = (Number.parseFloat(value) + (isPlus ? step : -1 * step)).toFixed(precision);
			if (isPlus) {
				tempValue = this.getMax(tempValue).lessEqualMax ? tempValue : max;
			} else {
				tempValue = this.getMin(tempValue).lessEqualMin ? tempValue : min;
			}
		} else if (min !== Infinity && min !== -Infinity) {
			tempValue = min;
		} else if (max !== Infinity && max !== -Infinity) {
			tempValue = max;
		} else {
			tempValue = Number(0).toFixed(precision);
		}
		this.handleValue(tempValue);
	}

	handlePlus = () => {
		this.handlePlusMinus(true);
	}

	handleMinus = () => {
		this.handlePlusMinus(false);
	}

	handleWheel = e => {
		const { disabled } = this.props;
		if (!disabled && e.target === document.activeElement) {
			const delta = e.wheelDelta || -e.deltaY || -e.detail;
			if (delta > 0) {
				this.handlePlus();
			}

			if (delta < 0) {
				this.handleMinus();
			}
		}
	}

	handleOnChange = e => {
		const targetValue = e.target.value.trim();
		this.handleValue(targetValue);
	}

	handleBlur = e => {
		const  { max, min } = this.props;
		const inpValue = e.target.value.trim();

		let targetValue = inpValue.length ? Number.parseFloat(inpValue) : inpValue;

		if (targetValue !== '' && !Number.isNaN(targetValue)) {
			if (!this.getMax(targetValue).lessEqualMax) {
				targetValue = max;
			}
			if (!this.getMin(targetValue).lessEqualMin) {
				targetValue = min;
			}
		} else {
			targetValue = '';
		}
		this.handleValue(targetValue);
	}

	init() {
		const { min, max, value, defaultValue } = this.props;
		let tempValue = '';
		if (value !== undefined && !Number.isNaN(value)) {
			if (value <= max && value >= min) {
				tempValue = value;
			}
		} else if (!Number.isNaN(defaultValue)) {
			if (defaultValue <= max && defaultValue >= min) {
				tempValue = defaultValue;
			}
		}
		this.getPrecision();
		this.handleValue(tempValue);
	}

	triggerOnChange(value) {
		this.props.onChange(value);
	}

	render() {
		const { disabled, placeholder, prefix, postfix, className, style, size, step, min, max, defaultValue, ...otherProps } = this.props;
		const { value, upBtnStatus, downBtnStatus } = this.state;
		const inputValue = typeof value !== 'undefined' ? value : '';
		return (
			<div className={`${selector} ${size} ${className}`}
				 step={step}
				 min={min}
				 max={max}
				 style={style}>
				{ prefix &&
					<span className={`${selector}-addon ${selector}-prefix ${selector}-cell`}>{prefix}</span>
				}
				<input type="text"
					   className={`${selector}-cell ${selector}-text`}
					   {...otherProps}
					   placeholder={placeholder}
					   onChange={this.handleOnChange}
					   onBlur={this.handleBlur}
					   value={inputValue}
					   onWheel={this.handleWheel}
					   disabled={disabled}/>
				{ postfix &&
					<span className={`${selector}-addon  ${selector}-postfix ${selector}-cell`}>{postfix}</span>
				}
				{!disabled &&
					<span className={`${selector}-btn-vertical ${selector}-cell`}>
						<button className={`${selector}-up`}
								onClick={this.handlePlus}
								disabled={upBtnStatus}
								type="button">
						  <Icon type="up" style={{ fontSize: '8px', verticalAlign: 'middle' }}/>
						</button>
						<button className={`${selector}-down`}
								type="button"
								disabled={downBtnStatus}
								onClick={this.handleMinus}>
						  <Icon type="down" style={{ fontSize: '8px', verticalAlign: 'middle' }}/>
						</button>
					</span>
				}
			</div>
		);
	}
}

InputNumber.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	placeholder: PropTypes.string,
	size: PropTypes.oneOf(['small', 'default', 'large']),
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	precision: PropTypes.number,
	value: PropTypes.number,
	defaultValue: PropTypes.number,
	prefix: PropTypes.string,
	postfix: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};

InputNumber.defaultProps = {
	style: undefined,
	value: undefined,
	defaultValue: '',
	className: '',
	min: -Infinity,
	max: Infinity,
	size: 'default',
	placeholder: '请输入...',
	precision: 0,
	step: 1,
	prefix: null,
	postfix: null,
	disabled: false,
	onChange: () => {
	}
};
