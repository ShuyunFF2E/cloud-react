import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../../input';
import { timeSelectorClass } from '../constant';
import { formatNumber } from '../util/view-common';

function InnerTimePicker(props) {
	const { hour, minute, second, label, onChange } = props;
	const inpMinuteRef = React.createRef();
	const inpSecondRef = React.createRef();
	const [tempHour, setTempHour] = useState(hour);
	const [tempMinute, setTempMinute] = useState(minute);
	const [tempSecond, setTempSecond] = useState(second);

	useEffect(() => {
		setTempHour(hour);
	}, [hour]);

	useEffect(() => {
		setTempMinute(minute);
	}, [minute]);

	useEffect(() => {
		setTempSecond(second);
	}, [second]);

	function handleHourChange(event) {
		const { stringValue, numberValue, length } = formatNumber(event.target.value);
		let _value = stringValue;

		if (!Number.isNaN(numberValue)) {
			if (numberValue >= 24) {
				_value = '23';
			}
			// 当输入2位并且有效范围内时，跳转到分钟输入框
			if (numberValue < 24 && length === 2) {
				const ele = inpMinuteRef.current.inputRef.current;
				if (ele) {
					ele.focus();
					ele.select();
				}
			}
		} else {
			_value = '';
		}
		setTempHour(_value);

		onChange({
			hour: _value,
			minute: tempMinute,
			second: tempSecond
		});
	}

	function handleMinuteChange(event) {
		const { stringValue, numberValue, length } = formatNumber(event.target.value);
		let _value = stringValue;

		if (!Number.isNaN(numberValue)) {
			if (numberValue >= 60) {
				_value = '59';
			}
			// 当输入2位并且有效范围内时，跳转到分钟输入框
			if (numberValue < 60 && length === 2) {
				const ele = inpSecondRef.current.inputRef.current;
				if (ele) {
					ele.focus();
					ele.select();
				}
			}
		} else {
			_value = '';
		}

		setTempMinute(_value);

		onChange({
			hour: tempHour,
			minute: _value,
			second: tempSecond
		});
	}

	function handleSecondChange(event) {
		const { stringValue, numberValue } = formatNumber(event.target.value);
		let _value = stringValue;

		if (!Number.isNaN(numberValue)) {
			if (numberValue >= 60) {
				_value = '59';
			}
		} else {
			_value = '';
		}

		setTempSecond(_value);

		onChange({
			hour: tempHour,
			minute: tempMinute,
			second: _value
		});
	}

	return (
		<div className={`inner-${timeSelectorClass}`}>
			<label>{label}</label>
			<Input value={tempHour} maxLength="2" placeholder="小时" onChange={handleHourChange} />
			<label className="colon">:</label>
			<Input ref={inpMinuteRef} value={tempMinute} maxLength="2" placeholder="分钟" onChange={handleMinuteChange} />
			<label className="colon">:</label>
			<Input ref={inpSecondRef} value={tempSecond} maxLength="2" placeholder="秒" onChange={handleSecondChange} />
		</div>
	);
}

InnerTimePicker.propTypes = {
	hour: PropTypes.string,
	minute: PropTypes.string,
	second: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func
};

InnerTimePicker.defaultProps = {
	hour: '00',
	minute: '00',
	second: '00',
	label: '时间：',
	onChange: () => {}
};

export default InnerTimePicker;
