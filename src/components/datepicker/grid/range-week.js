import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import utils from '../util';

function isEqualDate(obj, year, month, day) {
	return obj && obj.year === year && obj.month === month && obj.day === day;
}

function RangeWeek(props) {
	// rangeConfig出现在区间选择器时（仅用于年月日模式）
	const { head, tail, days, year, month, minDate, maxDate, checkGridArr, rangeConfig, onPickDate } = props;

	function onDayClick(_year, _month, _day) {
		onPickDate(
			 _year,
			 _month,
			 _day
		);
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
	const today = utils.time.today();
	return (
		<tr>
			{days.map((o, i) => {
				const inMonth = !((head && i < idx) || (tail && idx > -1 &&  i > idx - 1));
				let date = null;
				if (inMonth) {
					date = `${year}/${month}/${o}`;
				} else if (!inMonth && i < idx) {
					date = month > 1 ? `${year}/${month - 1}/${o}` : `${year - 1}/12/${o}`;
				} else if (!inMonth && i > idx - 1) {
					date = month < 12 ? `${year}/${month + 1}/${o}` : `${year + 1}/01/${o}`;
				}
				const isToday = inMonth && (`${year}-${month}-${o}` === today);
				const isCheck = inMonth && (isEqualDate(checkGridArr[0], year, month, o) || isEqualDate(checkGridArr[1], year, month, o));

				const isDisabled = getDisabled(date);
				const classes = cls({
					'check': isCheck,
					'now': isToday,
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


RangeWeek.propTypes = {
	rangeConfig: PropTypes.object,
	checkGridArr: PropTypes.array,
	year: PropTypes.number,
	month: PropTypes.number,
	days: PropTypes.array,
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	head: PropTypes.bool,
	tail: PropTypes.bool,
	onPickDate: PropTypes.func,
}

RangeWeek.defaultProps = {
	year: null,
	month: null,
	rangeConfig: null,
	checkGridArr: [null, null],
	days: [],
	minDate: undefined,
	maxDate: undefined,
	head: true,
	tail: true,
	onPickDate: () => { }
}

export default RangeWeek;
