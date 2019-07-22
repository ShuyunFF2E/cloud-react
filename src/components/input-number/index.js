import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import Icon from '../icon';
import './index.less';

const selector = 'input-number';

function isInvalid(value) {
	return Number.isNaN(value) || value === undefined || value === null || value.toString().trim() === '';
}

function getCurrentValue(value, min, max, precision) {
	if (isInvalid(value)) {
		return '';
	}
	const val = Number(value).toFixed(Math.abs(parseInt(precision, 10)));
	if (val > max) {
		return max;
	} if (val <= max && val >= min) {
		return val;
	}
	return min;
};

function getMax(value, max) {
	return {
		lessEqualMax: isInvalid(value) ? false : Number(value) <= max,
		lessMax: isInvalid(value) ? false : Number(value) < max,
		greaterEqualMax: isInvalid(value) ? false : Number(value) >= max
	};
}

function getMin(value, min) {
	return {
		lessEqualMin: isInvalid(value) ? false : Number(value) <= min,
		greaterMin: isInvalid(value) ? false : Number(value) > min,
		greaterEqualMin: isInvalid(value) ? false : Number(value) >= min
	};
}


function InputNumber(props) {
	const { className, style, placeholder, size, min, max, step, precision, value, defaultValue, disabled, onChange, ...other } = props;

	const [currentValue, setCurrentValue] = useState('');
	const [upButtonEnabled, setUpButtonEnabled] = useState(true);
	const [downButtonEnabled, setDownButtonEnabled] = useState(true);
	const [currentPrecision, setCurrentPrecision] = useState(0);

	let isControlled = value !== undefined;

	function setBtnStatus(isUpEnabled, isDownEnabled) {
		setUpButtonEnabled(isUpEnabled);
		setDownButtonEnabled(isDownEnabled);
	}
	useEffect(() => {
		let _pr = '';
		if( precision === undefined || precision === null) {
			_pr = Number.isInteger(step) ? 0 : step.toString().split('.')[1].length
		}
		else {
			_pr = parseInt(precision, 10);
		}

		// const _pr = precision === undefined || precision === null ?
		// 	Number.isInteger(step) ? 0 : step.toString().split('.')[1].length : parseInt(precision, 10);
		setCurrentPrecision(_pr);
	}, [precision, step]);

	useEffect(() => {
		isControlled = value !== undefined;
		const val = getCurrentValue(value === undefined ? defaultValue : value, min, max, currentPrecision);
		setCurrentValue(val);
		setBtnStatus(getMax(val, max).lessMax, getMin(val, min).greaterMin);
	}, [value, min, max, currentPrecision]);

	useEffect(() => {
		setBtnStatus(getMax(currentValue, max).lessMax, getMin(currentValue, min).greaterMin);
	}, [currentValue, min, max]);



	function handleOnChange(evt) {
		const targetValue = evt.target.value.trim();
		setCurrentValue(targetValue);
		onChange(targetValue);
	}

	function handleBlur(evt) {
		const targetValue = evt.target.value.trim().replace(/[^\-?\d.]/g, '');
		let val = isInvalid(targetValue) ? '' : Number(targetValue).toFixed(currentPrecision);
		val = getCurrentValue(val, min, max, currentPrecision);
		setCurrentValue(val);
	}

	function handlePlusMinus(isPlus) {
		let val = currentValue;
		if (isControlled) {
			if (!isInvalid(currentValue)) {
				val = (Number(currentValue) + Number(isPlus ? step : -1 * step)).toFixed(currentPrecision);
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
				val = ''
			}
			setCurrentValue(val);
		}
		if (!isInvalid(val)) {
			val = Number(val);
		}
		onChange(val);
	}

	function handlePlus() {
		if(upButtonEnabled) {
			handlePlusMinus(true);
		}
	}

	function handleMinus() {
		if(downButtonEnabled) {
			handlePlusMinus(false);
		}
	}

	const compClass = cls(`${selector} ${size} ${className}`, {
		[`${selector}-disabled`]: disabled
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
			<section>
				<input className={`${selector}-input`} min={min} max={max} step={step}
					   onChange={handleOnChange}
					   onBlur={handleBlur}
					   disabled={disabled}
					   value={currentValue}
					   placeholder={placeholder}  {...other} />
			</section>
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
	onChange: PropTypes.func
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
	}
};
export default InputNumber;
