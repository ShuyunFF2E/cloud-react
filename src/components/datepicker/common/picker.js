import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Input from '../../input';
import Year from '../year/main';
import YearMonth from '../year-month/main';
import MonthDay from '../month-day/main';
import DatePicker from '../date-picker/main';
import { createWrapper, renderDOM, destroyDOM, destroyAllDOM, getPositionByComp } from './utils';
import { enumObj, calendarIcon, containerClass, selectorClass } from '../constant';
import { transformObj } from '../utils';

class Picker extends Component {
	constructor(props) {
		super(props);

		const { value, defaultValue, open } = props;

		this.state = {
			suffix: calendarIcon,
			currentValue: value !== undefined && value !== null ? value : defaultValue,
			id: Math.random()
				.toString()
				.replace('.', ''),
			visible: open
		};

		this.inpRef = React.createRef();
	}

	componentDidMount() {
		document.addEventListener('click', this.changeVisible, false);
		if (this.props.open) {
			this.changeVisible(null, this.state.visible);
		}
	}

	componentDidUpdate(prevProps) {
		const { value: prevValue, open: prevOpen } = prevProps;
		const { value, open } = this.props;
		if (prevValue !== value) {
			if (value) {
				this.handleValueChange(value);
			} else {
				this.handleChange();
			}
		}
		if (prevOpen !== open) {
			this.updateVisible();
		}
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.changeVisible, false);
	}

	updateVisible() {
		this.setState({
			visible: this.props.open
		});
	}

	handleValueChange = (output = '', isPop = false) => {
		const value = this.props.formatValue(output);
		this.setState({
			currentValue: value
		});
		if (isPop) {
			this.props.onChange(value);
		}
	};

	onPopChange = output => {
		this.handleValueChange(output, true);
		this.changeVisible(null, false);

		if (this.props.hasClear) {
			this.setState({
				suffix: null
			});
		}
	};

	renderMainPop = () => {
		const { tempMode } = this.props;
		const { currentValue } = this.state;

		if (tempMode === enumObj.YEAR_MODEL) {
			return <Year {...this.props} checkValue={currentValue} onChange={this.onPopChange} />;
		}

		if (tempMode === enumObj.YEAR_MONTH_MODEL) {
			return <YearMonth {...this.props} checkValue={currentValue} onChange={this.onPopChange} />;
		}

		if (tempMode === enumObj.MONTH_DAY_MODEL) {
			return <MonthDay {...this.props} checkValue={currentValue} onChange={this.onPopChange} />;
		}

		if (tempMode === enumObj.DATE_MODEL) {
			return <DatePicker {...this.props} checkValue={transformObj(currentValue)} onChange={this.onPopChange} />;
		}

		return null;
	};

	popClick = evt => {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
	};

	changeVisible = (evt, isVisible) => {
		const { inpRef } = this;
		const { id } = this.state;
		const { position, className, height } = this.props;

		if (isVisible && id) {
			this.setState({
				visible: true
			});

			createWrapper(id);

			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, height);

			renderDOM(
				id,
				<div className={`${selectorClass}-popup ${className}`} style={{ left, top }} onClick={this.popClick}>
					{this.renderMainPop()}
				</div>
			);

			return;
		}

		destroyDOM(id);
	};

	handleClick = evt => {
		const { disabled } = this.props;
		const { visible, id } = this.state;

		if (disabled) return;

		// 阻止合成事件的冒泡
		evt.stopPropagation();
		// 阻止与原生事件的冒泡
		evt.nativeEvent.stopImmediatePropagation();
		// 如果不可见则显示面板
		if (!visible || !document.getElementById(id)) {
			// 先释放其他面板
			destroyAllDOM();
			this.changeVisible(evt, true);
		}
	};

	handleChange = (evt = '') => {
		if (!evt || !evt.target.value.trim().length) {
			this.props.onChange('');
			this.setState({
				currentValue: '',
				suffix: calendarIcon
			});
		}
	};

	render() {
		const { inpRef, handleClick, handleChange } = this;
		const { suffix, currentValue } = this.state;
		const { placeholder, hasClear, disabled } = this.props;

		return (
			<div onClick={handleClick} className={containerClass}>
				<Input
					readOnly
					ref={inpRef}
					suffix={suffix}
					value={currentValue}
					placeholder={placeholder}
					hasClear={hasClear}
					className={`${selectorClass}-inp`}
					onChange={handleChange}
					disabled={disabled}
				/>
			</div>
		);
	}
}

Picker.propTypes = {
	position: PropTypes.oneOf([enumObj.AUTO, enumObj.UP, enumObj.DOWN]),
	className: PropTypes.string,
	hasClear: PropTypes.bool,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	open: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	// showCurrent: PropTypes.bool,
	formatValue: PropTypes.func,
	onChange: PropTypes.func
};

Picker.defaultProps = {
	position: enumObj.AUTO,
	className: '',
	hasClear: false,
	disabled: false,
	placeholder: '',
	open: false,
	// showCurrent: true,
	defaultValue: '',
	value: undefined,
	formatValue: noop,
	onChange: noop
};

export default Picker;
