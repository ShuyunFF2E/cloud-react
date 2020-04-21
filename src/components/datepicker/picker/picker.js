import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from '@utils/noop'
import Input from '../../input';
import Popup from './popup';
import {
	createWrapper,
	renderDOM,
	destroyDOM,
	destroyAllDOM,
	isVaild,
	calendarIcon,
	selector,
	getPositionByComp
} from '../util/view-common';
import enumObj from '../util/enum';

class Picker extends Component {
    constructor(props) {
        super(props);

        const { value, defaultValue, open } = props;

        this.state = {
            currentValue: isVaild(value) ? value : defaultValue,
            suffix: calendarIcon,
            id: Math.random().toString().replace('.', ''),
            visible: open
        }

        this.inpRef = React.createRef();
    }
    
    componentDidMount() {
        document.addEventListener('click', this.changeVisible, false);
		if (this.props.open) {
			this.changeVisible(null, this.state.visible);
		}
    }

    componentDidUpdate(prevProps) {
        const { value: prevValue, open: prevOpen } = prevProps;
        const { value, open } = this.props;
        if (prevValue !== value) {
            if (value) {
                this.onValueChange(value);
            } else {
                this.onInpChange();
            }
        }
        if (prevOpen !== open) {
            this.updateVisible();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.changeVisible, false);
    }

    updateVisible() {
        this.setState({
            visible: this.props.open
        });
    }

    onValueChange = (output = '', isPop = false) => {
        const value = this.props.formatValue(output);
        this.setState({
            currentValue: value
        })
		if(isPop) {
			this.props.onChange(value);
		}
    }
    
    onPopChange = output => {
		this.onValueChange(output, true);
		this.changeVisible(null, false);
		if (this.props.hasClear) {
            this.setState({
                suffix: null
            });
		}
    }
    
    changeVisible = (evt, isVisible) => {
        const {
            inpRef,
            state: { id, currentValue },
            props: { position, tempMode, height, min, max, showCurrent, integer, className },
            onPopChange
        } = this;
		if (isVisible && id) {
            this.setState({
                visible: true
            });
			createWrapper(id);
            // const checkValue = currentValue ? parseInt(currentValue, 10) : undefined;
            const checkValue = integer ? parseInt(currentValue, 10) : currentValue;
            const { left, top } = getPositionByComp(inpRef.current.inputRef.current.getBoundingClientRect(), position, height);
            // const View = isYearPicker ? yearPopup : monthPopup;
            renderDOM(
                id,
                <Popup
                    left={left}
                    top={top}
                    className={className}
                    checkValue={String(checkValue)}
                    showCurrent={showCurrent}
                    max={String(max)}
					min={String(min)}
					tempMode={tempMode}
                    onChange={onPopChange}
                />
            );
			return;
		}
		destroyDOM(id);
    }

    handleClick = evt => {
        const {
            changeVisible,
            props: { disabled },
            state: { visible, id }
        } = this;
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
    
    handleChange = (evt = '') => {
		if (!evt || !evt.target.value.trim().length) {
			this.props.onChange('');
            this.setState({
                currentValue: '',
                suffix: calendarIcon
            });
		}
	}
    
    render() {
        const {
            inpRef,
            state: { suffix, currentValue },
            props: { placeholder, hasClear, disabled },
            handleClick,
            handleChange
        } = this;

        return (
            <div
                onClick={handleClick}
                className={`${selector}-container`}>
                <Input
                    ref={inpRef}
                    suffix={suffix}
                    value={currentValue}
                    placeholder={placeholder}
                    readOnly
                    hasClear={hasClear}
                    className={`${selector}-inp`}
                    onChange={handleChange}
                    disabled={disabled}
                />
            </div>
        );
    }
}

Picker.propTypes =  {
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
	showCurrent: PropTypes.bool,
	onChange: PropTypes.func,
}

Picker.defaultProps = {
	className: '',
	position: enumObj.AUTO,
	placeholder: '',
	hasClear: false,
	disabled: false,
	open: false,
	showCurrent: true,
	defaultValue: '',
	value: undefined,
	min: '',
    max: '',
	onChange: noop
}

export default Picker;