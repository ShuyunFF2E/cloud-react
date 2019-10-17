import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from 'cloud-react/input';
import Popup from './popup/year-region-popup';
import {
	createWrapper,
	renderDOM,
	destroyDOM,
	destroyAllDOM,
	isVaild,
	datepickerUI,
	selector,
	getPositionByComp
} from './util/view-common';
import enumObj from './util/enum';

function YearPicker(props) {
	const { value, defaultValue, open, disabled, min, max, hasClear, placeholder, position, className, showThisYear, onChange, ...otherProps } = props;
	const inpRef = React.createRef();
	// eslint-disable-next-line no-unused-vars
	const [id, setId] = useState(Math.random().toString().replace('.', ''));
	const [currentValue, setCurrentValue] = useState(isVaild(value) ? value : defaultValue);
	const [visible, setVisible] = useState(open);

	function onPopChange(output) {
		setCurrentValue(output);
		// eslint-disable-next-line no-use-before-define
		changeVisible(null, false);
		onChange(output);
	}

	function changeVisible(evt, isVisible) {
		if(isVisible && id) {
			createWrapper(id);
			const checkValue = currentValue ? parseInt(currentValue, 10) : undefined;
			const { HEIGHT_YEAR } = datepickerUI;
			const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, HEIGHT_YEAR);

			renderDOM(id, <Popup left={left}
								 top={top}
								 checkValue={checkValue}
								 className={className}
								 showThisYear={showThisYear}
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
		// 阻止合成事件的冒泡
		evt.stopPropagation();
		// 阻止与原生事件的冒泡
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
				  disabled={disabled}
				  onChange={evt => onInpChange(evt)}
				  onClick={onInpClick} />);
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
	hasClear: true,
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
