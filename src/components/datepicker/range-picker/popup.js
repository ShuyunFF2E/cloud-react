import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/header';
import Grid from './grid';
import util from '../util';
import enumObj from '../util/enum';
import { rangeSelector } from '../util/view-common';

const defaultYear = new Date().getFullYear();
const defaultMonth = new Date().getMonth() + 1;

function getDateObjArr(checkDateArr, min, max) {
	function getDateObj(value) {
		const defaultTotalMonth = defaultYear * 12 + defaultMonth;
		const minTotalMonth = min.getFullYear() * 12 + min.getMonth() + 1;
		const maxTotalMonth = max.getFullYear() * 12 + max.getMonth() + 1;
		const dateObj = {
			day: null,
			hour: '',
			minute: '',
			second: ''
		};
		if (defaultTotalMonth >= minTotalMonth && defaultTotalMonth <= maxTotalMonth) {
			return { ...dateObj, ...{
				year: defaultYear,
				month: defaultMonth + value
			} };
		}  if (defaultTotalMonth > maxTotalMonth) {
			return { ...dateObj, ...{
				year: max.getFullYear(),
				month: max.getMonth() + 1 + value,
			} };
		}
		return { ...dateObj, ...{
			year: min.getFullYear(),
			month: min.getMonth() + 1 + value
		} };
	}

	const arr = [];
	if (checkDateArr[0]) {
		arr.push(util.displayNow(checkDateArr[0]));
	} else {
		arr.push(getDateObj(0));
	}
	if (checkDateArr[1]) {
		arr.push(util.displayNow(checkDateArr[1]));
	} else {
		arr.push(getDateObj(1));
	}
	return arr;
}

function trans2DateArray(arr) {
	return [new Date(`${arr[0].year}/${arr[0].month}/${arr[0].day}`), new Date(`${arr[1].year}/${arr[1].month}/${arr[1].day}`)]
}

