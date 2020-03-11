import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Input from 'cloud-react/input';
import Popup from './popup';
import { createWrapper, renderDOM, destroyDOM, destroyAllDOM, isVaild, selector, calendarIcon, datepickerUI, getPositionByComp } from '../util/view-common';
import enumObj from '../util/enum';
import utils from '../util';

function YearMonthPicker(props) {
	const { value, defaultValue, open, disabled, className, min, max, hasClear, placeholder, showThisMonth, position, onChange, format, ...otherProps } = props;
	const inpRef = React.createRef();
	const firstUpdate = useRef(true);
	const [currentValue, setCurrentValue] = useState(isVaild(value) ? value : defaultValue);
	const [visible, setVisible] = useState(open);
	const [id] = useState(
		Math.random()
			.toString()
			.replace('.', '')
	);
	const [suffix, setSuffix] = useState(calendarIcon);
	const memoValue = useMemo(() => {
		return value;
	}, [value]);

	function onValueChange(output = '', isPop = false) {
		const dateArr = output.split('/');
		const _output = utils.convert(
			{
				year: dateArr[0],
				month: dateArr[1]
			},
			format
		);
		setCurrentValue(_output);
		if (isPop) {
			onChange(_output);
		}
	}

	function onPopChange(output) {
		onValueChange(output, true);
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
			const { HEIGHT_MONTH } = datepickerUI;
			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, HEIGHT_MONTH);
			renderDOM(
				id,
				<Popup
					left={left}
					top={top}
					className={className}
					checkValue={checkValue}
					showThisMonth={showThisMonth}
					max={max}
					min={min}
					onChange={onPopChange}
				/>
			);
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
			}, 0);
		};
	}, []);

	useEffect(() => {
		setVisible(open);
	}, [open]);

	function onInpClick(evt) {
		if (disabled) return;

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
			setSuffix(calendarIcon);
			onChange('');
		}
	}

	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		} else if (value) {
			onValueChange(value);
		} else {
			onInpChange();
		}
	}, [memoValue]);

	return (
		<div onClick={onInpClick} className={`${selector}-container`}>
			<Input
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
			/>
		</div>
	);
}

YearMonthPicker.propTypes = {
	position: PropTypes.oneOf([enumObj.AUTO, enumObj.UP, enumObj.DOWN]),
	hasClear: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	open: PropTypes.bool,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	min: PropTypes.string,
	max: PropTypes.string,
	showThisMonth: PropTypes.bool,
	onChange: PropTypes.func,
	format: PropTypes.string
};

YearMonthPicker.defaultProps = {
	className: '',
	position: enumObj.AUTO,
	hasClear: false,
	placeholder: '',
	disabled: false,
	open: false,
	showThisMonth: true,
	defaultValue: '',
	value: undefined,
	min: '1900/01',
	max: '2100/12',
	format: 'YYYY/MM',
	onChange: () => {}
};

export default YearMonthPicker;
