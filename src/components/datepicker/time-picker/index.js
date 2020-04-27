import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '@utils';
import { timeSelectorClass } from '../constant';
import { formatTime } from '../util';

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
		let inpValue = event.target.value.trim().replace(/[^\d]/g, '');

		if (inpValue !== '' && parseInt(inpValue, 10) >= 24) {
			inpValue = inpValue.substr(0, 1);
		} else if (inpValue !== '' && parseInt(inpValue, 10) < 24 && inpValue.toString().length === 2) {
			// 当输入2位并且有效范围内时，跳转到分钟输入框
			this.inpMinuteRef.current.focus();
			this.inpMinuteRef.current.select();
		}
		// 受控时，状态依赖外部。非受控时，内部直接set
		this.setState({
			hour: inpValue
		});

		const { minute, second } = this.state;

		this.props.onChange({
			hour: inpValue,
			minute,
			second
		});
	};

	handleMinuteChange = event => {
		let inpValue = event.target.value.trim().replace(/[^\d]/g, '');

		if (inpValue !== '' && parseInt(inpValue, 10) >= 60) {
			inpValue = inpValue.substr(0, 1);
		} else if (inpValue !== '' && parseInt(inpValue, 10) < 60 && inpValue.toString().length === 2) {
			// 当输入2位并且有效范围内时，跳转到秒输入框
			this.inpSecondRef.current.focus();
			this.inpSecondRef.current.select();
		}
		// 受控时，状态依赖外部。非受控时，内部直接set
		this.setState({
			minute: inpValue
		});

		const { hour, second } = this.state;

		this.props.onChange({
			hour,
			minute: inpValue,
			second
		});
	};

	handleSecondChange = event => {
		let inpValue = event.target.value.trim().replace(/[^\d]/g, '');

		if (inpValue !== '' && parseInt(inpValue, 10) >= 60) {
			inpValue = inpValue.substr(0, 1);
		}

		this.setState({
			second: inpValue
		});

		const { hour, minute } = this.state;

		this.props.onChange({
			hour,
			minute,
			second: inpValue
		});
	};

	render() {
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
}

TimePicker.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	defaultValue: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};
TimePicker.defaultProps = {
	className: '',
	style: {},
	value: undefined,
	defaultValue: '00:00:00',
	disabled: false,
	onChange: noop
};

export default TimePicker;