function Popup(props) {
	// checkDateArr为数组，当前rangepicker组件里的值, min/max 都是Date
	const { left, top, min, max, className, checkDateArr, onChange } = props;

	// 需要设计3对min/max, 配置的min/max, 组件A的min/max, 组件B的min/max
	const [tempArrObj, setTempArrObj] = useState(getDateObjArr(checkDateArr, min, max));

	const [tempMin, setTempMin] = useState(min);
	const [tempMax, setTempMax] = useState(max);

	function initEnd(attribute, _startMin) {
		if (attribute) {
			let d = new Date(attribute.valueOf());
			if (_startMin && new Date(`${_startMin.year}/${_startMin.month}/01`).getTime() > d.getTime()) {
				d = new Date(`${_startMin.year}/${_startMin.month}/01`);
			}
			d.setMonth(d.getMonth() + 1);
			return d;
		}
		return attribute;
	}

	// 得到开始组件的max （小于最大值和结束组件的最小值）
	function initStartMax(maxA, maxB) {
		const monthATotal = maxA.getFullYear() * 12 + maxA.getMonth();
		const monthBTotal = maxB.getFullYear() * 12 + maxB.getMonth();
		// 设置的用户可选max小于结束组件月份
		if (monthATotal < monthBTotal) {
			return maxA;
		}
		// 设置的用户可选max月份大于结束组件月份，返回比结束组件小1个月
		// 或者 当两个年月一致时，返回比结束组件小1个月

		const y = maxB.getMonth() === 0 ? maxB.getFullYear() - 1 : maxB.getFullYear();
		const m = maxB.getMonth() === 0 ? 12 : maxB.getMonth();
		return new Date(y, m,0,23,59,59);
	}

	function initTempRange(arrObj) {
		const endMinDate = initEnd(min, arrObj[0]);
		if (arrObj[0].year === arrObj[1].year && arrObj[0].month === arrObj[1].month) {
			const endYear = arrObj[1].month === 12 ?  arrObj[1].year + 1 : arrObj[1].year;
			const endMonth = arrObj[1].month === 12 ? 1 : arrObj[1].month + 1;
			return [
				{
					days: util.refreshDays(arrObj[0].year, arrObj[0].month),
					year: arrObj[0].year,
					month: arrObj[0].month,
					minDate: min,
					maxDate: initStartMax(max, endMinDate)
				},
				{
					days: util.refreshDays(endYear, endMonth),
					year: endYear,
					month: endMonth,
					// 记录End日期框范围（至少大于Start日期框一个月）
					minDate: endMinDate,
					maxDate: initEnd(max),
					// 存储用户设置的可点击区间
					config: {
						min: tempMin,
						max: tempMax
					}
				}
			];
		}

		return [
			{
				days: util.refreshDays(arrObj[0].year, arrObj[0].month),
				year: arrObj[0].year,
				month: arrObj[0].month,
				minDate: min,
				maxDate: initStartMax(max, endMinDate)
			},
			{
				days: util.refreshDays(arrObj[1].year, arrObj[1].month),
				year: arrObj[1].year,
				month: arrObj[1].month,
				// 记录End日期框范围（至少大于Start日期框一个月）
				minDate: endMinDate,
				maxDate: initEnd(max),
				// 存储用户设置的可点击区间
				config: {
					min: tempMin,
					max: tempMax
				}
			}
		]
	}

	function initTempRangeValue() {
		if (checkDateArr.length === 2 && checkDateArr[0] && checkDateArr[1]) {
			return [{
				year: tempArrObj[0].year,
				month: tempArrObj[0].month,
				day: tempArrObj[0].day
			}, {
				year: tempArrObj[1].year,
				month: tempArrObj[1].month,
				day: tempArrObj[1].day
			}];
		}
		return [null, null];
	}

	// 跟年月 下拉框对应的Grid
	const [tempRange, setTempRange] = useState(initTempRange(tempArrObj));
	// 用于选中的值，可能两个值都在同一个Grid，也可能不在一个Grid
	const [tempRangeValue, setTempRangeValue] = useState(initTempRangeValue());

	useEffect(() => {
		const _tempArr = getDateObjArr(checkDateArr, tempRange[0].minDate,  tempRange[0].maxDate)
		setTempArrObj(_tempArr);
		setTempRange(initTempRange(_tempArr));
	}, [checkDateArr]);

	useEffect(() => {
		setTempMin(min);
		setTempMax(max);

		const _tempEndMin = initEnd(min, tempArrObj[0]);
		const _tempEndMax = initEnd(max);

		const range = [...tempRange];
		range[0].minDate = min;
		range[0].maxDate =  initStartMax(max, _tempEndMin);
		range[1].minDate = _tempEndMin;
		range[1].maxDate = _tempEndMax;
		range[1].config = {
			min,
			max
		};
		setTempRange(range);
	}, [min, max]);

	function onGridChange(values) {
		setTempRangeValue(values);
	}

	function onOK(value) {
		if (value[0] && value[1]) {
			onChange(trans2DateArray(value));
		}
	}

	function popClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
	}
	// Header年月发生变化时，需要动态计算上/下一个的月份详情
	function onHeaderChange(y, m, old, type) {
		const range = [...tempRange];
		if (type === enumObj.START) {
			const d0 = tempArrObj[0];
			d0.year = y;
			d0.month = m;
			setTempArrObj([d0, tempArrObj[1]]);

			const _min = initEnd(min, d0);

			range[0].days = util.refreshDays(y, m);
			range[0].year = y;
			range[0].month = m;
			range[1].minDate = _min;
			range[1].config.min = _min;
			setTempRange(range);

		} else {
			const d1 = tempArrObj[1];
			d1.year = y;
			d1.month = m;
			setTempArrObj([tempArrObj[0], d1]);

			range[1].days = util.refreshDays(y, m);
			range[1].year = y;
			range[1].month = m;

			range[0].maxDate = initStartMax(max, new Date(`${y}/${m}/01`));
			setTempRange(range);
		}

		const rValue = [...tempRangeValue];
		if (tempRangeValue[0] && old.year === tempRangeValue[0].year && old.month === tempRangeValue[0].month) {
			rValue[0] = null;
		}
		if (tempRangeValue[1] && old.year === tempRangeValue[1].year && old.month === tempRangeValue[1].month) {
			rValue[1] = null;
		}
		setTempRangeValue(rValue);
	}

	return (
		<div className={`${rangeSelector}-popup ${className}`} style={{ left, top }} onClick={popClick}>
			<div className={`${rangeSelector}-popup-container`}>
				<Header
					month={tempRange[0].month}
					year={tempRange[0].year}
					onChange={(y, m, old) => onHeaderChange(y, m, old, enumObj.START)}
					min={util.transformObj(tempRange[0].minDate)}
					max={util.transformObj(tempRange[0].maxDate)}
					style={{ width:250, marginRight: '8px' }}
				/>
				<Header
					month={tempRange[1].month}
					year={tempRange[1].year}
					onChange={(y, m, old) => onHeaderChange(y, m, old, enumObj.END)}
					min={util.transformObj(tempRange[1].minDate)}
					max={util.transformObj(tempRange[1].maxDate)}
					style={{ width:250 }}
				/>
			</div>
			<Grid
				range={tempRange}
				rangValue={tempRangeValue}
				onChange={onGridChange}
				onOK={onOK}
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
