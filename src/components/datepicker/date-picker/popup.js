import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/header';
import Grid from './grid';
import util from '../util';
import { selectorClass } from '../constant';
// import { selector } from '../util/view-common';

const defaultDateObj = util.displayNow(new Date());

function Popup(props) {
	const { left, top, min, max, mode, className, showToday, showNow, showTimePicker, checkDateObj, onChange, maxYear, minYear, defaultTime } = props;
	const _defaultTimes = defaultTime.split(':');

	const [tempYear, setTempYear] = useState(checkDateObj ? checkDateObj.year : defaultDateObj.year);
	const [tempMonth, setTempMonth] = useState(checkDateObj ? checkDateObj.month : defaultDateObj.month);
	const [tempDay, setTempDay] = useState(checkDateObj ? checkDateObj.day : null);

	const [tempHour, setTempHour] = useState(checkDateObj ? checkDateObj.hour : _defaultTimes[0]);
	const [tempMinute, setTempMinute] = useState(checkDateObj ? checkDateObj.minute : _defaultTimes[1]);
	const [tempSecond, setTempSecond] = useState(checkDateObj ? checkDateObj.second : _defaultTimes[2]);

	useEffect(() => {
		if (checkDateObj) {
			setTempMonth(checkDateObj.month);
			setTempYear(checkDateObj.year);
			setTempDay(checkDateObj.day);

			setTempHour(checkDateObj.hour);
			setTempMinute(checkDateObj.minute);
			setTempSecond(checkDateObj.second);
		}
	}, [checkDateObj]);

	function onHeaderChange(year, month) {
		setTempMonth(month);
		setTempYear(year);
	}

	function popClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
	}

	function onChoose(paramsObj) {
		onChange(paramsObj);
	}

	function onPickDate(paramsObj) {
		setTempYear(paramsObj.year);
		setTempMonth(paramsObj.month);
		setTempDay(paramsObj.day);
	}

	function onTimePickChange(paramsObj) {
		setTempHour(paramsObj.hour);
		setTempMinute(paramsObj.minute);
		setTempSecond(paramsObj.second);
	}
	const days = tempYear && tempMonth ? util.refreshDays(tempYear, tempMonth) : util.refreshDays(defaultDateObj.year, defaultDateObj.month);

	return (
		<div className={`${selectorClass}-popup ${className}`} style={{ left, top }} onClick={popClick}>
			<Header
				min={util.transformObj(min)}
				max={util.transformObj(max)}
				month={tempMonth}
				year={tempYear}
				maxYear={maxYear}
				minYear={minYear}
				onChange={onHeaderChange}
			/>
			<Grid
				mode={mode}
				days={days}
				day={tempDay}
				month={tempMonth}
				year={tempYear}
				hour={tempHour}
				minute={tempMinute}
				second={tempSecond}
				minDate={min || new Date(`${minYear}/1/1`)}
				maxDate={max || new Date(`${maxYear}/12/31`)}
				showTimePicker={showTimePicker}
				showToday={showToday}
				showNow={showNow}
				onPickDate={onPickDate}
				onOK={onChoose}
				onTimePickChange={onTimePickChange}
			/>
		</div>
	);
}

Popup.propTypes = {
	className: PropTypes.string,
	left: PropTypes.number,
	top: PropTypes.number,
	min: PropTypes.instanceOf(Date),
	max: PropTypes.instanceOf(Date),
	mode: PropTypes.string,
	checkDateObj: PropTypes.object,
	showToday: PropTypes.bool,
	showTimePicker: PropTypes.bool,
	onChange: PropTypes.func
};

Popup.defaultProps = {
	className: '',
	left: 0,
	top: 0,
	mode: undefined,
	showToday: false,
	showTimePicker: false,
	checkDateObj: undefined,
	min: undefined,
	max: undefined,
	onChange: () => {}
};

export default Popup;
