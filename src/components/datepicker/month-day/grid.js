import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../button';
import { selectorClass } from '../constant';
import { formatZero, refreshDays, displayNow, range } from '../utils';
import WeekHead from '../common/week-head';
import WeekGrid from './week';

class Grid extends Component {
	constructor(props) {
		super(props);

		const { month, day } = props;

		this.state = {
			tempMonth: month,
			tempDay: day,
			isClickDay: false
		};
	}

	componentDidUpdate(prevProps) {
		const { month, day } = prevProps;

		if (month !== this.props.month) {
			this.updateMonthState();
		}

		if (day !== this.props.day) {
			this.updateDayState();
		}
	}

	updateMonthState() {
		this.setState({
			tempMonth: this.props.month
		});
	}

	updateDayState() {
		this.setState({
			tempDay: this.props.day
		});
	}

	handlePickDate = value => {
		this.setState({
			isClickDay: true,
			tempDay: value
		});
	};

	handleSave = (value, m) => {
		if (value) {
			this.props.onChange(value, m);
		} else {
			this.props.onChange(formatZero(this.state.tempDay));
		}
	};

	render() {
		const { tempMonth, tempDay, isClickDay } = this.state;
		const { checkValue, showToday } = this.props;

		const { year, month, day } = displayNow();
		const days = refreshDays(year, tempMonth || month);
		const len = Math.ceil(days.length / 7);

		return (
			<div className="grid">
				<table className="grid-table">
					<WeekHead />
					<tbody>
						{range(len).map((e, i) => (
							<WeekGrid
								key={i.toString()}
								currentDateObj={{
									month: tempMonth,
									day: tempDay
								}}
								month={tempMonth}
								day={tempDay}
								isClickDay={isClickDay}
								checkValue={checkValue}
								onPickDate={value => this.handlePickDate(value)}
								days={days.slice(i * 7, (i + 1) * 7)}
								head={i === 0}
								tail={i === len - 1}
							/>
						))}
					</tbody>
				</table>
				<div className={`${selectorClass}-popup-btns`}>
					{showToday && (
						<Button size="small" onClick={() => this.handleSave(formatZero(day), month)}>
							今天
						</Button>
					)}
					<Button type="primary" size="small" disabled={!tempDay} onClick={() => this.handleSave()}>
						确认
					</Button>
				</div>
			</div>
		);
	}
}

Grid.propTypes = {
	month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	showToday: PropTypes.bool,
	checkValue: PropTypes.string,
	onChange: PropTypes.func
};

Grid.defaultProps = {
	showToday: false,
	month: undefined,
	day: undefined,
	checkValue: '',
	onChange: () => {}
};

export default Grid;
