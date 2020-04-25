import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Input from 'cloud-react/input';
import Popup from './popup';
import { convert, displayNow, transformObj } from '../util';
import { enumObj, selectorClass, containerClass, calendarIcon } from '../constant';

import { createWrapper, renderDOM, destroyDOM, destroyAllDOM, isVaild, formatZero, getPositionByComp, datepickerUI } from '../util/view-common';

const DEFAULT_FORMAT = 'yyyy/MM/dd';

function getFormat(_showTimePicker, _mode, format = DEFAULT_FORMAT) {
	if (_showTimePicker) {
		if (_mode === enumObj.DATE_HOUR) {
			return `${format} hh`;
		}
		if (_mode === enumObj.DATE_HOUR_MINUTE) {
			return `${format} hh:mm`;
		}
		return `${format} hh:mm:ss`;
	}
	return `${format}`;
}

function DatePicker(props) {
	const {
		value,
		defaultValue,
		defaultTime,
		open,
		disabled,
		minDate,
		maxDate,
		position,
		className,
		hasClear,
		showToday,
		showNow,
		showTimePicker,
		mode,
		onChange,
		placeholder,
		maxYear,
		minYear,
		format,
		selectorStyle,
		...otherProps
	} = props;
	const inpRef = React.createRef();
	const firstUpdate = useRef(true);
	// 每个组件实例id，对应面板DOM节点
	const [id] = useState(
		Math.random()
			.toString()
			.replace('.', '')
	);
	let fmt = getFormat(showTimePicker, mode, format);
	const [visible, setVisible] = useState(open);
	const [currentValueDate, setCurrentValueDate] = useState(isVaild(value) ? value : defaultValue);
	const [currentValue, setCurrentValue] = useState(() => {
		if (!currentValueDate) {
			return '';
		}
		return convert(displayNow(currentValueDate), fmt);
	});
	const [suffix, setSuffix] = useState(calendarIcon);
	const memoValue = useMemo(() => {
		return value;
	}, [value]);

	function onValueChange(obj = {}, isPop = false) {
		const dpArr = [`${obj.year}/${formatZero(obj.month)}/${formatZero(obj.day)}`];
		const str = dpArr.push(` ${formatZero(obj.hour)}:${formatZero(obj.minute)}:${formatZero(obj.second)}`) && dpArr.toString();
		const outputDate = new Date(str);
		const output = convert(displayNow(outputDate), fmt);
		setCurrentValue(output);
		setCurrentValueDate(outputDate);
		// 有clear Icon时，日历Icon不显示
		if (hasClear) {
			setSuffix(null);
		}
		if (isPop) {
			onChange(output);
		}
	}

	useEffect(() => {
		if (defaultValue && hasClear) {
			setSuffix(null);
		}
	}, []);

	useEffect(() => {
		setVisible(open);
	}, [open]);

	useEffect(() => {
		fmt = getFormat(showTimePicker, mode);
	}, [showTimePicker, mode]);

	function onPopChange(obj) {
		if (obj) {
			onValueChange(obj, true);
			// eslint-disable-next-line no-use-before-define
			changeVisible(null, false);
		}
	}
	// 响应事件，渲染或者 卸载DOM
	function changeVisible(evt, isVisible) {
		if (isVisible && id) {
			setVisible(true);
			createWrapper(id);
			const checkDate = currentValueDate;
			const { HEIGHT_DEFAULT, HEIGHT_TIME } = datepickerUI;
			// 获取面板的定位
			const { left, top } = getPositionByComp(
				inpRef.current.inputRef.current.getBoundingClientRect(),
				position,
				showTimePicker ? HEIGHT_TIME : HEIGHT_DEFAULT
			);
			// 渲染DOM
			renderDOM(
				id,
				<Popup
					left={left}
					top={top}
					mode={mode}
					className={className}
					checkDateObj={transformObj(checkDate)}
					showToday={showToday}
					showNow={showNow}
					defaultTime={defaultTime}
					showTimePicker={showTimePicker}
					max={maxDate}
					min={minDate}
					maxYear={maxYear}
					minYear={minYear}
					onChange={onPopChange}
				/>
			);
			return;
		}
		destroyDOM(id);
	}
	// 组件渲染时，仅注册一次相关事件
	useEffect(() => {
		document.addEventListener('click', changeVisible, false);
		if (open) {
			changeVisible(null, visible);
		}
		return () => {
			// fix issue 121
			setTimeout(() => {
				document.removeEventListener('click', changeVisible, false);
			}, 0);
		};
	}, []);

	function onInpClick(evt) {
		if (disabled) return;

		// 阻止合成事件的冒泡
		evt.stopPropagation();
		// 阻止与原生事件的冒泡
		evt.nativeEvent.stopImmediatePropagation();
		// 如果不可见则显示面板
		if (!visible || !document.getElementById(id)) {
			destroyAllDOM();
			changeVisible(evt, true);
		}
	}

	function onInpChange(evt = '') {
		if (!evt || !evt.target.value.trim().length) {
			setCurrentValue('');
			setCurrentValueDate(null);
			// 清空后，显示出日历Icon
			setSuffix(calendarIcon);
			onChange('');
		}
	}

	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else if (value) {
			onValueChange(displayNow(value));
		} else {
			onInpChange();
		}
	}, [memoValue]);

	return (
		<div onClick={onInpClick} className={containerClass}>
			<Input
				{...otherProps}
				ref={inpRef}
				suffix={suffix}
				value={currentValue}
				placeholder={placeholder}
				readOnly
				hasClear={hasClear}
				className={`${selectorClass}-inp`}
				style={selectorStyle}
				disabled={disabled}
				onChange={evt => onInpChange(evt)}
				onClick={onInpClick}
			/>
		</div>
	);
}

DatePicker.propTypes = {
	className: PropTypes.string,
	selectorStyle: PropTypes.object,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	format: PropTypes.string,
	position: PropTypes.oneOf([enumObj.AUTO, enumObj.UP, enumObj.DOWN]),
	mode: PropTypes.oneOf([enumObj.DATE_HOUR, enumObj.DATE_HOUR_MINUTE]),
	open: PropTypes.bool,
	hasClear: PropTypes.bool,
	defaultValue: PropTypes.instanceOf(Date),
	defaultTime: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	maxYear: PropTypes.number,
	minYear: PropTypes.number,
	// 显示今天按钮，当showTimePicker为false时有效
	showToday: PropTypes.bool,
	// 显示此刻按钮，当showTimePicker为true时有效
	showNow: PropTypes.bool,
	showTimePicker: PropTypes.bool,
	onChange: PropTypes.func
};

DatePicker.defaultProps = {
	className: '',
	selectorStyle: {},
	format: DEFAULT_FORMAT,
	mode: undefined,
	disabled: false,
	placeholder: '请选择日期',
	position: enumObj.AUTO,
	hasClear: false,
	open: false,
	showNow: false,
	showToday: false,
	showTimePicker: false,
	defaultValue: null,
	defaultTime: '00:00:00',
	value: undefined,
	minDate: undefined,
	maxDate: undefined,
	minYear: 1980,
	maxYear: 2030,
	onChange: () => {}
};

export default DatePicker;
