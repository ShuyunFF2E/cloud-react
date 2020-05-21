import React, { Component } from 'react';
import { omit } from '@utils';
import jeasy from 'jeasy';

import DatePicker from '../date-picker';

class DateRange extends Component {
	constructor(props) {
		super(props);

		const { value, defaultValue } = props;
		const date = value || defaultValue || {};

		const { start = '', end = '' } = date;

		this.state = {
			endOpen: false,
			startValue: start,
			endValue: end
		};
	}

	onChangeStartTime = time => {
		this.setState({
			startValue: time,
			endOpen: true
		});
		const { endValue } = this.state;
		this.onChangeTime({
			start: time,
			end: endValue
		});
	};

	onChangeEndTime = time => {
		this.setState({
			endValue: time
		});
		const { startValue } = this.state;
		this.onChangeTime({
			start: startValue,
			end: time
		});
	};

	onChangeTime = time => {
		const { startValue, endValue } = this.state;
		if (!jeasy.equal(time, { start: startValue, end: endValue })) {
			this.props.onChange(time);
		}
	};

	onEndClose = () => {
		this.setState({
			endOpen: false
		});
	};

	render() {
		const {
			props: { minDate, maxDate, showTimePicker, width = 480, ...others },
			state: { startValue, endValue, endOpen },
			onChangeStartTime,
			onChangeEndTime,
			onEndClose
		} = this;
		const start = startValue ? new Date(startValue) : '';
		const end = endValue ? new Date(endValue) : '';
		const props = omit(others, ['value', 'defaultValue', 'data-field', 'className']);
		const pickerWidth = (parseFloat(width) - 20) / 2;
		return (
			<div {...others}>
				<DatePicker
					{...props}
					width={`${pickerWidth}px`}
					showTimePicker={showTimePicker}
					value={start}
					minDate={minDate}
					maxDate={end || maxDate}
					onChange={onChangeStartTime}
					defaultTime="00:00:00"
				/>
				<span style={{ color: '#979797', margin: '0 5px' }}>-</span>
				<DatePicker
					{...props}
					width={`${pickerWidth}px`}
					showTimePicker={showTimePicker}
					value={end}
					minDate={start || minDate}
					maxDate={maxDate}
					open={endOpen}
					onChange={onChangeEndTime}
					defaultTime="23:59:59"
					onClose={onEndClose}
				/>
			</div>
		);
	}
}

export default DateRange;
