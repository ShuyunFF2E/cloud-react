import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import Icon from '../icon';
import './index.less';

const selector = 'input-number';

function isInvalid(value) {
	return Number.isNaN(Number(value)) || value === null || value.toString().trim() === '';
}

function getCurrentValue(value, min, max, precision) {
	if (isInvalid(value)) {
		return '';
	}
	const val = Number(value).toFixed(Math.abs(parseInt(precision, 10)));
	if (val > max) {
		return max;
	}
	if (val < min) {
		return min;
	}
	return val;
};

function getMax(value, max) {
	const _isInvalid = isInvalid(value);
	return {
		lessEqualMax: _isInvalid ? false : Number(value) <= max,
		lessMax: _isInvalid ? false : Number(value) < max
	};
}

function getMin(value, min) {
	const _isInvalid = isInvalid(value);
	return {
		greaterMin: _isInvalid ? false : Number(value) > min,
		greaterEqualMin: _isInvalid ? false : Number(value) >= min
	};
}

function InputNumber(props) {
	const { className, style, placeholder, size, min, max, step, precision, value, defaultValue, disabled, onChange, onBlur, onFocus, ...other } = props;

	const [currentValue, setCurrentValue] = useState('');
	const [upButtonEnabled, setUpButtonEnabled] = useState(true);
	const [downButtonEnabled, setDownButtonEnabled] = useState(true);
	const [currentPrecision, setCurrentPrecision] = useState(0);
	const [focused, setFocused] = useState(false);

	let isControlled = value !== undefined;

	function setBtnStatus(isInvalided, isUpEnabled, isDownEnabled) {
		// 非法输入最终会变成空字符串，空字符串默认可+-
		setUpButtonEnabled(isInvalided || isUpEnabled);
		setDownButtonEnabled(isInvalided || isDownEnabled);
	}

	useEffect(() => {
		let pr = '';
		if (precision === undefined || precision === null) {
			pr = Number.isInteger(step) ? 0 : step.toString().split('.')[1].length
		} else {
			pr = parseInt(precision, 10);
		}
		setCurrentPrecision(pr);
	}, [precision, step]);

	useEffect(() => {
		isControlled = value !== undefined;
		const val = getCurrentValue(value === undefined ? defaultValue : value, min, max, currentPrecision);
		setCurrentValue(val);
		setBtnStatus(isInvalid(val), getMax(val, max).lessMax, getMin(val, min).greaterMin);
	}, [value, min, max, currentPrecision]);

	useEffect(() => {
		setBtnStatus(isInvalid(currentValue), getMax(currentValue, max).lessMax, getMin(currentValue, min).greaterMin);
	}, [currentValue, min, max]);

	function handleChange(evt) {
		const targetValue = evt.target.value.trim().replace(/[^\-?\d.]/g, '');
		setCurrentValue(targetValue);
		onChange(targetValue);
	}

	function handleBlur(evt) {
		setFocused(false);
		const targetValue = evt.target.value.trim().replace(/[^\-?\d.]/g, '');
		let val = isInvalid(targetValue) ? '' : Number(targetValue).toFixed(currentPrecision);
		val = getCurrentValue(val, min, max, currentPrecision);
		setCurrentValue(val);
		onBlur(val);
	}

	function handleFocus() {
		setFocused(true);
		onFocus();
	}

	function getValueByBlank() {
		if (min === -Infinity && max === Infinity || min === Infinity && max === -Infinity || min <= 0 && max >= 0) {
			return 0;
		}
		if (min === -Infinity && max === -Infinity) {
			return 0 - step;
		}
		if (min === Infinity && max === Infinity) {
			return 0 + step
		}
		if (min < 0 && max < 0) {
			return max;
		}
		if (min > 0 && max > 0) {
			return min;
		}
		return 0;
	}

	function handlePlusMinus(isPlus) {
		let val = currentValue;
		if (isControlled) {
			if (!isInvalid(currentValue)) {
				val = (Number(currentValue) + Number(isPlus ? step : -1 * step)).toFixed(currentPrecision);
			} else {
				val = getValueByBlank();
			}
		} else {
			if (!isInvalid(currentValue)) {
				const tempValue = (Number(currentValue) + Number(isPlus ? step : -1 * step)).toFixed(currentPrecision);
				if (isPlus) {
					if (getMax(currentValue, max).lessEqualMax) {
						val = tempValue;
					}
				} else if (getMin(currentValue, min).greaterEqualMin) {
					val = tempValue;
				}
			} else {
				val = getValueByBlank();
			}
			setCurrentValue(val);
		}
		if (!isInvalid(val)) {
			val = Number(val);
		}
		onChange(val);
	}

	function handlePlus() {
		if (upButtonEnabled) {
			handlePlusMinus(true);
		}
	}

	function handleMinus() {
		if (downButtonEnabled) {
			handlePlusMinus(false);
		}
	}

	const compClass = cls(`${selector} ${size} ${className}`, {
		[`${selector}-disabled`]: disabled,
		[`${selector}-focused`]: focused
	});
	const upBtnClass = cls(`${selector}-handler ${selector}-handler-up`, {
		[`${selector}-handler-disabled`]: !upButtonEnabled
	});
	const downBtnClass = cls(`${selector}-handler ${selector}-handler-down`, {
		[`${selector}-handler-disabled`]: !downButtonEnabled
	});

	return (
		<div className={compClass} style={style}>
			<div className={`${selector}-handler-wrap`}>
                <span className={upBtnClass} onClick={handlePlus}>
                    <Icon type="up" className={`${selector}-handler-up-icon`}/>
                </span>
				<span className={downBtnClass} onClick={handleMinus}>
                    <Icon type="down" className={`${selector}-handler-down-icon`}/>
                </span>
			</div>
			<div className={`${selector}-handler-input`}>
				<input className={`${selector}-input`}
					   min={min}
					   max={max}
					   step={step}
					   onFocus={handleFocus}
					   onChange={handleChange}
					   onBlur={handleBlur}
					   disabled={disabled}
					   value={currentValue}
					   placeholder={placeholder}
					   {...other} />
			</div>
		</div>
	);
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
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func
};

InputNumber.defaultProps = {
	style: undefined,
	defaultValue: undefined,
	precision: undefined,
	value: undefined,
	className: '',
	min: -Infinity,
	max: Infinity,
	size: 'default',
	placeholder: '请输入...',
	step: 1,
	disabled: false,
	onChange: () => {
	},
	onBlur: () => {
	},
	onFocus: () => {
	}
};
export default InputNumber;
