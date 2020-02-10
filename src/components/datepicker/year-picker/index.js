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
	calendarIcon,
	selector,
	getPositionByComp
} from '../util/view-common';
import enumObj from '../util/enum';

function YearPicker(props) {
	const { value, defaultValue, open, disabled, min, max, hasClear, placeholder, position, className, showThisYear, onChange, ...otherProps } = props;
	const inpRef = React.createRef();
	const firstUpdate = useRef(true);
	const [id,] = useState(Math.random().toString().replace('.', ''));
	const [currentValue, setCurrentValue] = useState(isVaild(value) ? value : defaultValue);
	const [visible, setVisible] = useState(open);
	const [suffix, setSuffix] = useState(calendarIcon);
	const memoValue = useMemo(() => { return value }, [value])

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
			const checkValue = currentValue ? parseInt(currentValue, 10) : undefined;
			const { HEIGHT_YEAR } = datepickerUI;
			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, HEIGHT_YEAR);
			renderDOM(id, <Popup
				left={left}
				top={top}
				checkValue={checkValue}
				className={className}
				showThisYear={showThisYear}
				max={max}
				min={min}
				onChange={onPopChange}
			/>);
			return;
		}
		destroyDOM(id);
	}

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
		// 阻止合成事件的冒泡
		evt.stopPropagation();
		// 阻止与原生事件的冒泡
		evt.nativeEvent.stopImmediatePropagation();
		// 如果不可见则显示面板
		if (!visible || !document.getElementById(id)) {
			// 先释放其他面板
			destroyAllDOM();
			changeVisible(evt, true);
		}
	}

	function onInpChange(evt = '') {
		if (!evt || !evt.target.value.trim().length) {
			setCurrentValue('');
			onChange('');
			setSuffix(calendarIcon);
		}
	}
	
	useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else if(value) {
			onValueChange(value);
		} else {
			onInpChange()
		}
	}, [memoValue]);

	return (
		<div 
				onClick={onInpClick}
				className={`${selector}-container`}>
				<Input {...otherProps}
					ref={inpRef}
					suffix={suffix}
							value={currentValue}
					placeholder={placeholder}
					readOnly
					hasClear={hasClear}
					className={`${selector}-inp`}
					onChange={evt => onInpChange(evt)}
					disabled={disabled}
		/>
	</div>);
}

YearPicker.propTypes =  {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	hasClear: PropTypes.bool,
	placeholder: PropTypes.string,
	position: PropTypes.oneOf([
		enumObj.AUTO,
		enumObj.UP,
		enumObj.DOWN
	]),
	// 控制初次渲染时，弹层是否默认打开
	open: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
	value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    min: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
	max: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
	showThisYear: PropTypes.bool,
	onChange: PropTypes.func,
}

YearPicker.defaultProps = {
	className: '',
	position: enumObj.AUTO,
	placeholder: '',
	hasClear: false,
	disabled: false,
	open: false,
	showThisYear: true,
	defaultValue: '',
	value: undefined,
	min: 1900,
	max: 2100,
	onChange: () => { }
}

export default YearPicker;
