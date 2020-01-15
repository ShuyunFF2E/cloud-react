import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Input from 'cloud-react/input';
import Popup from './popup';
import {
	createWrapper,
	renderDOM,
	destroyDOM,
	destroyAllDOM,
	isVaild,
	datepickerUI,
	selector,
	getPositionByComp,
	calendarIcon
} from '../util/view-common';
import enumObj from '../util/enum';

function MonthDayPicker(props) {
	const { value, defaultValue, open, disabled, className, hasClear, placeholder, showToday, position, onChange, ...otherProps } = props;
	const [currentValue, setCurrentValue] = useState(isVaild(value) ? value : defaultValue);
	const [visible, setVisible] = useState(open);
	// 每个组件实例id，对应面板DOM节点
	const [id,] = useState(Math.random().toString().replace('.', ''));
	// 日历Icon位置，因为可能会有clear Icon出现。所以交替显示
	const [suffix, setSuffix] = useState(calendarIcon);
	const inpRef = React.createRef();
	const memoValue = useMemo(() => { return value }, [value])
	const firstUpdate = useRef(true);

	function onValueChange(output = '', isPop = false) {
		setCurrentValue(output);
		if(isPop) {
			onChange(output);
		}
	}

	function onPopChange(output) {
		onValueChange(output, true)
		// eslint-disable-next-line no-use-before-define
		changeVisible(null, false);
		if (hasClear) {
			setSuffix(null);
		}
	}

	function changeVisible(evt, isVisible) {
		if (isVisible && id) {
			setVisible(true);
			createWrapper(id);
			const checkValue = currentValue;
			const { HEIGHT_MONTH_DAY } = datepickerUI;
			// 获取面板的定位
			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, HEIGHT_MONTH_DAY);
			// 渲染DOM
			renderDOM(id, <Popup
				left={left}
				top={top}
				className={className}
				checkValue={checkValue}
				showToday={showToday}
				onChange={onPopChange}
			/>);
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
			setTimeout(() => {
				document.removeEventListener('click', changeVisible, false);
			},0)
		}
    }, []);

	useEffect(() => {
		setVisible(open);
	}, [open]);
	

	function onInpClick(evt) {
		evt.stopPropagation();
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
			// 清空后，显示出日历Icon
			setSuffix(calendarIcon);
			onChange('');
		}
	}
	useEffect(() => {
		if(value) {
			onValueChange(value);
		} else {
			onInpChange()
		}
	}, [memoValue]);

	useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else if(value) {
			onValueChange(value);
		} else {
			onInpChange()
		}
  }, [memoValue]);

    return (<Input
		{...otherProps}
		ref={inpRef}
		suffix={suffix}
        value={currentValue}
		placeholder={placeholder}
		readOnly
		hasClear={hasClear}
		className={`${selector}-inp`}
		onChange={evt => onInpChange(evt)}
		disabled={disabled}
		onClick={onInpClick}
 	/>);
}

MonthDayPicker.propTypes = {
	position: PropTypes.oneOf([
		enumObj.AUTO,
		enumObj.UP,
		enumObj.DOWN
	]),
	className: PropTypes.string,
	hasClear: PropTypes.bool,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	open: PropTypes.bool,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	showToday: PropTypes.bool,
	onChange: PropTypes.func,
}

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
	onChange: () => { }
}

export default MonthDayPicker;
