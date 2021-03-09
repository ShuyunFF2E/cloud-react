import { enumObj } from './constant';

/**
 * 获取月份最大的天数
 * @param year 年，默认是今年
 * @param month 月份
 * @returns {number}
 */
function getMonthMaxDay(year, month) {
	const dealYear = parseInt(year || new Date().getFullYear(), 10);
	const dealMonth = parseInt(month, 10);
	const ary = [1, 3, 5, 7, 8, 10, 12];

	if (dealMonth === 2) {
		// 年份能被4整除并且不能被100整除，或者能被400整除，则为闰年 29
		if ((dealYear % 4 === 0 && dealYear % 100 !== 0) || dealYear % 400 === 0) {
			return 29;
		}
		return 28;
	}
	if (ary.indexOf(dealMonth)) {
		return 31;
	}
	return 30;
}

function getMonthSize(year, month) {
	const now = new Date();
	return new Date(year || now.getFullYear(), month || now.getMonth() + 1, 0).getDate();
}

function getWeekDisplayRange(year, month) {
	const now = new Date();
	const mm = month || now.getMonth();
	const yy = year || now.getFullYear();

	return [new Date(yy, mm - 1, 1).getDay(), new Date(yy, mm, 0).getDay()];
}
// 获取当前年月日时分秒对象
export function displayNow(date = new Date()) {
	const now = new Date(date);
	const newHour = `0${now.getHours()}`;
	const newMinute = `0${now.getMinutes()}`;
	const newSecond = `0${now.getSeconds()}`;
	return {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate(),
		hour: newHour.substr(newHour.length - 2, 2),
		minute: newMinute.substr(newMinute.length - 2, 2),
		second: newSecond.substr(newSecond.length - 2, 2)
	};
}

export function today() {
	const now = new Date();
	return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
// 根据年月获取对应面板的日期详情
function getMonthData(year, month) {
	let _year = year;
	const dRange = getWeekDisplayRange(year, month);
	const monthSize = getMonthSize(year, month);
	const startDay = dRange[0]; // 开始 周几
	const endDay = dRange[1]; // 结束 周几
	const dayBefore = startDay;
	const dayAfter = 6 - endDay;
	const prevMonthDays = [];
	const nextMonthDays = [];
	const curMonthDays = [];
	let prevMonth = null;

	if (month - 1 === 0) {
		prevMonth = 12;
		_year -= 1;
	} else {
		prevMonth = month - 1;
	}

	const prevRange = getMonthSize(_year, prevMonth);

	for (let i = 0; i < dayBefore; ) {
		prevMonthDays.push(prevRange - i);
		i += 1;
	}
	for (let j = 1; j <= dayAfter; ) {
		nextMonthDays.push(j);
		j += 1;
	}
	for (let k = 0; k < monthSize; ) {
		curMonthDays.push(k + 1);
		k += 1;
	}

	const days = [...prevMonthDays, ...curMonthDays, ...nextMonthDays];
	if (days.length < 42) {
		const lastDay = days[days.length - 1];
		const startNextDay = lastDay === monthSize ? 0 : lastDay;
		for (let l = 0; l < 7; ) {
			nextMonthDays.push(startNextDay + l + 1);
			l += 1;
		}
	}

	return {
		prev: prevMonthDays.reverse() || [],
		current: curMonthDays || [],
		next: nextMonthDays || []
	};
}

export function refreshDays(year, month) {
	return getMonthData(year, month);
}

// 格式转换format
export function convert(date, fmt) {
	const { year, month, day, hour, minute, second } = date;
	const currentDate = new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`);
	const o = {
		'm+|M+': month,
		'd+|D+': day,
		'h+': hour,
		'm+': minute,
		's+': second,
		'q+': Math.floor((currentDate.getMonth() + 3) / 3),
		S: currentDate.getMilliseconds()
	};
	let _fmt = fmt;
	if (year && /(y+|Y+)/.test(_fmt)) {
		_fmt = _fmt.replace(RegExp.$1, year.toString().substr(4 - RegExp.$1.length));
	}
	Object.keys(o).forEach(k => {
		if (new RegExp(`(${k})`).test(_fmt)) {
			_fmt = _fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(o[k].toString().length));
		}
	});
	return _fmt;
}

export function formatTime(param, d = '') {
	if (param === '') {
		return d;
	}
	if (param.length === 2) {
		return param;
	}
	return `0${param}`;
}

export function transformObj(date) {
	return date ? displayNow(date) : null;
}

export function formatZero(value) {
	return parseInt(value, 10) < 10 ? `0${parseInt(value, 10)}` : value;
}

/**
 *
 * @param value 校验值
 * @param tempMode 校验类型
 * @param showTimePicker 是否存在时分秒
 * @returns {boolean}
 */
export function checkFormat(value = '', tempMode, showTimePicker) {
	let flag = true;
	const regularYear = /^\d{4}$/;
	const regularMonthDay = /^\d{1,2}$/;

	const splitAry = value.toString().split('/');

	if (tempMode === enumObj.YEAR_MODEL) {
		return regularYear.test(splitAry[0]);
	}

	if (tempMode === enumObj.YEAR_MONTH_MODEL) {
		const [year, month] = splitAry;
		return splitAry.length === 2 && regularYear.test(year) && regularMonthDay.test(month) && month > 0 && month < 13;
	}

	if (tempMode === enumObj.MONTH_DAY_MODEL) {
		const [month, day] = splitAry;
		return (
			splitAry.length === 2 &&
			regularMonthDay.test(month) &&
			regularMonthDay.test(day) &&
			month > 0 &&
			month < 13 &&
			day > 0 &&
			day < getMonthMaxDay('', month) + 1
		);
	}

	if (tempMode === enumObj.DATE_MODEL) {
		const values = value.toString().split(' ');
		const beforeValue = values[0].split('/');
		const [year, month, day] = beforeValue;

		// 校验年月日
		flag = beforeValue.length === 3 && regularYear.test(year) && regularMonthDay.test(month) && regularMonthDay.test(day);

		// 校验正确，判断月份 和 日期是否正确
		if (flag && (month < 1 || month > 12 || day < 1 || day > getMonthMaxDay(year, month))) {
			return false;
		}

		// 存在时分秒
		if (showTimePicker) {
			// 年月日校验不正确
			if (!flag) {
				return false;
			}
			// 年月日校验正确，没有时分秒
			if (!values[1]) {
				return true;
			}
			// 年月日校验正确，存在时分秒
			const afterValue = values[1].split(':');
			const [hour, minute, second] = afterValue;
			if (afterValue.length !== 3 || !hour || !minute || !second || hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
				return false;
			}
		}
	}
	return flag;
}

const utils = {
	convert,
	formatTime,
	refreshDays,
	displayNow,
	today,
	transformObj,
	checkFormat
};

export default utils;
