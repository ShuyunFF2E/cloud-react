import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Input from '../../input';
import Popup from './popup';
import {
	createWrapper,
	renderDOM,
	destroyDOM,
	destroyAllDOM,
	datepickerUI,
	calendarIcon,
	rangeSelector,
	selector,
	getPositionByComp
} from '../util/view-common';
import util from '../util';
import enumObj from '../util/enum';

const minDefaultDate = new Date('1900/01/01 00:00:00');
const maxDefaultDate = new Date('2099/12/31 23:59:59');
const fmt = 'yyyy/MM/dd';

function RangePicker(props) {

	const { value, defaultValue, open, disabled, style, hasClear, minDate, maxDate, placeholder, className, position, onChange, ...otherProps } = props;

	const inpRef = React.createRef();
	const [id,] = useState(Math.random().toString().replace('.', ''));
	const [suffix, setSuffix] = useState(calendarIcon);
	const [controlled, setControlled] = useState(typeof value !== 'undefined');

	function getInitValue(isStr) {
		let _value = defaultValue;
		if (controlled) {
			_value = value;
		}
		switch (_value.length) {
			case 0:
				return isStr ? ['', ''] : [null, null];
			case 1:
				return isStr ? [util.convert(util.displayNow(_value[0]), fmt), ''] : [_value[0], null];
			case 2:
			default:
				return isStr ? [_value[0] ? util.convert(util.displayNow(_value[0]), fmt) : '',
					_value[1] ? util.convert(util.displayNow(_value[1]), fmt) : ''] : [_value[0], _value[1]];
		}
	}

	const [currentValueDate, setCurrentValueDate] = useState(getInitValue());
	const [currentValue, setCurrentValue] = useState(getInitValue(true));
	const [visible, setVisible] = useState(open);

	const [minTempDate, setMinTempDate] = useState(minDate || minDefaultDate);
	const [maxTempDate, setMaxTempDate] = useState(maxDate || maxDefaultDate);
	const memoValue = useMemo(() => {}, [value])

	function onValueChange (arr) {
		let newArr = arr;
		// 增加代码健壮性，如果日期顺序不对，则进行reverse后正确显示
		if (arr[1] < arr[0]) {
			newArr = arr.reverse();
		}
		setCurrentValueDate(newArr);
		const output = [util.convert(util.displayNow(newArr[0]), fmt), util.convert(util.displayNow(newArr[1]), fmt)];
		setCurrentValue(output);
		onChange(output, arr);
	}

	useEffect(() => {
		setVisible(open);
	}, [open]);

	useEffect(() => {
		setControlled(typeof value !== 'undefined');
	}, [value]);

	useEffect(() => {
		setControlled(typeof value !== 'undefined');
		if(value && value[0]) {
			onValueChange(value)
		}
	}, [memoValue]);


	useEffect(() => {
		setMinTempDate(new Date(new Date(minDate).setHours(0, 0, 0, 0)));
		setMaxTempDate(maxDate);
	}, [minDate, maxDate]);

	function onPopChange(arr) {
		onValueChange(arr)
		// eslint-disable-next-line no-use-before-define
		changeVisible(null, false);
		if (hasClear) {
			setSuffix(null);
		}
	}

	function changeVisible(evt, isVisible) {
		if(isVisible && id) {
			createWrapper(id);
			const { HEIGHT_DEFAULT } = datepickerUI;
			// 获取面板的定位
			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, HEIGHT_DEFAULT);
			// 渲染DOM
			renderDOM(id, <Popup
				min={minTempDate}
				max={maxTempDate}
				className={className}
				checkDateArr={currentValueDate}
				onChange={onPopChange}
				left={left}
				top={top}
			/>);
			return;
		}
		setVisible(false);
		destroyDOM(id);
	}
	// 组件渲染时，仅注册一次相关事件
	useEffect(() => {
		document.addEventListener('click', changeVisible, false);
		if (open) {
			changeVisible(null, visible);
		}
		return () => {
			document.removeEventListener('click', changeVisible, false);
		}
	}, []);

	function onInpClick(evt) {
		// 阻止合成事件的冒泡
		evt.stopPropagation();
		// 阻止与原生事件的冒泡
		evt.nativeEvent.stopImmediatePropagation();
		// 如果不可见则显示面板
		if (!visible || !document.getElementById(id)) {
			destroyAllDOM();
			setVisible(true);
			changeVisible(evt, true);
		}
	}

	function onInpChange(evt) {
		if (!evt.target.value.trim().length) {
			setCurrentValue(['', '']);
			setCurrentValueDate([null, null]);
			setSuffix(calendarIcon);
			onChange(['', ''], [null, null]);
		}
	}

	const disabledClass = disabled ? `${rangeSelector}-disabled` : '';
	return (<div className={`${rangeSelector} ${className} ${disabledClass}`} {...otherProps}>
		<Input
			ref={inpRef}
			style={style}
			value={currentValue[0]}
			placeholder={placeholder[0]}
			readOnly
			disabled={disabled}
			className={`${selector}-inp`}
			onClick={onInpClick}
		/>
		<span className={`${rangeSelector}-separator`} />
		<Input
			value={currentValue[1]}
			placeholder={placeholder[0]}
			readOnly
			suffix={suffix}
			hasClear={hasClear}
			style={style}
			disabled={disabled}
			className={`${selector}-inp`}
			onChange={evt => onInpChange(evt)}
			onClick={onInpClick}
		/>
	</div>);
}

RangePicker.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	disabled: PropTypes.bool,
	hasClear: PropTypes.bool,
	placeholder: PropTypes.arrayOf(PropTypes.string),
	defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
	value: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.instanceOf(Date)),
		PropTypes.arrayOf(PropTypes.string)
	]),
	open: PropTypes.bool,
	position: PropTypes.oneOf([
		enumObj.AUTO,
		enumObj.UP,
		enumObj.DOWN
	]),
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	onChange: PropTypes.func
}

RangePicker.defaultProps = {
	className: '',
	style: {},
	position: enumObj.AUTO,
	hasClear: false,
	disabled: false,
	placeholder: ['请选择开始时间', '请选择结束时间'],
	defaultValue: [null, null],
	value: undefined,
	open: false,
	minDate: new Date('1900/01/01 00:00:00'),
	maxDate: new Date('2099/12/31 23:59:59'),
	onChange: () => {}
}

export default RangePicker;
