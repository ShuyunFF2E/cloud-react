import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { today } from '../utils';

class Week extends Component {
	onDayClick = (_year, _month, _day) => {
		this.props.onPickDate({
			year: _year,
			month: _month,
			day: _day
		});
	};

	getDisabled = date => {
		const { minDate, maxDate } = this.props;

		const currentTimeStamp = new Date(date);
		const minDateStamp = new Date(minDate);
		const maxDateStamp = new Date(maxDate);

		if (minDate && currentTimeStamp.getTime() <= minDateStamp.getTime()) {
			if (currentTimeStamp.getDate() === minDateStamp.getDate()) {
				return false;
			}
			return true;
		}

		if (maxDate && currentTimeStamp.getTime() >= maxDateStamp.getTime()) {
			if (currentTimeStamp.getDate() === maxDateStamp.getDate()) {
				return false;
			}
			return true;
		}
		return false;
	};

	render() {
		const { head, tail, days, time, currentDateObj } = this.props;
		const { year, month, day } = currentDateObj;
		const idx = days.indexOf(1);

		return (
			<tr>
				{days.map((o, i) => {
					const inMonth = !((head && i < idx) || (tail && idx > -1 && i > idx - 1));

					let date = null;
					if (inMonth) {
						date = `${year}/${month}/${o} ${time}`;
					} else {
						if (i < idx) {
							date = month > 1 ? `${year}/${month - 1}/${o} ${time}` : `${year - 1}/12/${o} ${time}`;
						}
						if (i > idx - 1) {
							date = month < 12 ? `${year}/${month + 1}/${o} ${time}` : `${year + 1}/01/${o} ${time}`;
						}
					}

					const isToday = inMonth && `${year}-${month}-${o}` === today();
					const isCheck = inMonth && o === day;
					const isDisabled = this.getDisabled(date);

					const classes = classnames({
						'grid-check': isCheck,
						'grid-now': isToday,
						'not-included': !inMonth,
						'day-disabled': isDisabled
					});

					let _month = month;
					let _year = year;

					if (tail && idx > -1 && i > idx - 1) {
						if (parseInt(month, 10) === 12) {
							_month = 1;
							_year = year + 1;
						} else {
							_month = month + 1;
						}
					}

					if (head && i < idx) {
						if (parseInt(month, 10) === 1) {
							_month = 12;
							_year = year - 1;
						} else {
							_month = month - 1;
						}
					}

					return (
						<td className={classes} key={`${_year}-${_month}-${o}`} data-i={`${_year}-${_month}-${o}`}>
							<span onClick={() => !isDisabled && this.onDayClick(_year, _month, o)}>{o}</span>
						</td>
					);
				})}
			</tr>
		);
	}
}

Week.propTypes = {
	days: PropTypes.array,
	time: PropTypes.string,
	currentDateObj: PropTypes.object,
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	head: PropTypes.bool,
	tail: PropTypes.bool,
	onPickDate: PropTypes.func
};

Week.defaultProps = {
	days: [],
	currentDateObj: null,
	minDate: undefined,
	maxDate: undefined,
	time: '00:00:00',
	head: true,
	tail: true,
	onPickDate: () => {}
};

export default Week;
