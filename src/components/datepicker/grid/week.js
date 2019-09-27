import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import utils from '../util';


function Week(props) {
	const { head, tail, year, month, day, days, minDate, maxDate, isClickDay, currentDateObj, onPickDate } = props;

	function onDayClick(_year, _month, _day) {
		onPickDate({
			year: _year,
			month: _month,
			day: _day
		});
	}

	function getDisabled(date) {
		const currentTimeStamp = new Date(date).getTime();
		return minDate && currentTimeStamp < new Date(minDate).getTime() || maxDate && currentTimeStamp > new Date(maxDate).getTime();
	}

	const idx = days.indexOf(1);
	const today = utils.time.today();
	return (
		<tr>
			{days.map((o, i) => {
				const inMonth = !((head && i < idx) || (tail && idx > -1 &&  i > idx - 1));
				let date = null;
				if (inMonth) {
					date = `${year}-${month}-${o}`;
				} else if (!inMonth && i < idx) {
					date = `${year}-${month - 1}-${o}`;
				} else if (!inMonth && i > idx - 1) {
					date = `${year}-${month + 1}-${o}`;
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


Week.propTypes = {
	year: PropTypes.number,
	month: PropTypes.number,
	days: PropTypes.array,
	day: PropTypes.number,
	isClickDay: PropTypes.bool,
	currentDateObj: PropTypes.object,
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	head: PropTypes.bool,
	tail: PropTypes.bool,
	onPickDate: PropTypes.func,
}

Week.defaultProps = {
	year: utils.time.displayNow.year,
	month: utils.time.displayNow.month,
	days: [],
	isClickDay: false,
	day: utils.time.displayNow.day,
	currentDateObj: null,
	minDate: undefined,
	maxDate: undefined,
	head: true,
	tail: true,
	onPickDate: () => { }
}

export default Week;
