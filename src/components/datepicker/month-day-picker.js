import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from './popup/month-day-popup';
import { createWrapper, renderDOM, destroyDOM, isVaild, datepickerUI, selector, getWinHeight } from './util/view-common';
import enumObj from './util/enum';

function MonthDayPicker(props) {
	const { value, defaultValue, open, disabled, className, placeholder, showToday, id, position, onChange, ...otherProps } = props;
	const [currentValue, setCurrentValue] = useState(isVaild(value)? value: defaultValue);
	const [visible, setVisible] = useState(open);
	const inpRef = React.createRef();

	function onPopChange(output) {
		setCurrentValue(output);
		// eslint-disable-next-line no-use-before-define
		changeVisible(null, false);
		onChange(output);
	}

	function changeVisible(evt, isVisible) {
		if(isVisible) {
			createWrapper(id);
			const checkValue = currentValue;
			const { HEIGHT_MONTH_DAY } = datepickerUI;
			const { left, bottom, top } = inpRef.current.getBoundingClientRect();
			let _top = 0;
			switch (position) {
				case enumObj.AUTO:
					_top = getWinHeight() - bottom > HEIGHT_MONTH_DAY ? bottom : top - HEIGHT_MONTH_DAY;
					break;
				case enumObj.UP:
					_top = top - HEIGHT_MONTH_DAY;
					break;
				case enumObj.DOWN:
				default:
					_top = bottom;
					break;
			}
			renderDOM(id, <Popup left={left}
								  top={_top}
								  className={className}
								  checkValue={checkValue}
								  showToday={showToday}
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

	useEffect(() => {
		setVisible(open);
	}, [open]);

	function onInpClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
        if(!visible) {
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

MonthDayPicker.propTypes = {
	id: PropTypes.string,
	position: PropTypes.oneOf([
		enumObj.AUTO,
		enumObj.UP,
		enumObj.DOWN
	]),
	className: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	open: PropTypes.bool,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	showToday: PropTypes.bool,
	onChange: PropTypes.func,
}

MonthDayPicker.defaultProps = {
	id: Math.random().toString().replace('.',''),
	className: '',
	position: enumObj.AUTO,
	placeholder: '',
	disabled: false,
	open: false,
	showToday: true,
	defaultValue: '',
	value: undefined,
	onChange: () => { }
}

export default MonthDayPicker;
