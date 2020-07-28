import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Button from '../../button';
import { displayNow, refreshDays } from '../utils';
import { selectorClass } from '../constant';
import Week from '../common/week';
import Time from '../common/time';

class Grid extends Component {
	constructor(props) {
		super(props);

		const { day, showTimePicker, checkValue, defaultTime } = props;

		const _defaultTimes = defaultTime.split(':');

		const openTime = displayNow();

		this.state = {
			tempDay: day,
			tempHour: (!showTimePicker && openTime.hour) || (checkValue ? checkValue.hour : _defaultTimes[0]),
			tempMinute: (!showTimePicker && openTime.minute) || (checkValue ? checkValue.minute : _defaultTimes[1]),
			tempSecond: (!showTimePicker && openTime.second) || (checkValue ? checkValue.second : _defaultTimes[2])
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.checkValue !== this.props.checkValue) {
			this.updateState();
		}
	}

	updateState() {
		const { hour, minute, second } = this.props.checkValue;
		this.setState({
			tempHour: hour,
			tempMinute: minute,
			tempSecond: second
		});
	}

	static getDerivedStateFromProps(props, state) {
		const { day } = props;
		if (props.day !== state.tempDay) {
			return {
				tempDay: day
			};
		}
		return null;
	}

	getTodayDisabled = () => {
		const { minDate, maxDate } = this.props;
		const { year, month, day } = displayNow();
		const { year: minYear, month: minMonth, day: minDay } = displayNow(minDate);
		const { year: maxYear, month: maxMonth, day: maxDay } = displayNow(maxDate);
		const todayTimestamp = new Date(year, month, day, '00', '00', '00').getTime();
		const minDateTimestamp = new Date(minYear, minMonth, minDay, '00', '00', '00').getTime();
		const maxDateTimestamp = new Date(maxYear, maxMonth, maxDay, '00', '00', '00').getTime();
		if (minDate && minDateTimestamp > todayTimestamp) {
			return true;
		}
		return !!(maxDate && maxDateTimestamp < todayTimestamp);
	};

	getOkButtonDisabled = () => {
		const { year, month, minDate, maxDate, showTimePicker } = this.props;
		const { tempDay, tempHour, tempMinute, tempSecond } = this.state;

		const { year: minYear, month: minMonth, day: minDay } = displayNow(minDate);
		const { year: maxYear, month: maxMonth, day: maxDay } = displayNow(maxDate);

		const min = showTimePicker || !minDate ? minDate : new Date(`${minYear}/${minMonth}/${minDay} 00:00:00`);
		const max = showTimePicker || !maxDate ? maxDate : new Date(`${maxYear}/${maxMonth}/${maxDay} 23:59:59`);
		const currentTime = new Date(`${year}/${month}/${tempDay} ${tempHour}:${tempMinute}:${tempSecond}`).getTime();
		if (min && min.getTime() > currentTime) {
			return true;
		}
		return !!(max && max.getTime() < currentTime);
	};

	onTimePickChange = ({ hour, minute, second }) => {
		this.setState({
			tempHour: hour,
			tempMinute: minute,
			tempSecond: second
		});
	};

	onToadyClick = () => {
		this.props.onOK(displayNow());
	};

	onSave = () => {
		const { year, month, onOK } = this.props;
		const { tempDay, tempHour, tempMinute, tempSecond } = this.state;

		onOK(displayNow(new Date(`${year}/${month}/${tempDay} ${tempHour}:${tempMinute}:${tempSecond}`)));
	};

	render() {
		const { year, month, minDate, maxDate, showTimePicker, style, onPickDate } = this.props;
		const { tempDay, tempHour, tempMinute, tempSecond } = this.state;

		const days = refreshDays(year, month);

		return (
			<div className="grid" style={style}>
				<Week
					currentDateObj={{
						year,
						month,
						day: tempDay
					}}
					minDate={minDate}
					maxDate={maxDate}
					onPickDate={onPickDate}
					days={days}
				/>

				{showTimePicker && <Time type="inner" onChange={this.onTimePickChange} value={`${tempHour}:${tempMinute}:${tempSecond}`} />}

				<div className={`${selectorClass}-popup-btns`}>
					{showTimePicker ? (
						<Button size="small" onClick={this.onToadyClick}>
							此刻
						</Button>
					) : (
						<Button size="small" disabled={this.getTodayDisabled()} onClick={this.onToadyClick}>
							今天
						</Button>
					)}
					<Button type="primary" size="small" disabled={!tempDay || this.getOkButtonDisabled()} onClick={this.onSave}>
						确定
					</Button>
				</div>
			</div>
		);
	}
}

Grid.propTypes = {
	style: PropTypes.object,
	year: PropTypes.number,
	month: PropTypes.number,
	day: PropTypes.number,
	hour: PropTypes.string,
	minute: PropTypes.string,
	second: PropTypes.string,
	maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	showTimePicker: PropTypes.bool,
	onPickDate: PropTypes.func,
	onOK: PropTypes.func
};

Grid.defaultProps = {
	style: {},
	year: displayNow().year,
	month: displayNow().month,
	day: displayNow().day,
	hour: '',
	minute: '',
	second: '',
	minDate: undefined,
	maxDate: undefined,
	showTimePicker: false,
	onPickDate: noop,
	onOK: noop
};

export default Grid;
