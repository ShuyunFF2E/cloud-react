import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'cloud-react/button';
import Week from './week';
import utils from '../util';
import InnerTimePicker from './inner-time-picker';
import { selector } from '../util/view-common';

function Grid(props) {
	const {
		days,
		year,
		month,
		day,
		hour,
		minute,
		second,
		showNow,
		showToday,
		mode,
		minDate,
		maxDate,
		rangeConfig,
		onPickDate,
		showOK,
		showTimePicker,
		style,
		onTimePickChange,
		onOK
	} = props;

	const [tempDay, setTempDay] = useState(day);
	const [isClickDay, setIsClickDay] = useState(false);

	const [tempHour, setTempHour] = useState(hour);
	const [tempMinute, setTempMinute] = useState(minute);
	const [tempSecond, setTempSecond] = useState(second);
	const openTime = utils.displayNow();
	const _hour = (!showTimePicker && openTime.hour) || hour;
	const _minute = (!showTimePicker && openTime.minute) || minute;
	const _second = (!showTimePicker && openTime.second) || second;

	useEffect(() => {
		setTempDay(day);
	}, [day]);

	useEffect(() => {
		setTempHour(hour);
	}, [hour]);

	useEffect(() => {
		setTempMinute(minute);
	}, [minute]);

	useEffect(() => {
		setTempSecond(second);
	}, [second]);

	function onPickDay(paramsObj) {
		setIsClickDay(true);
		onPickDate(paramsObj);
	}

	function getTodayDisabled() {
		const nowTimestamp = new Date().getTime();
		if (minDate && minDate.getTime() > nowTimestamp) {
			return true;
		}
		return !!(maxDate && maxDate.getTime() < nowTimestamp);
	}

	function getOkButtonDisabled() {
		const currentTime = new Date(`${year}/${month}/${tempDay} ${_hour}:${_minute}:${_second}`).getTime();
		if (minDate && minDate.getTime() > currentTime) {
			return true;
		}
		return !!(maxDate && maxDate.getTime() < currentTime);
	}

	function onToadyClick() {
		onOK(utils.displayNow());
	}

	function onSave() {
		const nowTime = utils.displayNow();
		if (tempDay) {
			onOK(utils.displayNow(new Date(`${year}/${month}/${tempDay} ${hour || nowTime.hour}:${minute || nowTime.minute}:${second || nowTime.second}`)));
		}
	}

	const btnStyle = rangeConfig || (!showTimePicker && showToday) || (showTimePicker && showNow) ? {} : { justifyContent: 'flex-end' };
	const len = Math.ceil(days.length / 7);
	return (
		<div className="grid" style={style}>
			<table className="grid-table">
				<thead>
					<tr>
						{utils.miniWeek.map((e, i) => (
							<th key={i.toString()}>{e}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{utils.range(len).map((e, i) => (
						<Week
							key={i.toString()}
							currentDateObj={{
								year,
								month,
								day: tempDay
							}}
							rangeConfig={rangeConfig}
							year={year}
							month={month}
							day={tempDay}
							time={`${_hour}:${_minute}:${_second}`}
							isClickDay={isClickDay}
							minDate={minDate}
							maxDate={maxDate}
							onPickDate={onPickDay}
							days={days.slice(i * 7, (i + 1) * 7)}
							head={i === 0}
							tail={i === len - 1}
						/>
					))}
				</tbody>
			</table>
			{showTimePicker && <InnerTimePicker onChange={onTimePickChange} mode={mode} hour={tempHour} minute={tempMinute} second={tempSecond} />}
			<div className={`${selector}-popup-btns`} style={btnStyle}>
				{showToday && !showTimePicker && (
					<Button size="small" disabled={getTodayDisabled()} onClick={onToadyClick}>
						今天
					</Button>
				)}
				{showNow && showTimePicker && (
					<Button size="small" onClick={onToadyClick}>
						此刻
					</Button>
				)}
				{showOK && (
					<Button type="primary" size="small" disabled={!tempDay || getOkButtonDisabled()} onClick={onSave}>
						确定
					</Button>
				)}
			</div>
		</div>
	);
}

Grid.propTypes = {
	rangeConfig: PropTypes.object,
	style: PropTypes.object,
	year: PropTypes.number,
	month: PropTypes.number,
	days: PropTypes.array,
	day: PropTypes.number,
	hour: PropTypes.string,
	minute: PropTypes.string,
	second: PropTypes.string,
	mode: PropTypes.string,
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	showTimePicker: PropTypes.bool,
	showNow: PropTypes.bool,
	showToday: PropTypes.bool,
	showOK: PropTypes.bool,
	onPickDate: PropTypes.func,
	onTimePickChange: PropTypes.func,
	onOK: PropTypes.func
};

Grid.defaultProps = {
	rangeConfig: undefined,
	style: {},
	mode: undefined,
	year: utils.displayNow.year,
	month: utils.displayNow.month,
	days: [],
	day: utils.displayNow.day,
	hour: '',
	minute: '',
	second: '',
	minDate: undefined,
	maxDate: undefined,
	showToday: false,
	showNow: false,
	showTimePicker: false,
	showOK: true,
	onPickDate: () => {},
	onTimePickChange: () => {},
	onOK: () => {}
};

export default Grid;
