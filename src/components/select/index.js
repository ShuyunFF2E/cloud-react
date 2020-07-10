import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ShuyunUtils from 'shuyun-utils';

import { flat } from '@utils';
import ModalConfigContext from '../modal/config-provider';
import SingleSelect from './views/single-select';
import MultiSelect from './views/multi-select';
import Selected from './views/selected';
import Option from './views/option';
import { selector } from './views/common';

import { formatOptionSource } from './utils';

import './index.less';

const getSelected = (data, children) => {
	const options = Array.isArray(data) ? data : [data];
	if (!options.length) return [];
	const selected = Children.map(children, child => {
		const { children: label, value } = child.props;
		return options.includes(value) ? { label, value } : null;
	});
	return selected;
};

const getOptions = (dataSource, labelKey, valueKey) => {
	return dataSource.map(v => (
		<Option value={v[valueKey]} disabled={v.disabled} key={Math.random()}>
			{v[labelKey]}
		</Option>
	));
};

class Select extends Component {
	static Option = Option;

	static contextType = ModalConfigContext;

	constructor(props) {
		super(props);

		const { open, defaultOpen, labelInValue } = props;
		const { defaultSelectValue, children } = this;

		const selected = getSelected(defaultSelectValue, children);

		this.state = {
			open: open || defaultOpen,
			value: defaultSelectValue,
			prevValue: defaultSelectValue,
			prevResult: labelInValue ? selected : defaultSelectValue,
			selected,
			prevProps: props,
			style: {}
		};
		this.node = React.createRef();
		this.optionsNode = React.createRef();
		this.selectedNode = React.createRef();
	}

	static getDerivedStateFromProps(props, prevState) {
		const { prevProps } = prevState;
		const { value, children, dataSource, multiple, open } = props;
		const { value: prevValue, children: prevChildren, dataSource: prevData, open: prevOpen } = prevProps;

		if (value !== prevValue || open !== prevOpen || Children.count(children) !== Children.count(prevChildren) || !ShuyunUtils.equal(dataSource, prevData)) {
			const { labelKey, valueKey, labelInValue } = props;
			const childs = Array.isArray(children) ? flat(children, Infinity) : Children.toArray(children);
			const source = childs.length ? childs : getOptions(dataSource, labelKey, valueKey);
			const selected = getSelected(value, source);
			const defaultValue = multiple ? [] : '';
			const currentValue = value !== null ? value : defaultValue;
			return {
				value: currentValue,
				prevValue: currentValue,
				prevResult: labelInValue ? selected : value,
				selected,
				prevProps: props,
				open
			};
		}

		return null;
	}

	componentDidMount() {
		this.document.addEventListener('click', this.handleClick);
		this.node.current.addEventListener('mouseleave', this.handleMouseLeave);
	}

	componentDidUpdate(_, prevState) {
		if (this.state.open !== prevState.open && this.state.open) this.positionPop();
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { disabled, width, open: propOpen, searchable } = nextProps;
		const { open, value, selected, style } = nextState;
		const { disabled: prevDisabled, width: prevWidth, open: prevPropOpen, searchable: prevSearchable } = this.props;
		const { open: prevOpen, value: prevValue, selected: prevSelected, style: prevStyle } = this.state;

		return (
			disabled !== prevDisabled ||
			width !== prevWidth ||
			propOpen !== prevPropOpen ||
			open !== prevOpen ||
			value !== prevValue ||
			selected !== prevSelected ||
			searchable !== prevSearchable ||
			style !== prevStyle
		);
	}

	componentWillUnmount() {
		this.document.removeEventListener('click', this.handleClick);
		this.node.current.removeEventListener('mouseleave', this.handleMouseLeave);
	}

	get document() {
		return this.context.rootDocument;
	}

	get portal() {
		const { getContext } = this.context;
		return getContext() || this.document.body;
	}

	get defaultSelectValue() {
		const { value, defaultValue, multiple } = this.props;
		if (multiple) {
			return value || defaultValue || [];
		}
		return value !== null ? value : defaultValue;
	}

