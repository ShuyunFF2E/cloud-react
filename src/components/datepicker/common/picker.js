import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Input from '../../input';
import Icon from '../../icon';
import Year from '../year/main';
import YearMonth from '../year-month/main';
import MonthDay from '../month-day/main';
import DatePicker from '../date-picker/main';
import { createWrapper, renderDOM, destroyDOM, destroyAllDOM } from './utils';
import { enumObj, containerClass, selectorClass, wrapperClass } from '../constant';
import { transformObj, displayNow } from '../utils';

class Picker extends Component {
	constructor(props) {
		super(props);

		const { value, defaultValue, open, formatValue } = props;

		this.state = {
			currentValue: value ? formatValue(displayNow(new Date(value))) : defaultValue,
			id: Math.random()
				.toString()
				.replace('.', ''),
			visible: open
		};

		this.inpRef = createRef();

		this.containerRef = createRef();
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
				const date = displayNow(new Date(value));
				this.handleValueChange(date);
			} else {
				this.handleChange();
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

	handleValueChange = (output = '', isPop = false) => {
		const value = this.props.formatValue(output);
		this.setState({
			currentValue: value
		});
		if (isPop) {
			this.props.onChange(value);
		}
	};

	onPopChange = output => {
		this.handleValueChange(output, true);
		this.changeVisible(null, false);
	};

	renderMainPop = () => {
		const { tempMode } = this.props;
		const { currentValue } = this.state;

		if (tempMode === enumObj.YEAR_MODEL) {
			return <Year {...this.props} checkValue={currentValue} onChange={this.onPopChange} />;
		}

		if (tempMode === enumObj.YEAR_MONTH_MODEL) {
			return <YearMonth {...this.props} checkValue={currentValue} onChange={this.onPopChange} />;
		}

		if (tempMode === enumObj.MONTH_DAY_MODEL) {
			return <MonthDay {...this.props} checkValue={currentValue} onChange={this.onPopChange} />;
		}

		if (tempMode === enumObj.DATE_MODEL) {
			return <DatePicker {...this.props} checkValue={transformObj(currentValue)} onChange={this.onPopChange} />;
		}

		return null;
	};

	popClick = evt => {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
	};

	changeVisible = (evt, isVisible) => {
		const { containerRef } = this;
		const { id } = this.state;
		const { className, containerEleClass, height } = this.props;

		if (isVisible && id) {
			this.setState({
				visible: true
			});

			createWrapper(id, height);

			renderDOM(
				id,
				containerRef.current,
				<div className={`${selectorClass}-popup ${className}`} onClick={this.popClick}>
					{this.renderMainPop()}
				</div>
			);

			if (containerEleClass) {
				// 在弹框里面，日历处于最下面，那么需要自动滚动，让日历选择面板显示出来
				setTimeout(() => {
					const containerElement = document.querySelectorAll(`.${containerEleClass}`)[0];
					const wrapperElement = document.querySelector(`.${wrapperClass}`);
					const containerHeight = containerElement.getClientRects()[0].bottom;

					if (containerRef.current.getClientRects()[0].bottom + height > containerHeight) {
						wrapperElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
					}
				}, 0);
			}
			return;
		}

		destroyDOM(id, containerRef.current);
	};

	handleClick = evt => {
		const { disabled } = this.props;
		const { visible, id } = this.state;

		if (disabled) return;

		// 阻止合成事件的冒泡
		evt.stopPropagation();
		// 阻止与原生事件的冒泡
		evt.nativeEvent.stopImmediatePropagation();
		// 如果不可见则显示面板
		if (!visible || !document.getElementById(id)) {
			// 先释放其他面板
			destroyAllDOM();
			this.changeVisible(evt, true);
		}
	};

	handleChange = (evt = '') => {
		if (!evt || !evt.target.value.trim().length) {
			this.props.onChange('');
			this.setState({
				currentValue: ''
			});
		}
	};

	render() {
		const { inpRef, containerRef, handleClick, handleChange } = this;
		const { currentValue } = this.state;
		const { placeholder, disabled } = this.props;

		return (
			<div ref={containerRef} className={containerClass}>
				<Input
					readOnly
					hasClear
					ref={inpRef}
					value={currentValue}
					placeholder={placeholder}
					onChange={handleChange}
					disabled={disabled}
					className={`${selectorClass}-inp`}
					onClick={handleClick}
					suffix={<Icon type="calendar" className={`${selectorClass}-inp-icon`} onClick={handleClick} />}
				/>
			</div>
		);
	}
}

Picker.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	open: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	formatValue: PropTypes.func,
	onChange: PropTypes.func
};

Picker.defaultProps = {
	className: '',
	disabled: false,
	placeholder: '',
	open: false,
	defaultValue: '',
	value: undefined,
	formatValue: noop,
	onChange: noop
};

export default Picker;
