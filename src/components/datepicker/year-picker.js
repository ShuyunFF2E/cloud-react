import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from './popup/year-region-popup';
import { createWrapper, renderDOM, destroyDOM, isVaild, datepickerUI, selector, getWinHeight } from './util/view-common';
import enumObj from './util/enum';

function YearPicker(props) {
	const { value, defaultValue, open, disabled, min, max, id, placeholder, position, className, showThisYear, onChange, ...otherProps } = props;
	const inpRef = React.createRef();

	const [currentValue, setCurrentValue] = useState(isVaild(value) ? value : defaultValue);
	const [visible, setVisible] = useState(open);

	function onPopChange(output) {
		setCurrentValue(output);
		// eslint-disable-next-line no-use-before-define
		changeVisible(null, false);
		onChange(output);
	}

	function changeVisible(evt, isVisible) {
		if(isVisible) {
			createWrapper(id);
			const checkValue = currentValue ? parseInt(currentValue, 10) : undefined;
			const { HEIGHT_YEAR } = datepickerUI;
			const { left, bottom, top } = inpRef.current.getBoundingClientRect();
			let _top = 0;
			switch (position) {
				case enumObj.AUTO:
					_top = getWinHeight() - bottom > HEIGHT_YEAR ? bottom : top - HEIGHT_YEAR;
					break;
				case enumObj.UP:
					_top = top - HEIGHT_YEAR;
					break;
				case enumObj.DOWN:
				default:
					_top = bottom;
					break;
			}

			renderDOM(id, <Popup left={left}
								 top={_top}
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
        if(!visible) {
			setVisible(true);
            changeVisible(evt, true);
        }
	}

    return (<input
		{...otherProps}
		ref={inpRef}
        value={currentValue}
		placeholder={placeholder}
		readOnly
		className={`${selector}-inp`}
		disabled={disabled}
		onClick={onInpClick}
 	/>);
}

YearPicker.propTypes =  {
	id: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
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
	id: Math.random().toString().replace('.',''),
	className: '',
	position: enumObj.AUTO,
	placeholder: '',
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