	get children() {
		const { children, dataSource, labelKey, valueKey } = this.props;
		const childs = Array.isArray(children) ? flat(children, Infinity) : Children.toArray(children);

		if (childs.length) return childs;

		return getOptions(dataSource, labelKey, valueKey);
	}

	get selectedContainerStyle() {
		const selectNode = this.selectedNode.current;
		if (selectNode) {
			return selectNode.ref.current.getBoundingClientRect();
		}
		return {};
	}

	get optionsNodeStyle() {
		const ele = this.optionsNode.current;
		if (!ele) return {};
		return ele.getBoundingClientRect();
	}

	positionPop = () => {
		const {
			props: { isAppendToBody, position },
			selectedContainerStyle: { left, top, bottom, height },
			optionsNodeStyle: { height: optionsHeight }
		} = this;
		const isBottomDistanceEnough = bottom + optionsHeight < this.document.documentElement.clientHeight;
		const isLocationTop = optionsHeight < top && !isBottomDistanceEnough && position === 'auto';
		if (isAppendToBody) {
			this.setState({
				style: {
					position: 'fixed',
					left: `${left}px`,
					top: isLocationTop ? `${top - optionsHeight}px` : `${bottom}px`
				}
			});
		} else {
			this.setState({
				style: {
					top: isLocationTop ? `${-optionsHeight}px` : `${height}px`
				}
			});
		}
	};

	handleMouseLeave = () => {
		const {
			props: { trigger },
			state: { open },
			handleSelect
		} = this;
		if (trigger === 'hover' && open) {
			handleSelect();
		}
	};

	handleClick = e => {
		const { open, prevValue } = this.state;
		const isClickSelect = this.node.current.contains(e.target) || (this.optionsNode.current && this.optionsNode.current.contains(e.target));

		if (!isClickSelect && open) {
			const { onSelectClose, open: propOpen, hasConfirmButton } = this.props;
			onSelectClose();
			if (hasConfirmButton) this.onMultiOptionChange(prevValue);
			if (propOpen === null) this.setState({ open: false });
		}
	};

	handleSelect = () => {
		const { open } = this.state;
		const { onSelectOpen, onSelectClose, open: propOpen } = this.props;

		if (open) {
			onSelectClose();
		} else {
			onSelectOpen();
		}

		if (propOpen === null) this.setState({ open: !open });
	};

	onClickSelected = () => {
		const { disabled } = this.props;
		if (disabled) return;

		this.handleSelect();
	};

	onSimpleOptionChange = data => {
		const { labelInValue, onChange, onBeforeChange } = this.props;
		const { prevValue, prevResult } = this.state;

		if (data.value === prevValue) {
			this.handleSelect();
			return;
		}

		const option = formatOptionSource(data);
		const selectValue = option[0].value;
		const checkedValue = labelInValue ? option[0] : selectValue;

		const onBeforeSelectChange = onBeforeChange || (() => Promise.resolve());

		onBeforeSelectChange(checkedValue).then(() => {
			this.setState({
				selected: option,
				value: selectValue,
				prevValue: selectValue,
				prevResult: checkedValue
			});

			this.handleSelect();
			onChange(checkedValue, prevResult);
		});
	};

	onMultiOptionChange = data => {
		const { children } = this;
		const { labelInValue } = this.props;
		const options = Children.map(children, child => {
			const { children: label, value } = child.props;
			return data.includes(value) ? { label, value } : null;
		});
		const values = options.map(v => v.value);

		this.setState({
			selected: options,
			value: values
		});

		return labelInValue ? options : values;
	};

	onMultiSelectValueChange = data => {
		const {
			onMultiOptionChange,
			props: { hasConfirmButton, onChange },
			state: { prevResult }
		} = this;

		const checkedValue = onMultiOptionChange(data);

		if (!hasConfirmButton) {
			this.setState({
				prevResult: checkedValue
			});
			onChange(checkedValue, prevResult);
		}
	};

