import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import enumObj from '../util/enum';
import { timeSelector } from '../util/view-common';

function InnerTimePicker(props) {
	const { hour, minute, second, mode, label, onChange } = props;
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

	function onInpChange(params, evt) {
		let value = evt.target.value.trim().replace(/[^\d]/g, '');
		if (params === enumObj.HOUR) {
			if (value !== '' && parseInt(value, 10) >= 24) {
				value = value.substr(0, 1);
			} else if (value !== '' && parseInt(value, 10) < 24 && value.toString().length === 2) {
				// 当输入2位并且有效范围内时，跳转到分钟输入框
				if (inpMinuteRef.current) {
					inpMinuteRef.current.focus();
					inpMinuteRef.current.select();
				}
			}
			setTempHour(value);
		} else if (value !== '' && parseInt(value, 10) >= 60) {
			value = value.substr(0, 1);
			if (params === enumObj.MINUTE) {
				setTempMinute(value);
			} else {
				setTempSecond(value);
			}
		} else if (params === enumObj.MINUTE && value !== '' && parseInt(value, 10) < 60 && value.toString().length === 2) {
			// 当输入2位并且有效范围内时，跳转到秒输入框
			if (inpSecondRef.current) {
				inpSecondRef.current.focus();
				inpSecondRef.current.select();
			}
		}
		onChange({
			hour: params === enumObj.HOUR ? value : tempHour,
			minute: params === enumObj.MINUTE ? value : tempMinute,
			second: params === enumObj.SECOND ? value : tempSecond
		});
	}

	return (<div className={`inner-${timeSelector}`}>
		<label>{label}</label>
		<input value={tempHour} maxLength="2" placeholder="小时" onChange={e => onInpChange(enumObj.HOUR, e)} />
		{
			mode === enumObj.DATE_HOUR ? null :
				<section>
					<label className="colon">:</label>
					<input ref={inpMinuteRef} value={tempMinute} maxLength="2" placeholder="分钟"
						   onChange={e => onInpChange(enumObj.MINUTE, e)} />
				</section>
		}
		{
			mode === enumObj.DATE_HOUR_MINUTE || mode === enumObj.DATE_HOUR ? null :
				<section>
					<label className="colon">:</label>
					<input ref={inpSecondRef} value={tempSecond} maxLength="2" placeholder="秒"
						   onChange={e => onInpChange(enumObj.SECOND, e)} />
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
