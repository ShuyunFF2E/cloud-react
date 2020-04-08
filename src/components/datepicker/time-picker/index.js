import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import utils from '../util';
import { timeSelector } from '../util/view-common';

function TimePicker(props) {
	const { value, defaultValue, className, style, disabled, onChange, onBlur } = props;
	const controlled = typeof value !== 'undefined' && value;
	const inpMinuteRef = React.createRef();
	const inpSecondRef = React.createRef();

	function getValue() {
		if (controlled) {
			return typeof value === 'string' ? value.split(':') : [value.hour, value.minute, value.second];
		}
		if (defaultValue !== undefined) {
			return defaultValue.split(':');
		}
		return ['00', '00', '00'];
	}

	const [hour, setHour] = useState(getValue()[0]);
	const [minute, setMinute] = useState(getValue()[1]);
	const [second, setSecond] = useState(getValue()[2]);
	const [temp, setTemp] = useState('');
	// fix field timePicker
	const memoValue = useMemo(() => {
		return getValue();
	}, [getValue()]);

	useEffect(() => {
		setHour(memoValue[0]);
	}, [memoValue[0]]);

	useEffect(() => {
		setMinute(memoValue[1]);
	}, [memoValue[1]]);

	useEffect(() => {
		setSecond(memoValue[2]);
	}, [memoValue[2]]);

	function onHourChange(evt) {
		let inpValue = evt.target.value.trim().replace(/[^\d]/g, '');
		if (inpValue !== '' && parseInt(inpValue, 10) >= 24) {
			inpValue = inpValue.substr(0, 1);
		} else if (inpValue !== '' && parseInt(inpValue, 10) < 24 && inpValue.toString().length === 2) {
			// 当输入2位并且有效范围内时，跳转到分钟输入框
			inpMinuteRef.current.focus();
			inpMinuteRef.current.select();
		}
		// 受控时，状态依赖外部。非受控时，内部直接set
		if (!controlled) {
			setHour(inpValue);
		}
		onChange({
			hour: inpValue,
			minute,
			second
		});
	}

	function onMinuteChange(evt) {
		let inpValue = evt.target.value.trim().replace(/[^\d]/g, '');
		if (inpValue !== '' && parseInt(inpValue, 10) >= 60) {
			inpValue = inpValue.substr(0, 1);
		} else if (inpValue !== '' && parseInt(inpValue, 10) < 60 && inpValue.toString().length === 2) {
			// 当输入2位并且有效范围内时，跳转到秒输入框
			inpSecondRef.current.focus();
			inpSecondRef.current.select();
		}
		// 受控时，状态依赖外部。非受控时，内部直接set
		if (!controlled) {
			setMinute(inpValue);
		}
		onChange({
			hour,
			minute: inpValue,
			second
		});
	}

	function onSecondChange(evt) {
		let inpValue = evt.target.value.trim().replace(/[^\d]/g, '');
		if (inpValue !== '' && parseInt(inpValue, 10) >= 60) {
			inpValue = inpValue.substr(0, 1);
		}
		// 受控时，状态依赖外部。非受控时，内部直接set
		if (!controlled) {
			setSecond(inpValue);
		}
		onChange({
			hour,
			minute,
			second: inpValue
		});
	}

	function onInpBlur() {
		setHour(utils.formatTime(hour, temp || '00'));
		setMinute(utils.formatTime(minute, temp || '00'));
		setSecond(utils.formatTime(second, temp || '00'));
		onBlur();
	}

	function onInpFocus(type = '') {
		switch (type) {
			case 'hour':
				setTemp(hour);
				setHour('');
				break;
			case 'minute':
				setTemp(minute);
				setMinute('');
				break;
			case 'second':
				setTemp(second);
				setSecond('');
				break;
			default:
				break;
		}
	}

	const classes = cls({
		[timeSelector]: true,
		[`${timeSelector}-disabled`]: disabled,
		[className]: true
	});

	return (
		<div className={classes} onBlur={onInpBlur} style={style}>
			<input value={hour} disabled={disabled} onFocus={() => onInpFocus('hour')} maxLength="2" onChange={onHourChange} />
			<label className="colon">:</label>
			<input ref={inpMinuteRef} value={minute} onFocus={() => onInpFocus('minute')} disabled={disabled} maxLength="2" onChange={onMinuteChange} />
			<label className="colon">:</label>
			<input ref={inpSecondRef} value={second} onFocus={() => onInpFocus('second')} disabled={disabled} maxLength="2" onChange={onSecondChange} />
		</div>
	);
}
TimePicker.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	defaultValue: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
};
TimePicker.defaultProps = {
	className: '',
	style: {},
	value: undefined,
	defaultValue: '00:00:00',
	disabled: false,
	onChange: () => {},
	onBlur: () => {}
};
export default TimePicker;
