import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'cloud-react/input';
import Popup from './popup';
import { createWrapper, renderDOM, destroyDOM, destroyAllDOM, isVaild, getPositionByComp } from '../util/view-common';
import { enumObj, calendarIcon, containerClass, selectorClass } from '../constant';

import { convert } from '../util';

class MonthDayPicker extends Component {
	constructor(props) {
		super(props);

		this.inpRef = React.createRef();

		const { value, defaultValue, open } = props;

		this.state = {
			suffix: calendarIcon,
			currentValue: isVaild(value) ? value : defaultValue,
			id: Math.random()
				.toString()
				.replace('.', ''),
			visible: open
		};
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
		const { format, onChange } = this.props;

		const dateArr = output.split('/');
		const _output = convert(
			{
				month: dateArr[0],
				day: dateArr[1]
			},
			format
		);

		this.setState({
			currentValue: _output
		});

		if (isPop) {
			onChange(_output);
		}
	};

	onPopChange = output => {
		this.handleValueChange(output, true);
		// eslint-disable-next-line no-use-before-define
		this.changeVisible(null, false);
		if (this.props.hasClear) {
			this.setState({
				suffix: null
			});
		}
	};

	changeVisible = (evt, isVisible) => {
		const { inpRef, onPopChange } = this;
		const { id, currentValue } = this.state;
		const { position, className, showToday } = this.props;

		if (isVisible && id) {
			this.setState({
				visible: true
			});

			createWrapper(id);

			// 获取面板的定位
			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, 262);
			// 渲染DOM
			renderDOM(id, <Popup left={left} top={top} className={className} checkValue={currentValue} showToday={showToday} onChange={onPopChange} />);
			return;
		}
		destroyDOM(id);
	};

	handleClick = evt => {
		const { disabled } = this.props;
		const { id, visible } = this.state;

		if (disabled) return;

		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
		// 如果不可见则显示面板
		if (!visible || !document.getElementById(id)) {
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

MonthDayPicker.propTypes = {
	position: PropTypes.oneOf([enumObj.AUTO, enumObj.UP, enumObj.DOWN]),
	className: PropTypes.string,
	hasClear: PropTypes.bool,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	open: PropTypes.bool,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	showToday: PropTypes.bool,
	onChange: PropTypes.func,
	format: PropTypes.string
};

MonthDayPicker.defaultProps = {
	className: '',
	position: enumObj.AUTO,
	placeholder: '',
	hasClear: false,
	disabled: false,
	open: false,
	showToday: true,
	defaultValue: '',
	value: undefined,
	format: 'MM/DD',
	onChange: () => {}
};

export default MonthDayPicker;
