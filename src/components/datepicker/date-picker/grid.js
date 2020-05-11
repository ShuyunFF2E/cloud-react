import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Button from '../../button';
import { displayNow, range, refreshDays } from '../util';
import { miniWeek, selectorClass } from '../constant';
import Week from './week';
import Time from '../common/time';

class Grid extends Component {
	constructor(props) {
		super(props);

		const { day, showTimePicker, checkValue, defaultTime } = props;

		const _defaultTimes = defaultTime.split(':');

		const openTime = displayNow();
		this._hour = (!showTimePicker && openTime.hour) || (checkValue ? checkValue.hour : _defaultTimes[0]);
		this._minute = (!showTimePicker && openTime.minute) || (checkValue ? checkValue.minute : _defaultTimes[1]);
		this._second = (!showTimePicker && openTime.second) || (checkValue ? checkValue.second : _defaultTimes[2]);

		this.state = {
			tempDay: day,
			tempHour: this._hour,
			tempMinute: this._minute,
			tempSecond: this._second
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
		const nowTimestamp = new Date().getTime();
		if (minDate && minDate.getTime() > nowTimestamp) {
			return true;
		}
		return !!(maxDate && maxDate.getTime() < nowTimestamp);
	};

	getOkButtonDisabled = () => {
		const { year, month, minDate, maxDate } = this.props;
		const { tempDay } = this.state;

		const currentTime = new Date(`${year}/${month}/${tempDay} ${this._hour}:${this._minute}:${this._second}`).getTime();
		if (minDate && minDate.getTime() > currentTime) {
			return true;
		}
		return !!(maxDate && maxDate.getTime() < currentTime);
	};

	onTimePickChange = ({ hour, minute, second }) => {
		console.log({ hour, minute, second });
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
		const nowTime = displayNow();
		const { year, month, onOK } = this.props;
		const { tempDay, tempHour, tempMinute, tempSecond } = this.state;

		if (tempDay) {
			onOK(
				displayNow(new Date(`${year}/${month}/${tempDay} ${tempHour || nowTime.hour}:${tempMinute || nowTime.minute}:${tempSecond || nowTime.second}`))
			);
		}
	};

	render() {
		const { year, month, showNow, showToday, minDate, maxDate, showTimePicker, style, onPickDate } = this.props;
		const { tempDay, tempHour, tempMinute, tempSecond } = this.state;

		const now = displayNow();
		const days = year && month ? refreshDays(year, month) : refreshDays(now.year, now.month);
		const len = Math.ceil(days.length / 7);
		const btnStyle = (!showTimePicker && showToday) || (showTimePicker && showNow) ? {} : { justifyContent: 'flex-end' };

		return (
			<div className="grid" style={style}>
				<table className="grid-table">
					<thead>
						<tr>
							{miniWeek.map((e, i) => (
								<th key={i.toString()}>{e}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{range(len).map((e, i) => (
							<Week
								key={i.toString()}
								currentDateObj={{
									year,
									month,
									day: tempDay
								}}
								time={`${this._hour}:${this._minute}:${this._second}`}
								minDate={minDate}
								maxDate={maxDate}
								onPickDate={onPickDate}
								days={days.slice(i * 7, (i + 1) * 7)}
								head={i === 0}
								tail={i === len - 1}
							/>
						))}
					</tbody>
				</table>

				{showTimePicker && <Time type="inner" onChange={this.onTimePickChange} value={`${tempHour}:${tempMinute}:${tempSecond}`} />}

				<div className={`${selectorClass}-popup-btns`} style={btnStyle}>
					{showToday && !showTimePicker && (
						<Button size="small" disabled={this.getTodayDisabled()} onClick={this.onToadyClick}>
							今天
						</Button>
					)}
					{showNow && showTimePicker && (
						<Button size="small" onClick={this.onToadyClick}>
							此刻
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
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	showTimePicker: PropTypes.bool,
	showNow: PropTypes.bool,
	showToday: PropTypes.bool,
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
	showToday: false,
	showNow: false,
	showTimePicker: false,
	onPickDate: noop,
	onOK: noop
};

export default Grid;
