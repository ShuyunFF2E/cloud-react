import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import utils from './util';
import enumObj from './util/enum';
import { timeSelector } from './util/view-common';

function TimePicker(props) {
	const { value, defaultValue, className, style, disabled, onChange, onBlur } = props;
	const controlled = typeof value !== 'undefined';

	function getInitValue() {
		let initValue = null;
		if(controlled) {
			initValue = value ? value.split(':') : ['00', '00', '00'];
		}
		else if (defaultValue !== undefined) {
			initValue = defaultValue.split(':')
		}
		else {
			initValue = ['00', '00', '00'];
		}
		return initValue;
	}

	const [hour, setHour] = useState(getInitValue()[0]);
	const [minute, setMinute] = useState(getInitValue()[1]);
	const [second, setSecond] = useState(getInitValue()[2]);

	useEffect(() => {
		if (value) {
			const arr = value.split(':');
			setHour(utils.time.formatTime(arr[0]));
			setMinute(utils.time.formatTime(arr[1]));
			setSecond(utils.time.formatTime(arr[2]));
		} else {
			setHour('00');
			setMinute('00');
			setSecond('00');
		}

	}, [value]);

	function onInpChange(params, evt) {
		let inpValue = evt.target.value.trim().replace(/[^\d]/g, '');
		if (params === enumObj.hour) {
			if (inpValue !== '' && parseInt(inpValue, 10) >= 24) {
				inpValue = inpValue.substr(0, 1);
			}
		} else if (inpValue !== '' && parseInt(inpValue, 10) >= 60) {
			inpValue = inpValue.substr(0, 1);
		}

		if (controlled) {
			onChange({
				hour: params === enumObj.hour ? inpValue : hour,
				minute: params === enumObj.minute ? inpValue : minute,
				second: params === enumObj.second ? inpValue : second
			});
			return;
		}

		switch (params) {
			case enumObj.hour:
				setHour(inpValue);
				break;
			case enumObj.minute:
				setMinute(inpValue);
				break;
			case enumObj.second:
				setSecond(inpValue);
				break;
			default:
				break;
		}
		onChange({
			hour: params === enumObj.hour ? inpValue : hour,
			minute: params === enumObj.minute ? inpValue : minute,
			second: params === enumObj.second ? inpValue : second
		});
	}


	function onInpBlur() {
		setHour(utils.time.formatTime(hour,'00'));
		setMinute(utils.time.formatTime(minute, '00'));
		setSecond(utils.time.formatTime(second, '00'));
		onBlur();
	}

	const classes = cls({
		[timeSelector]: true,
		[`${timeSelector}-disabled`]: disabled,
		[className]: true,
	});

	return (<div className={classes} onBlur={onInpBlur} style={style}>
		<input value={hour} disabled={disabled} maxLength="2" onChange={e => onInpChange(enumObj.hour,e)} /><label className="colon">:</label>
		<input value={minute} disabled={disabled} maxLength="2" onChange={e => onInpChange(enumObj.minute,e)} /><label className="colon">:</label>
		<input value={second} disabled={disabled} maxLength="2" onChange={e => onInpChange(enumObj.second,e)} />
	</div>);

}
TimePicker.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	value: PropTypes.string,
	defaultValue: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
}
TimePicker.defaultProps = {
	className: '',
	style: {},
	value: undefined,
	defaultValue: '00:00:00',
	disabled: false,
	onChange: () => { },
	onBlur: () => { }
}
export default TimePicker
