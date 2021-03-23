import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, noop } from '@utils';

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
		if (value === undefined) {
			return { start: '', end: '' };
		}
		return null;
	}

	onChangeStartTime = start => {
		this.setState({ start, endOpen: true });
		this.props.onChange({ start, end: this.state.end });
	};

	onChangeEndTime = end => {
		this.setState({ end });
		this.props.onChange({ start: this.state.start, end });
	};

	onEndClose = () => {
		this.setState({ endOpen: false });
	};

	render() {
		const { onChangeStartTime, onChangeEndTime, onEndClose } = this;
		const { minDate, maxDate, width = 480, className, onChange, ...others } = this.props;

		const { start, end, endOpen } = this.state;

		const startValue = start ? new Date(start) : '';
		const endValue = end ? new Date(end) : '';
		const props = omit(others, ['value', 'defaultValue', 'data-field']);
		const wraperProps = omit(props, ['showTimePicker', 'isAppendToBody', 'canEdit']);
		const pickerWidth = (parseFloat(width) - 20) / 2;

		return (
			<div className={className} {...wraperProps}>
				<DatePicker
					{...props}
					width={`${pickerWidth}px`}
					value={start}
					minDate={minDate}
					maxDate={endValue || maxDate}
					onChange={onChangeStartTime}
					defaultTime="00:00:00"
				/>
				<span style={{ color: '#979797', margin: '0 5px' }}>-</span>
				<DatePicker
					{...props}
					width={`${pickerWidth}px`}
					value={end}
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

DateRange.propTypes = {
	minDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
	maxDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
	value: PropTypes.object,
	defaultValue: PropTypes.object,
	onChange: PropTypes.func
};

DateRange.defaultProps = {
	minDate: undefined,
	maxDate: undefined,
	value: undefined,
	defaultValue: undefined,
	onChange: noop
};

export default DateRange;
