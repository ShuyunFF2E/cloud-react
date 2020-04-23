import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import utils from '../util';

function WeekGird(props) {
	const { head, tail, days, month, day, isClickDay, currentDateObj, onPickDate } = props;
	const idx = days.indexOf(1);

	function onDayClick(value) {
		onPickDate(value);
	}

	const now = new Date();
	const today = `${now.getMonth() + 1}-${now.getDate()}`;

	return (
		<tr>
			{days.map((o, i) => {
				const inMonth = !((head && i < idx) || (tail && idx > -1 && i > idx - 1));

				const isToday = inMonth && `${month}-${o}` === today;
				let isCheck = false;
				// 是否已经点击过了，此时数据尚未写入Input中，只是临时保存
				if (isClickDay) {
					isCheck = o === day && inMonth;
				} else if (currentDateObj !== null && inMonth) {
					isCheck = `${month}-${o}` === `${currentDateObj.month}-${currentDateObj.day}`;
				}

				const classes = cls({
					'grid-check': isCheck,
					'grid-now': isToday,
					'not-included': !inMonth
				});
				return (
					<td className={classes} key={i.toString()}>
						<span onClick={() => onDayClick(o)}>{o}</span>
					</td>
				);
			})}
		</tr>
	);
}

WeekGird.propTypes = {
	isClickDay: PropTypes.bool,
	month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	days: PropTypes.array,
	day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	head: PropTypes.bool,
	tail: PropTypes.bool,
	onPickDate: PropTypes.func
};

WeekGird.defaultProps = {
	isClickDay: false,
	month: utils.displayNow.month,
	days: [],
	day: utils.displayNow.day,
	head: true,
	tail: true,
	onPickDate: () => {}
};
export default WeekGird;
