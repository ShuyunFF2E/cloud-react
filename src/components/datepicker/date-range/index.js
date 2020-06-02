import React, { Component } from 'react';
import { omit } from '@utils';

import DatePicker from '../date-picker';

class DateRange extends Component {
	constructor(props) {
		super(props);

		const { value, defaultValue } = props;
		const date = value || defaultValue || {};

		const { start, end } = date;

		this.state = {
			endOpen: false,
			start,
			end
		};
	}

	static getDerivedStateFromProps({ value }) {
		if (value !== undefined && typeof value === 'object') {
			const { start, end } = value;
			return { start, end };
		}
		return null;
	}

	onChangeStartTime = start => {
		this.setState({ endOpen: true });
		this.onChangeTime({ start, end: this.state.end });
	};

	onChangeEndTime = end => {
		this.onChangeTime({ start: this.state.start, end });
	};

	onChangeTime = (range = {}) => {
		const { value } = this.props;

		// 非受控组件不触发onChange事件
		if (value === undefined) {
			this.setState(range);
		} else {
			this.props.onChange(range);
		}
	};

	onEndClose = () => {
		this.setState({ endOpen: false });
	};

	render() {
		const { onChangeStartTime, onChangeEndTime, onEndClose } = this;
		const { minDate, maxDate, width = 480, className, ...others } = this.props;
		const { start, end, endOpen } = this.state;

		const startValue = start ? new Date(start) : '';
		const endValue = end ? new Date(end) : '';
		const props = omit(others, ['value', 'defaultValue', 'data-field']);
		const wraperProps = omit(props, ['showTimePicker', 'isAppendToBody']);
		const pickerWidth = (parseFloat(width) - 20) / 2;

		return (
			<div className={className} {...wraperProps}>
				<DatePicker
					{...props}
					width={`${pickerWidth}px`}
					value={startValue}
					minDate={minDate}
					maxDate={endValue || maxDate}
					onChange={onChangeStartTime}
					defaultTime="00:00:00"
				/>
				<span style={{ color: '#979797', margin: '0 5px' }}>-</span>
				<DatePicker
					{...props}
					width={`${pickerWidth}px`}
					value={endValue}
					minDate={startValue || minDate}
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
