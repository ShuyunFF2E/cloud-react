import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import Grid from './grid';
import utils from './util';
import Header from './header';
import Input from '../input';

const selector = 'datepicker';

export default class DatePicker extends Component {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		disabled: PropTypes.bool,
		placeholder: PropTypes.string,
		format: PropTypes.string,
		// 控制弹层是否展开，为true时，弹层一直不会隐藏
		open: PropTypes.bool,
		// eslint-disable-next-line react/no-unused-prop-types
		defaultValue: PropTypes.instanceOf(Date),
		// eslint-disable-next-line react/no-unused-prop-types
		value: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
		minDate: PropTypes.instanceOf(Date),
		showToday: PropTypes.bool,
		// 是否显示时间，当为true时，最终交互以确定按钮结束
		showTimePicker: PropTypes.bool,
		onChange: PropTypes.func,
		onOK: PropTypes.func,
	}

	static defaultProps = {
		className: '',
		style: {},
		disabled: false,
		placeholder: '请选择日期',
		format: 'yyyy/MM/dd',
		open: false,
		showToday: false,
		showTimePicker: false,
		defaultValue: null,
		value: undefined,
		minDate: undefined,
		maxDate: undefined,
		onChange: () => { },
		onOK: () => { }
	}

	constructor(props) {
		super(props);
		this.state = {
			visible: props.open,
			popoverStyle: {},
			props: null
		}
		this.dp = React.createRef();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let obj = {};
		if (nextProps !== prevState.props) {
			if (prevState.props === null || nextProps.value !== prevState.props.value) {
				const controlled = typeof nextProps.value !== 'undefined';
				const dateTime = controlled ? nextProps.value : nextProps.defaultValue;
				const _displayDateObj = dateTime !== null ? utils.time.displayNow(dateTime) : null;
				const now = utils.time.displayNow();
				const { year, month, day, hour, minute, second } = _displayDateObj !== null ? _displayDateObj : now;
				const days = utils.time.refreshDays(year, month);
				obj = {
					year,
					month,
					day,
					hour,
					minute,
					second,
					days,
					value: dateTime,
					displayDate: dateTime,
					displayDateObj: {
						year,
						month,
						day,
						hour,
						minute,
						second
					},
					controlled
				}
			}
			obj.props = nextProps;
			if (prevState.props !== null && nextProps.open !== prevState.props.open) {
				obj.visible = nextProps.open;
			}
		}
		return obj;
	}

	componentDidMount() {
		document.onclick = this.changeVisible;
	}

	componentWillUnmount() {
		document.onclick = null;
	}

	changeVisible = () => {
		if (!this.props.open && this.state.visible) {
			this.setState({
				visible: false
			})
		}
	}

	onInpClick = evt => {
		if (!this.props.open && !this.state.visible) {
			const { offsetLeft, offsetTop, offsetHeight } = evt.nativeEvent.target;
			this.setState({
				visible: true,
				popoverStyle: {
					transform: `translate3d(${offsetLeft}px, ${offsetTop + offsetHeight + 1}px, 0px)`
				}
			})
		}
	}

	onHeaderChange = (year, month) => {
		this.setState({
			year,
			month,
			days: utils.time.refreshDays(year, month)
		});
	}

	pickDate = (datetime) => {
		const { open, showTimePicker, onChange } = this.props;
		if (!showTimePicker) {
			const { year, month, day } = datetime;
			const newDate = new Date(0);
			newDate.setYear(year);
			newDate.setMonth(month - 1);
			newDate.setDate(day);
			if (this.state.controlled) {
				onChange(newDate, () => {
					this.setState({
						visible: false
					})
				});
				return;
			}
			this.setState({
				year,
				month,
				day,
				days: utils.time.refreshDays(year, month),
				value: newDate,
				displayDate: newDate,
				visible: open
			}, () => {
				onChange(newDate);
			})
		} else {
			const { displayDateObj } = this.state;
			const obj = { ...displayDateObj, ...datetime };
			const { year,
				month,
				day,
				hour,
				minute,
				second } = obj;
			this.setState({
				displayDate: new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`),
				displayDateObj: obj
			})
		}
	}

	onTimePickChange = (time) => {
		const { displayDateObj } = this.state;
		const obj = { ...displayDateObj, ...time };
		const { year,
			month,
			day,
			hour,
			minute,
			second } = obj;
		this.setState({
			displayDate: new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`),
			displayDateObj: obj
		})
	}

	onOK = displayNowObj => {
		const { year, month, day, hour = '00', minute = '00', second = '00' } = displayNowObj || this.state.displayDateObj;
		const newDate = new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`);
		if (this.state.controlled) {
			this.props.onOK(newDate, () => {
				this.setState({
					visible: false
				})
			});
			return;
		}
		this.setState({
			year,
			month,
			day,
			hour,
			minute,
			second,
			days: utils.time.refreshDays(year, month),
			value: newDate,
			displayDate: newDate,
			displayDateObj: {
				year,
				month,
				day,
				hour,
				minute,
				second,
			},
			visible: this.props.open
		}, () => {
			this.props.onOK(newDate);
		});
	}

	onCompClick = (evt) => {
		evt.nativeEvent.stopImmediatePropagation();
	}

	transformObj = (date) => {
		if(date) {
			return utils.time.displayNow(date);
		}
		return null;
	}

	render() {
		const { format, className, placeholder, disabled, style, showTimePicker, showToday, minDate, maxDate } = this.props;
		const { displayDate, value, visible, day, days, month, year, hour, minute, second, popoverStyle } = this.state;
		const currentOutValue = displayDate !== null ? utils.time.convert(utils.time.displayNow(value), format) : '';
		const currentDisplayDate = displayDate !== null ? utils.time.displayNow(displayDate) : null;
		const panelClasses = cls({
			[`${selector}-popover`]: true,
			[className]: true,
			'hide': !visible
		});
		const classes = cls(`${selector} ${className}`);
		console.log(panelClasses);
		return (
			<div ref={this.dp} className={classes} onClick={this.onCompClick} style={style}>
				<Input value={currentOutValue}
					   readOnly
					   placeholder={placeholder}
					   className={`${selector}-inp`}
					   disabled={disabled}
					   onClick={this.onInpClick}
				/>
				<div className={panelClasses} style={popoverStyle}>
					<Header
						month={month}
						year={year}
						minDateObject={this.transformObj(minDate)}
						maxDateObject={this.transformObj(maxDate)}
						onChange={this.onHeaderChange}
					/>
					<Grid
						currentDate={currentDisplayDate}
						days={days}
						day={day}
						month={month}
						year={year}
						hour={hour}
						minute={minute}
						second={second}
						minDate={minDate}
						maxDate={maxDate}
						showTimePicker={showTimePicker}
						showToday={showToday}
						onOK={this.onOK}
						onPickDate={this.pickDate}
						onTimePickChange={this.onTimePickChange}
					/>
				</div>
			</div>
		)
	}
}
