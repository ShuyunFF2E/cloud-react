import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import utils from '../util';


function Week(props) {
	// rangeConfig出现在区间选择器时（仅用于年月日模式）
	const { head, tail, year, month, day, days, time, minDate, maxDate, isClickDay, currentDateObj, rangeConfig, onPickDate } = props;

	function onDayClick(_year, _month, _day) {
		onPickDate({
			year: _year,
			month: _month,
			day: _day
		});
	}

	function getDisabled(date) {
		const currentTimeStamp = new Date(date).getTime();
		let defaultRange = false;
		if (rangeConfig) {
			defaultRange = rangeConfig.min && currentTimeStamp < rangeConfig.min.getTime() || rangeConfig.max && currentTimeStamp > rangeConfig.max.getTime();
		}
		return defaultRange || minDate && currentTimeStamp < new Date(minDate).getTime() || maxDate && currentTimeStamp > new Date(maxDate).getTime();
	}

	const idx = days.indexOf(1);
	const today = utils.today();
	return (
		<tr>
			{days.map((o, i) => {
				const inMonth = !((head && i < idx) || (tail && idx > -1 &&  i > idx - 1));
				let date = null;
				if (inMonth) {
					date = `${year}/${month}/${o} ${time}`;
				} else if (!inMonth && i < idx) {
					date = month > 1 ? `${year}/${month - 1}/${o} ${time}` : `${year - 1}/12/${o} ${time}`;
				} else if (!inMonth && i > idx - 1) {
					date = month < 12 ? `${year}/${month + 1}/${o} ${time}` : `${year + 1}/01/${o} ${time}`;
				}
				const isToday = inMonth && (`${year}-${month}-${o}` === today);
				let isCheck = false;
				// 是否已经点击过了，此时数据尚未写入Input中，只是临时保存
				if (isClickDay) {
					isCheck = o === day && inMonth;
				} else if (currentDateObj !== null && inMonth) {
					isCheck = `${year}-${month}-${o}` === `${currentDateObj.year}-${currentDateObj.month}-${currentDateObj.day}`;
				}

				const isDisabled = getDisabled(date);
				const classes = cls({
					'grid-check': isCheck,
					'grid-now': isToday,
					'not-included': !inMonth,
					'day-disabled': isDisabled
				});
				let _month = month;
				let _year = year;

				if ( tail && idx > -1 &&  i > idx - 1) {
					if (parseInt(month,10) === 12) {
						_month = 1;
						_year = year + 1;
					} else {
						_month = month + 1;
					}
				}
				if (head && i < idx) {
					if (parseInt(month,10) === 1) {
						_month = 12;
						_year = year - 1;
					} else {
						_month = month - 1;
					}
				}

				return (<td className={classes} key={`${_year}-${_month}-${o}`} data-i={`${_year}-${_month}-${o}`}>
					<span onClick={() => !isDisabled && onDayClick(_year, _month, o) }>{o}</span>
				</td>);
			})}
		</tr>
	)
}


Week.propTypes = {
	rangeConfig: PropTypes.object,
	year: PropTypes.number,
	month: PropTypes.number,
	days: PropTypes.array,
	day: PropTypes.number,
	time: PropTypes.string,
	isClickDay: PropTypes.bool,
	currentDateObj: PropTypes.object,
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	head: PropTypes.bool,
	tail: PropTypes.bool,
	onPickDate: PropTypes.func,
}

Week.defaultProps = {
	rangeConfig: undefined,
	year: utils.displayNow.year,
	month: utils.displayNow.month,
	days: [],
	isClickDay: false,
	day: utils.displayNow.day,
	currentDateObj: null,
	minDate: undefined,
	maxDate: undefined,
	time: '00:00:00',
	head: true,
	tail: true,
	onPickDate: () => { }
}

export default Week;
