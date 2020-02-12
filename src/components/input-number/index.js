import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { prefixCls } from '@utils/config';
import noop from '@utils/noop';

import Icon from '../icon';
import { isInvalid, getCurrentValue, getMax, getMin, getValueByBlank, fixDoubleOperation } from './util';
import './index.less';

const selector = `${prefixCls}-input-number`;

function InputNumber(props) {
	const { className, style, placeholder, size, min, max, step, precision, value, defaultValue, disabled, onChange, onBlur, onFocus, ...other } = props;

	const [currentValue, setCurrentValue] = useState('');
	const [upButtonEnabled, setUpButtonEnabled] = useState(true);
	const [downButtonEnabled, setDownButtonEnabled] = useState(true);
	// const [currentPrecision, setCurrentPrecision] = useState(0);
	const [focused, setFocused] = useState(false);
	const [isFirst, setIsFrist] = useState(true);

	let isControlled = value !== undefined; // 受控判断

	function setBtnStatus(isInvalided, isUpEnabled, isDownEnabled) {
		// 非法输入最终会变成空字符串，空字符串默认可+-
		setUpButtonEnabled(isInvalided || isUpEnabled);
		setDownButtonEnabled(isInvalided || isDownEnabled);
	}

	// 使用函数形式，防止首次渲染useEffect触发两次而跳过defaulteValue判断
	// useEffect(() => {
	// 	let pr = '';
	// 	if (precision === undefined || precision === null) {
	// 		pr = Number.isInteger(step) ? 0 : step.toString().split('.')[1].length
	// 		// pr = -1
	// 	} else {
	// 		pr = parseInt(precision, 10);
	// 	}
	// 	setCurrentPrecision(pr);
	// }, [precision, step]);
	
	function getCurrentPrecision(_value = 0) { // 精度判断
		let _precision
		if (precision === undefined || precision === null) {
			const valuePrecision = Number.isInteger(_value) ? 0 : _value.toString().split('.')[1].length
			const stepPrecision =  Number.isInteger(step) ? 0 : step.toString().split('.')[1].length
			_precision = (valuePrecision >= stepPrecision) ? valuePrecision : stepPrecision
		} else {
			_precision = parseInt(precision, 10);
		}
			
		return _precision
	}
	
	function getValue() {
		return isFirst ? defaultValue.toFixed(getCurrentPrecision(defaultValue)) : value
	}

	useEffect(() => {
		isControlled = value !== undefined;
		setCurrentValue(getValue());
		setIsFrist(false)
		setBtnStatus(isInvalid(value), getMax(value, max).lessMax, getMin(value, min).greaterMin);
	}, [value, min, max, precision]);

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
		const val = getCurrentValue(targetValue, min, max, precision);
		setCurrentValue(val);
		onBlur(val);
		onChange(val);
	}

	function handleFocus() {
		setFocused(true);
		onFocus();
	}

	function handlePlusMinus(isPlus) {
		let val = currentValue;
		if (isControlled) {
			if (!isInvalid(currentValue)) {  // 删除值 & 初始
				const _val = fixDoubleOperation(Number(currentValue), Number(isPlus ? step : -1 * step))
				val = getCurrentValue(_val, min, max, getCurrentPrecision(_val));
				// val = currentPrecision >= 0 ? _val.toFixed(currentPrecision) : _val
			} else {
				val = getValueByBlank(min, max, step);
			}
		} else { 
			if (!isInvalid(currentValue)) { // 有value
				const _val = fixDoubleOperation(Number(currentValue), Number(isPlus ? step : -1 * step))
				const tempValue = getCurrentValue(_val, min, max, getCurrentPrecision(_val));
				// const tempValue = currentPrecision >= 0 ? _val.toFixed(currentPrecision) : _val;
				if (isPlus) { // 加
					if (getMax(currentValue, max).lessEqualMax) {
						val = tempValue;
					}
				} else if (getMin(currentValue, min).greaterEqualMin) {
					val = tempValue;
				}
			} else {
				val = getValueByBlank(min, max, step);
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
	onChange: noop,
	onBlur: noop,
	onFocus: noop
};
export default InputNumber;
