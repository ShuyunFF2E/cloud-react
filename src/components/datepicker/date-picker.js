import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from './popup/date-popup';
import util from './util';
import enumObj from './util/enum';

import { createWrapper, renderDOM, destroyDOM, isVaild, formatZero, getWinHeight, datepickerUI, selector } from  './util/view-common';

function getFormat(_showTimePicker, _mode) {
	if (_showTimePicker) {
		if (_mode === enumObj.DATE_HOUR) {
			return 'yyyy/MM/dd hh';
		} if (_mode === enumObj.DATE_HOUR_MINUTE) {
			return 'yyyy/MM/dd hh:mm';
		}
		return 'yyyy/MM/dd hh:mm:ss';
	}
	return 'yyyy/MM/dd';
}

function DatePicker(props) {
	const { value, defaultValue, open, disabled, minDate, maxDate, position, className, id,
		showToday, showNow, showTimePicker, mode, onChange, placeholder, ...otherProps } = props;
	const inpRef = React.createRef();
	let fmt = getFormat(showTimePicker, mode);

	const [visible, setVisible] = useState(open);
	const [currentValueDate, setCurrentValueDate] = useState(isVaild(value) ? value : defaultValue);
	const [currentValue, setCurrentValue] = useState(() => {
		if (!currentValueDate) {
			return '';
		}
		return util.time.convert(util.time.displayNow(currentValueDate), fmt);
	});

	useEffect(() => {
		setVisible(open);
	}, [open]);

	useEffect(() => {
		fmt = getFormat(showTimePicker, mode);
	}, [showTimePicker, mode]);

	function onPopChange(obj) {
		if (obj) {
			const dpArr = [`${obj.year}/${formatZero(obj.month)}/${formatZero(obj.day)}`];
			const str = showTimePicker ? dpArr.push(` ${formatZero(obj.hour)}:${formatZero(obj.minute)}:${formatZero(obj.second)}`) && dpArr.toString() : dpArr.toString();
			const outputDate = new Date(str);
			const output = util.time.convert(util.time.displayNow(outputDate), fmt);
			setCurrentValue(output);
			setCurrentValueDate(outputDate);
			// eslint-disable-next-line no-use-before-define
			changeVisible(null, false);
			onChange(output);
		}
	}

	function changeVisible(evt, isVisible) {
		if(isVisible) {
			createWrapper(id);
			const checkDate = currentValueDate;
			const { HEIGHT_DEFAULT, HEIGHT_TIME } = datepickerUI;
			const { left, bottom, top } = inpRef.current.getBoundingClientRect();
			let _top = 0;
			switch (position) {
				case enumObj.AUTO:
					_top = getWinHeight() - bottom > (showTimePicker ? HEIGHT_TIME : HEIGHT_DEFAULT) ? bottom : top - (showTimePicker ? HEIGHT_TIME : HEIGHT_DEFAULT);
					break;
				case enumObj.UP:
					_top = top - (showTimePicker ? HEIGHT_TIME : HEIGHT_DEFAULT);
					break;
				case enumObj.DOWN:
				default:
					_top = bottom;
					break;
			}
			renderDOM(id, <Popup left={left}
								 top={_top}
								 mode={mode}
								 className={className}
								 checkDateObj={util.transformObj(checkDate)}
								 showToday={showToday}
								 showNow={showNow}
								 showTimePicker={showTimePicker}
								 max={maxDate}
								 min={minDate}
								 onChange={onPopChange} />);
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

    return (<input {...otherProps}
		ref={inpRef}
        value={currentValue}
		placeholder={placeholder}
		readOnly
		className={`${selector}-inp`}
		disabled={disabled}
		onClick={onInpClick}
 	/>);
}

DatePicker.propTypes =  {
	id: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	position: PropTypes.oneOf([
		enumObj.AUTO,
		enumObj.UP,
		enumObj.DOWN
	]),
	mode: PropTypes.oneOf([
		enumObj.DATE_HOUR,
		enumObj.DATE_HOUR_MINUTE
	]),
	open: PropTypes.bool,
	defaultValue: PropTypes.instanceOf(Date),
	value: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	minDate: PropTypes.instanceOf(Date),
	// 显示今天按钮，当showTimePicker为false时有效
	showToday: PropTypes.bool,
	// 显示此刻按钮，当showTimePicker为true时有效
	showNow: PropTypes.bool,
	showTimePicker: PropTypes.bool,
	onChange: PropTypes.func
}

DatePicker.defaultProps = {
	id: Math.random().toString().replace('.',''),
	className: '',
	mode: undefined,
	disabled: false,
	placeholder: '请选择日期',
	position: enumObj.AUTO,
	open: false,
	showNow: false,
	showToday: false,
	showTimePicker: false,
	defaultValue: null,
	value: undefined,
	minDate: undefined,
	maxDate: undefined,
	onChange: () => { }
}

export default DatePicker;
