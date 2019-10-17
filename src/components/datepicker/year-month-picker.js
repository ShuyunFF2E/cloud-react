import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from 'cloud-react/input';
import Popup from './popup/year-month-popup';
import {
	createWrapper,
	renderDOM,
	destroyDOM,
	destroyAllDOM,
	isVaild,
	selector,
	datepickerUI,
	getPositionByComp
} from './util/view-common';
import enumObj from './util/enum';

function YearMonthPicker(props) {
	const { value, defaultValue, open, disabled, className, min, max, hasClear, placeholder, showThisMonth, position, onChange, ...otherProps } = props;
	const inpRef = React.createRef();
	const [currentValue, setCurrentValue] = useState(isVaild(value) ? value : defaultValue);
	const [visible, setVisible] = useState(open);
	// eslint-disable-next-line no-unused-vars
	const [id, setId] = useState(Math.random().toString().replace('.', ''));
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
			const { HEIGHT_MONTH } = datepickerUI;
			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, HEIGHT_MONTH);
			renderDOM(id, <Popup left={left}
								  top={top}
								  className={className}
								  checkValue={checkValue}
								  showThisMonth={showThisMonth}
								  max={max}
								  min={min}
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


	return (<Input
		ref={inpRef}
		{...otherProps}
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

YearMonthPicker.propTypes = {
	position: PropTypes.oneOf([
		enumObj.AUTO,
		enumObj.UP,
		enumObj.DOWN
	]),
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
	onChange: PropTypes.func
}

YearMonthPicker.defaultProps = {
	className: '',
	position: enumObj.AUTO,
	hasClear: true,
	placeholder: '',
	disabled: false,
	open: false,
	showThisMonth: true,
	defaultValue: '',
	value: undefined,
	min: '1900/01',
	max: '2100/12',
	onChange: () => { }
}

export default YearMonthPicker;
