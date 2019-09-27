import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import enumObj from './util/enum';
import { timeSelector } from  './util/view-common';

function InnerTimePicker(props) {
	const { hour, minute, second, mode, label, onChange } = props;

	const [tempHour, setTempHour] = useState(hour);
	const [tempMinute, setTempMinute] = useState(minute);
	const [tempSecond, setTempSecond] = useState(second);

	useEffect(() => {
		setTempHour(hour);
		setTempMinute(minute);
		setTempSecond(second);
	}, [hour, minute, second]);

	function onInpChange(params, evt) {
		let value = evt.target.value.trim().replace(/[^\d]/g, '');
		if (params === enumObj.hour) {
			if (value !== '' && parseInt(value, 10) >= 24) {
				value = value.substr(0, 1);
			}
			setTempHour(value);
		} else if (value !== '' && parseInt(value, 10) >= 60) {
			value = value.substr(0, 1);
			if (params === enumObj.minute) {
				setTempMinute(value);
			} else {
				setTempSecond(value);
			}
		}
		onChange({
			hour: params === enumObj.hour ? value : tempHour,
			minute: params === enumObj.minute ? value : tempMinute,
			second: params === enumObj.second ? value : tempSecond
		});
	}

	return (<div className={`inner-${timeSelector}`}>
		<label>{label}</label>
		<input value={tempHour} maxLength="2" placeholder="小时" onChange={e => onInpChange(enumObj.hour, e)} />
		{
			mode === enumObj.DATE_HOUR ? null :
				<section>
					<label className="colon">:</label><input value={tempMinute} maxLength="2" placeholder="分钟" onChange={e => onInpChange(enumObj.minute, e)} />
				</section>
		}
		{
			mode === enumObj.DATE_HOUR_MINUTE || mode === enumObj.DATE_HOUR ? null :
				<section>
					<label className="colon">:</label><input value={tempSecond} maxLength="2" placeholder="秒" onChange={e => onInpChange(enumObj.second, e)} />
				</section>
		}
	</div>);
}

InnerTimePicker.propTypes = {
	hour: PropTypes.string,
	minute: PropTypes.string,
	second: PropTypes.string,
	mode: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func
}

InnerTimePicker.defaultProps = {
	mode: enumObj.DATE_TIME,
	hour: '00',
	minute: '00',
	second: '00',
	label: '时间：',
	onChange: ()=>{}
}

export default InnerTimePicker;