	onClearSelected = e => {
		e.preventDefault();
		e.stopPropagation();

		const { multiple } = this.props;
		const value = multiple ? [] : '';
		const { prevResult } = this.state;

		this.setState({
			selected: [],
			value,
			prevValue: value,
			prevResult: value
		});
		this.props.onChange(value, prevResult);
	};

	handleOk = () => {
		const {
			handleSelect,
			props: { labelInValue, onOk },
			state: { selected, value, prevResult }
		} = this;
		const result = labelInValue ? selected : value;

		this.setState({
			prevValue: value,
			prevResult: result
		});

		onOk(result, prevResult);
		handleSelect();
	};

	handleCancel = () => {
		const {
			onMultiOptionChange,
			handleSelect,
			props: { onCancel },
			state: { prevValue }
		} = this;

		onMultiOptionChange(prevValue);
		onCancel();
		handleSelect();
	};

	renderOptions() {
		const { multiple, confirmTemplate } = this.props;
		const { value } = this.state;

		if (multiple) {
			return (
				<MultiSelect
					{...this.props}
					value={value}
					dataSource={this.children}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					confirmTemplate={confirmTemplate}
					onChange={this.onMultiSelectValueChange}
				/>
			);
		}

		return <SingleSelect {...this.props} value={value} dataSource={this.children} onChange={this.onSimpleOptionChange} />;
	}

	render() {
		const { placeholder, disabled, allowClear, style, className, isAppendToBody, ...otherProps } = this.props;
		const { selected, open, style: popupStyle } = this.state;
		const { width } = this.selectedContainerStyle;
		const classNames = classnames(`${selector}`, { [`${selector}-open`]: open }, className);

		const containerEle = isAppendToBody ? this.portal : this.node.current;

		return (
			<div className={`${classNames}`} style={style} ref={this.node}>
				{/* 已选显示区域 */}
				<Selected
					{...otherProps}
					ref={this.selectedNode}
					onClick={this.onClickSelected}
					onClear={this.onClearSelected}
					open={open}
					allowClear={allowClear}
					placeholder={placeholder}
					dataSource={selected}
					disabled={disabled}
				/>

				{open &&
					ReactDOM.createPortal(
						<div className={`${selector}-option-container`} ref={this.optionsNode} style={{ ...popupStyle, width: `${width}px` }}>
							{this.renderOptions()}
						</div>,
						containerEle
					)}
			</div>
		);
	}
}

Select.propTypes = {
	multiple: PropTypes.bool,
	allowClear: PropTypes.bool,
	defaultOpen: PropTypes.bool,
	open: PropTypes.bool,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	dataSource: PropTypes.array,
	labelKey: PropTypes.string,
	valueKey: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	searchable: PropTypes.bool,
	emptyRender: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	labelInValue: PropTypes.bool,
	hasSelectAll: PropTypes.bool,
	hasConfirmButton: PropTypes.bool,
	okBtnText: PropTypes.string,
	cancelBtnText: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	onChange: PropTypes.func,
	onSearch: PropTypes.func,
	onSelectOpen: PropTypes.func,
	onSelectClose: PropTypes.func,
	onOk: PropTypes.func,
	onCancel: PropTypes.func
};

Select.defaultProps = {
	multiple: false,
	allowClear: false,
	defaultOpen: false,
	open: null,
	disabled: false,
	placeholder: '',
	dataSource: [],
	labelKey: 'label',
	valueKey: 'value',
	width: 'auto',
	searchable: false,
	emptyRender: '暂时没有数据',
	defaultValue: null,
	value: null,
	labelInValue: false,
	hasSelectAll: false,
	hasConfirmButton: false,
	okBtnText: '确认',
	cancelBtnText: '取消',
	className: '',
	children: [],
	onChange: () => {},
	onSearch: () => {},
	onSelectOpen: () => {},
	onSelectClose: () => {},
	onOk: () => {},
	onCancel: () => {}
};

export default Select;
