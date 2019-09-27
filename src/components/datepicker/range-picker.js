import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from './popup/range-popup';

import { createWrapper, renderDOM, destroyDOM, getWinHeight, datepickerUI, rangeSelector, selector } from  './util/view-common';
import util from './util';
import enumObj from './util/enum';

const minDefaultDate = new Date('1900/01/01 00:00:00');
const maxDefaultDate = new Date('2099/12/31 23:59:59');
function RangePicker(props) {
	const { value, defaultValue, open, disabled, id, style, minDate, maxDate, placeholder, className, position, onChange, ...otherProps } = props;

	const fmt = 'yyyy/MM/dd';
	const inpRef = React.createRef();

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
				return isStr ? [util.time.convert(util.time.displayNow(_value[0]), fmt), ''] : [_value[0], null];
			case 2:
			default:
				return isStr ? [_value[0] ? util.time.convert(util.time.displayNow(_value[0]), fmt) : '',
					_value[1] ? util.time.convert(util.time.displayNow(_value[1]), fmt) : ''] : [_value[0], _value[1]];
		}
	}

	const [currentValueDate, setCurrentValueDate] = useState(getInitValue());
	const [currentValue, setCurrentValue] = useState(getInitValue(true));
	const [visible, setVisible] = useState(open);

	const [minTempDate, setMinTempDate] = useState(minDate || minDefaultDate);
	const [maxTempDate, setMaxTempDate] = useState(maxDate || maxDefaultDate);

	useEffect(() => {
		setVisible(open);
	}, [open]);

	useEffect(() => {
		setControlled(typeof value !== 'undefined');
	}, [value]);

	useEffect(() => {
		setMinTempDate(minDate);
		setMaxTempDate(maxDate);
	}, [minDate, maxDate]);

	function onPopChange(arr) {
		let newArr = arr;
		if (arr[1] < arr[0]) {
			newArr = arr.reverse();
		}
		setCurrentValueDate(newArr);
		const output = [util.time.convert(util.time.displayNow(newArr[0]), fmt), util.time.convert(util.time.displayNow(newArr[1]), fmt)];
		setCurrentValue(output);
		// eslint-disable-next-line no-use-before-define
		changeVisible(null, false);
		onChange(output, newArr);
	}

	function changeVisible(evt, isVisible) {
		if(isVisible) {
			createWrapper(id);
			const { HEIGHT_DEFAULT } = datepickerUI;
			const { left, bottom, top } = inpRef.current.getBoundingClientRect();
			let _top = 0;
			switch (position) {
				case enumObj.AUTO:
					_top = getWinHeight() - bottom > HEIGHT_DEFAULT ? bottom : top - HEIGHT_DEFAULT;
					break;
				case enumObj.UP:
					_top = top - HEIGHT_DEFAULT;
					break;
				case enumObj.DOWN:
				default:
					_top = bottom;
					break;
			}
			renderDOM(id, <Popup min={minTempDate}
								  max={maxTempDate}
								  className={className}
								  checkDateArr={currentValueDate}
								  onChange={onPopChange}
								  left={left}
								  top={_top} />);
		} else {
			setVisible(false);
			destroyDOM(id);
		}
	}

	useEffect(() => {
		document.addEventListener('click', changeVisible, false);
		if(open) {
			changeVisible(null, visible);
		}
		return () => {
			document.removeEventListener('click', changeVisible, false);
		}
	}, []);

	function onInpClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
		if (!visible) {
			setVisible(true);
			changeVisible(evt, true);
		}
	}
	const disabledClass = disabled ? `${rangeSelector}-disabled` : '';
	return (<div className={`${rangeSelector} ${className} ${disabledClass}`} {...otherProps}>
		<input
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
		<input
			value={currentValue[1]}
			placeholder={placeholder[0]}
			readOnly
			style={style}
			disabled={disabled}
			className={`${selector}-inp`}
			onClick={onInpClick}
		/>
	</div>);
}

RangePicker.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	disabled: PropTypes.bool,
	placeholder: PropTypes.arrayOf(PropTypes.string),
	defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
	value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
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
	id: new Date().getTime().toString(),
	className: '',
	style: {},
	position: enumObj.AUTO,
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
