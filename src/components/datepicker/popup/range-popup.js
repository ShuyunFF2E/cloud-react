import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Grid from '../grid/grid';
import util from '../util';
import enumObj from '../util/enum';
import { rangeSelector } from  '../util/view-common';

const defaultYear = new Date().getFullYear();
const defaultMonth = new Date().getMonth() + 1;

function getDateObjArr(checkDateArr, min, max) {
	function getDateObj(value) {
		const defaultTotalMonth = defaultYear * 12 + defaultMonth;
		const minTotalMonth = min.getFullYear() * 12 + min.getMonth() + 1;
		const maxTotalMonth =  max.getFullYear() * 12 + max.getMonth() + 1

		if (defaultTotalMonth  >= minTotalMonth &&  defaultTotalMonth <= maxTotalMonth) {
			return  {
				year: defaultYear,
				month: defaultMonth + value,
				day: null,
				hour: '',
				minute: '',
				second: ''
			};
		}  if (defaultTotalMonth > maxTotalMonth) {
			return {
				year: max.getFullYear(),
				month: max.getMonth() + 1 + value,
				day: null,
				hour: '',
				minute: '',
				second: ''
			};
		}
		return {
			year: min.getFullYear(),
			month: min.getMonth() + 1 + value,
			day: null,
			hour: '',
			minute: '',
			second: ''
		};
	}

	const arr = [];
	if (checkDateArr[0]) {
		arr.push(util.time.displayNow(checkDateArr[0]));
	} else {
		arr.push(getDateObj(0));
	}
	if (checkDateArr[1]) {
		arr.push(util.time.displayNow(checkDateArr[1]));
	} else {
		arr.push(getDateObj(1));
	}
	return arr;
}

function trans2DateArray(arr) {
	return [new Date(`${arr[0].year}/${arr[0].month}/${arr[0].day}`), new Date(`${arr[1].year}/${arr[1].month}/${arr[1].day}`)]
}

function Popup(props) {
	// checkDateArr为数组，当前rangepicker组件里的值,  min/max 都是Date
	const { left, top, min, max, className, checkDateArr, onChange } = props;

	const [tempMin, setTempMin] = useState(min);
	const [tempMax, setTempMax] = useState(max);
	const [tempArrObj, setTempArrObj] = useState(getDateObjArr(checkDateArr, tempMin, tempMax));

	useEffect(() => {
		setTempArrObj(getDateObjArr(checkDateArr, tempMin, tempMax))
	}, [checkDateArr]);
	useEffect(() => {
		setTempMin(min);
		setTempMax(max);
	}, [min, max]);


	function onPickDate(obj, type) {
		const { year, month, day } = obj;
		if (type === enumObj.START) {
			const d0 = tempArrObj[0];
			d0.year = year;
			d0.month = month;
			d0.day = day;
			setTempArrObj([d0, tempArrObj[1]]);
		} else {
			const d1 = tempArrObj[1];
			d1.year = year;
			d1.month = month;
			d1.day = day;
			setTempArrObj([tempArrObj[0], d1]);
		}
	}

	function onOK() {
		if (tempArrObj[0].day && tempArrObj[1].day) {
			onChange(trans2DateArray(tempArrObj));
		}
	}

	function popClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
	}

	function onHeaderChange(y, m, type) {
		if (type === enumObj.START) {
			const d0 = tempArrObj[0];
			d0.year = y;
			d0.month = m;
			setTempArrObj([d0, tempArrObj[1]]);
		} else {
			const d1 = tempArrObj[1];
			d1.year = y;
			d1.month = m;
			setTempArrObj([tempArrObj[0], d1]);
		}
	}

	const startObj = tempArrObj[0];
	const endObj = tempArrObj[1];
	const startDays = util.time.refreshDays(startObj.year, startObj.month);
	const endDays = util.time.refreshDays(endObj.year, endObj.month);
	return (
		<div className={`${rangeSelector}-popup ${className}`} style={{ left, top }} onClick={popClick}>
			<div className={`${rangeSelector}-popup-container`}>
				<Header
					month={startObj.month}
					year={startObj.year}
					onChange={(y,m) => onHeaderChange(y,m,enumObj.START)}
					min={util.transformObj(tempMin)}
					max={util.transformObj(tempMax)}
					style={{ width:250, borderRight:'none' }}/>
				<Header
					month={endObj.month}
					year={endObj.year}
					onChange={(y,m) => onHeaderChange(y,m,enumObj.END)}
					min={util.transformObj(tempMin)}
					max={util.transformObj(tempMax)}
					style={{ width:250, borderLeft:'none' }}/>
			</div>
			<div className={`${rangeSelector}-popup-container`}>
				<Grid
					style={{ borderRight:'none' }}
					range
					days={startDays}
					year={startObj.year}
					month={startObj.month}
					day={startObj.day}
					hour={startObj.hour}
					minute={startObj.minute}
					second={startObj.second}
					showTimePicker={false}
					showToday={false}
					showNow={false}
					showOK={false}
				    minDate={tempMin}
				    maxDate={tempMax}
					onPickDate={obj => onPickDate(obj, enumObj.START)}
				/>
				<Grid
					range
					days={endDays}
					year={endObj.year}
					month={endObj.month}
					day={endObj.day}
					hour={endObj.hour}
					minute={endObj.minute}
					second={endObj.second}
					showTimePicker={false}
					showToday={false}
					showNow={false}
					minDate={tempMin}
					maxDate={tempMax}
					onOK={onOK}
					onPickDate={obj => onPickDate(obj, enumObj.END)}
				/>
			</div>
		</div>
	);
}

Popup.propTypes = {
	className: PropTypes.string,
	left: PropTypes.number,
	top: PropTypes.number,
	min: PropTypes.instanceOf(Date),
	max: PropTypes.instanceOf(Date),
	checkDateArr: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
	onChange: PropTypes.func
}

Popup.defaultProps = {
	left: 0,
	top: 0,
	min: undefined,
	max: undefined,
	className: '',
	checkDateArr:[null, null],
	onChange: () => { }
}

export default Popup;
