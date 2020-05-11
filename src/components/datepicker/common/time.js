import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '@utils';
import { timeSelectorClass } from '../constant';
import { formatTime } from '../utils';

function formatNumber(data) {
	const stringValue = data.trim().replace(/[^\d]/g, '');
	const numberValue = parseInt(data.trim().replace(/[^\d]/g, ''), 10);

	return { numberValue, stringValue, length: stringValue.length };
}

class TimePicker extends Component {
	constructor(props) {
		super(props);

		this.inpMinuteRef = createRef();
		this.inpSecondRef = createRef();

		const _value = this.initValue();

		this.state = {
			temp: '',
			hour: _value[0],
			minute: _value[1],
			second: _value[2]
		};
	}

	initValue() {
		const { value, defaultValue } = this.props;

		if (typeof value !== 'undefined' && value) {
			return typeof value === 'string' ? value.split(':') : [value.hour, value.minute, value.second];
		}

		if (defaultValue) {
			return defaultValue.split(':');
		}

		return ['00', '00', '00'];
	}

	handleInpputBlur = () => {
		const { hour, minute, second, temp } = this.state;

		this.setState({
			hour: formatTime(hour, temp || '00'),
			minute: formatTime(minute, temp || '00'),
			second: formatTime(second, temp || '00')
		});
	};

	handleHourFocus = () => {
		this.setState(prevState => {
			return {
				temp: prevState.hour,
				hour: ''
			};
		});
	};

	handleMinuteFocus = () => {
		this.setState(prevState => {
			return {
				temp: prevState.minute,
				minute: ''
			};
		});
	};

	handleSecondFocus = () => {
		this.setState(prevState => {
			return {
				temp: prevState.second,
				second: ''
			};
		});
	};

	handleHourChange = event => {
		const { stringValue, numberValue, length } = formatNumber(event.target.value);
		let _value = stringValue;

		if (!Number.isNaN(numberValue)) {
			if (numberValue >= 24) {
				_value = '23';
			}
			if (numberValue < 24 && length === 2) {
				// 当输入2位并且有效范围内时，跳转到分钟输入框
				const ele = this.inpMinuteRef.current;
				ele.focus();
				ele.select();
			}
		} else {
			_value = '';
		}

		// 受控时，状态依赖外部。非受控时，内部直接set
		this.setState({
			hour: _value
		});

		const { minute, second } = this.state;

		this.props.onChange({
			hour: _value,
			minute,
			second
		});
	};

	handleMinuteChange = event => {
		const { stringValue, numberValue, length } = formatNumber(event.target.value);
		let _value = stringValue;

		if (!Number.isNaN(numberValue)) {
			if (numberValue >= 60) {
				_value = '59';
			}
			// 当输入2位并且有效范围内时，跳转到分钟输入框
			if (numberValue < 60 && length === 2) {
				const ele = this.inpSecondRef.current;
				if (ele) {
					ele.focus();
					ele.select();
				}
			}
		} else {
			_value = '';
		}

		// 受控时，状态依赖外部。非受控时，内部直接set
		this.setState({
			minute: _value
		});

		const { hour, second } = this.state;

		this.props.onChange({
			hour,
			minute: _value,
			second
		});
	};

	handleSecondChange = event => {
		const { stringValue, numberValue } = formatNumber(event.target.value);
		let _value = stringValue;

		if (!Number.isNaN(numberValue)) {
			if (numberValue >= 60) {
				_value = '59';
			}
		} else {
			_value = '';
		}

		this.setState({
			second: _value
		});

		const { hour, minute } = this.state;

		this.props.onChange({
			hour,
			minute,
			second: _value
		});
	};

	renderAlone() {
		const { className, style, disabled } = this.props;
		const { hour, minute, second } = this.state;

		const classes = classnames({
			[timeSelectorClass]: true,
			[`${timeSelectorClass}-disabled`]: disabled,
			[className]: true
		});

		return (
			<div className={classes} onBlur={this.handleInpputBlur} style={style}>
				<input value={hour} disabled={disabled} onFocus={this.handleHourFocus} maxLength="2" onChange={this.handleHourChange} />
				<label className="colon">:</label>
				<input
					ref={this.inpMinuteRef}
					value={minute}
					onFocus={this.handleMinuteFocus}
					disabled={disabled}
					maxLength="2"
					onChange={this.handleMinuteChange}
				/>
				<label className="colon">:</label>
				<input
					ref={this.inpSecondRef}
					value={second}
					onFocus={this.handleSecondFocus}
					disabled={disabled}
					maxLength="2"
					onChange={this.handleSecondChange}
				/>
			</div>
		);
	}

	renderInner() {
		const { hour, minute, second } = this.state;

		return (
			<div className={`inner-${timeSelectorClass}`}>
				<label>时间：</label>
				<input value={hour} maxLength="2" placeholder="小时" onChange={this.handleHourChange} />
				<label className="colon">:</label>
				<input ref={this.inpMinuteRef} value={minute} maxLength="2" placeholder="分钟" onChange={this.handleMinuteChange} />
				<label className="colon">:</label>
				<input ref={this.inpSecondRef} value={second} maxLength="2" placeholder="秒" onChange={this.handleSecondChange} />
			</div>
		);
	}

	render() {
		const { type } = this.props;

		if (type === 'alone') {
			return this.renderAlone();
		}

		if (type === 'inner') {
			return this.renderInner();
		}

		return null;
	}
}

TimePicker.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	defaultValue: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};
TimePicker.defaultProps = {
	className: '',
	style: {},
	value: undefined,
	defaultValue: '00:00:00',
	type: '',
	disabled: false,
	onChange: noop
};

export default TimePicker;
