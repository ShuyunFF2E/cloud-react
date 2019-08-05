import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import DatePicker from './date-picker';

const selector = 'rangepicker';
const enumObj = {
	start: 'start',
	end: 'end',
	startText: '请选择开始时间',
	endText: '请选择结束时间'
}
export default class RangePicker extends Component {
	static propTypes = {
		className: PropTypes.string,
		disabled: PropTypes.bool,
		format: PropTypes.string,
		placeholder: PropTypes.arrayOf(PropTypes.string),
		// eslint-disable-next-line react/no-unused-prop-types
		defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
		// eslint-disable-next-line react/no-unused-prop-types
		value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
		open: PropTypes.bool,
		showToday: PropTypes.bool,
		showTimePicker: PropTypes.bool,
		// maxDate: PropTypes.instanceOf(Date),
		// minDate: PropTypes.instanceOf(Date),
		onChange: PropTypes.func,
		// eslint-disable-next-line react/no-unused-prop-types
		onOK: PropTypes.func
	}

	static defaultProps = {
		className: '',
		disabled: false,
		format: 'yyyy/MM/dd',
		placeholder: [enumObj.startText, enumObj.endText],
		defaultValue: [null, null],
		value: undefined,
		open: false,
		showToday: false,
		showTimePicker: false,
		// minDate: null,
		// maxDate: null,
		onChange: () => {},
		onOK: () => {}
	}

	constructor(props) {
		super(props);
		this.state = {
			props: null
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const controlled = typeof nextProps.value !== 'undefined';
		let value = nextProps.defaultValue;
		if (controlled) {
			// eslint-disable-next-line prefer-destructuring
			value = nextProps.value;
		}
		switch (value.length) {
			case 0:
				value = [null, null];
				break;
			case 1:
				value = [value[0], null];
				break;
			case 2:
			default:
				value = [value[0], value[1]];
				break;
		}
		if (prevState.props === null || !shallowequal(nextProps.value, prevState.props.value)) {
			return {
				controlled,
				value,
				props: nextProps
			}
		}
		return {
			props: nextProps
		};
	}

	onChange = (type, date) => {
		const { controlled, value } = this.state;
		const newVal = type === enumObj.start ? [date, value[1]] : [value[0], date];
		if (controlled) {
			this.props.onChange(newVal);
			return;
		}
		this.setState({
			value: newVal
		}, () => {
			this.props.onChange(newVal);
		})
	}

	onOK = (type, date) => {
		const { controlled, value } = this.state;
		const newVal = type === enumObj.start ? [date, value[1]] : [value[0], date];
		if (controlled) {
			this.props.onOK(newVal);
			return;
		}
		this.setState({
			value: newVal
		}, () => {
			this.props.onOK(newVal);
		});
	}

	render() {
		const { className, placeholder, disabled, open, format, showToday, showTimePicker, minDate, maxDate } = this.props;
		const { value } = this.state;
		const startPlaceholder = placeholder.length > 0 ? placeholder[0] : enumObj.startText;
		const endPlaceholder = placeholder.length > 1 ? placeholder[1] : enumObj.endText;
		return <div className={`${selector} ${className}`}>
			<DatePicker disabled={disabled}
						placeholder={startPlaceholder}
						open={open}
						format={format}
						showToday={showToday}
						value={value[0]}
						showTimePicker={showTimePicker}
						minDate={minDate}
						onOK={(date, callback) => {
							this.onOK(enumObj.start, date);
							callback();
						}}
						onChange={(date, callback) => {
							this.onChange(enumObj.start, date);
							callback();
						}}
			/>
			<span className={`${selector}-separator`} />
			<DatePicker disabled={disabled}
						value={value[1]}
						placeholder={endPlaceholder}
						open={open}
						format={format}
						showToday={showToday}
						showTimePicker={showTimePicker}
						maxDate={maxDate}
						onOK={(date, callback) => {
							this.onOK(enumObj.end, date);
							callback();
						}}
						onChange={(date, callback) => {
							this.onChange(enumObj.end, date);
							callback();
						}}
			/>
		</div>
	}
}
