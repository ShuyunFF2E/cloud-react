import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from 'cloud-react/input';
import Popup from './popup/month-day-popup';
import { createWrapper, renderDOM, destroyDOM, destroyAllDOM, isVaild, datepickerUI, selector, getPositionByComp } from './util/view-common';
import enumObj from './util/enum';

function MonthDayPicker(props) {
	const { value, defaultValue, open, disabled, className, hasClear, placeholder, showToday, position, onChange, ...otherProps } = props;
	const [currentValue, setCurrentValue] = useState(isVaild(value) ? value : defaultValue);
	const [visible, setVisible] = useState(open);
	// eslint-disable-next-line no-unused-vars
	const [id, setId] = useState(Math.random().toString().replace('.', ''));
	const inpRef = React.createRef();

	function onPopChange(output) {
		setCurrentValue(output);
		// eslint-disable-next-line no-use-before-define
		changeVisible(null, false);
		onChange(output);
	}

	function changeVisible(evt, isVisible) {
		if(isVisible && id) {
			createWrapper(id);
			const checkValue = currentValue;
			const { HEIGHT_MONTH_DAY } = datepickerUI;
			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, HEIGHT_MONTH_DAY);
			renderDOM(id, <Popup left={left}
								  top={top}
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
		if (!visible || !document.getElementById(id)) {
			destroyAllDOM();
			setVisible(true);
			changeVisible(evt, true);
		}
	}

	function onInpChange(evt) {
		if (!evt.target.value.trim().length) {
			setCurrentValue('');
			onChange('');
		}
	}

    return (<Input {...otherProps}
		ref={inpRef}
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
	hasClear: true,
	disabled: false,
	open: false,
	showToday: true,
	defaultValue: '',
	value: undefined,
	onChange: () => { }
}

export default MonthDayPicker;
