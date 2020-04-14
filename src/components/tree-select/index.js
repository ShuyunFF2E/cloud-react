import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import jeasy from 'jeasy';

import Tree from './tree';
import Selected from './selected';
import SingleTree from './single-tree';
import { selector } from './const';

import './index.less';

class TreeSelect extends Component {

	constructor(props) {
		super(props);

		const { open, defaultOpen, value, defaultValue, multiple, single } = props;
		let values;
		if (multiple || single) {
			values = value || defaultValue || [];
		} else {
			values = value !== null ? value : defaultValue;
		}
		this.state = {
			open: open || defaultOpen,
			value: values,
			prevValue: values,
			prevProps: props
		};
		this.node = React.createRef();
		this.selectedNode = React.createRef();
	}

	static getDerivedStateFromProps(props, prevState) {
		const { prevProps } = prevState;
		const { value, dataSource } = props;
		const { value: prevValue, dataSource: prevData } = prevProps;
		if (!jeasy.equal(value, prevValue) || !jeasy.equal(dataSource, prevData)) {
			return {
				value,
				prevValue: value,
				prevProps: props
			}
		}
		return null;
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClick);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { disabled, width, open: propOpen, searchable } = nextProps;
		const { open, value } = nextState;
		const { disabled: prevDisabled, width: prevWidth, open: prevPropOpen, searchable: prevSearchable } = this.props;
		const { open: prevOpen, value: prevValue } = this.state;
		return disabled !== prevDisabled ||
			width !== prevWidth ||
			propOpen !== prevPropOpen ||
			open !== prevOpen ||
			value !== prevValue ||
			searchable !== prevSearchable;
	}

	componentDidUpdate() {
		const { visible } = this;
		if (visible) this.getOptionsContainer();
		if (this.optionsContainer) {
			if (visible) {
				ReactDOM.render(this.treeNode, this.optionsContainer);
			} else {
				ReactDOM.unmountComponentAtNode(this.optionsContainer)
			}
		}
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick);

		const { optionsContainer } = this;
		if (optionsContainer) {
			const parentEle = optionsContainer.parentElement;
			ReactDOM.unmountComponentAtNode(optionsContainer);
			if (parentEle) parentEle.removeChild(optionsContainer);
		}
	}

	get visible() {
		const { open: propOpen } = this.props;
		const { open } = this.state;
		const visible = propOpen !== null ? propOpen : open;
		return visible;
	}

	get zIndex() {
		return this.props.zIndex;
	}

	get isTree() {
		const { multiple, single } = this.props;
		return multiple || single;
	}

	get treeNode() {
		if (!this.isTree) {
			return (
				<SingleTree
					{...this.props}
					value={this.state.value}
					onChange={this.onValueChange}
					onOk={this.handleOk}
					onCancel={this.handleCancel} />
			);
		}
		return (
			<Tree
				{...this.props}
				value={this.state.value}
				onChange={this.onValueChange}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
				onReset={this.handleReset} />
		)
	}

	get selectedContainer() {
		return this.selectedNode.current.ref.current;
	}

	get popupContainer() {
		return this.props.getPopupContainer(this.selectedContainer);
	}

	getOptionsNodePosition() {
		const selectedNodePosition = this.selectedContainer.getBoundingClientRect();
		const { height, width } = selectedNodePosition;
		if (this.popupContainer === document.body) {
			const nodePosition = this.node.current.getBoundingClientRect();
			const { left, top } = nodePosition;
			return [ left, top + height, width ];
		}
		const { offsetLeft, offsetTop } = this.selectedContainer;
		return [ offsetLeft, offsetTop + height, width ];
	}

	getOptionsContainer() {
		if (!this.optionsContainer) {
			this.optionsContainer = document.createElement('div');
			this.popupContainer.appendChild(this.optionsContainer);
		}
		const { optionsContainer, zIndex } = this;
		const [ left, top, width ] = this.getOptionsNodePosition();
		optionsContainer.style.position = 'absolute';
		optionsContainer.style.zIndex = zIndex;
		optionsContainer.style.top = `${top}px`;
		optionsContainer.style.left = `${left}px`;
		optionsContainer.style.minWidth = `${width}px`;
		return optionsContainer;
	}

	handleClick = e => {
		const { open, prevValue } = this.state;
		const isClickSelect = this.node.current.contains(e.target) || (this.optionsContainer && this.optionsContainer.contains(e.target));
		if (!isClickSelect && open) {
			const { onSelectClose, open: propOpen, hasConfirmButton } = this.props;
			onSelectClose();
			if (hasConfirmButton) this.onTreeOptionChange({}, prevValue);
			if (propOpen === null) this.setState({ open: false });
		};
	}

	handleSelect = () => {
		const { open } = this.state;
		const { onSelectOpen, onSelectClose, open: propOpen } = this.props;
		if (open) {
			onSelectClose();
		} else {
			onSelectOpen();
		}
		if (propOpen === null) this.setState({ open: !open });
	}

	onClickSelected = () => {
		const { disabled } = this.props;
		if (disabled) {
			return;
		}

		this.handleSelect();
	}

	onValueChange = (node, selectedNodes) => {
		const { multiple, single } = this.props;
		if (multiple || single) {
			this.onTreeOptionChange(node, selectedNodes);
		} else {
			this.onSimpleChange(node);
		}
	}

	onSimpleChange = node => {
		const { onChange } = this.props;
		this.setState({
			value: node,
			prevValue: node
		});
		this.handleSelect();
		onChange(node);
	}

	onTreeOptionChange = (node, selectedNodes) => {
		const { single, hasConfirmButton, containParentNode, onChange } = this.props;
		const selectedData = containParentNode ? selectedNodes : selectedNodes.filter(v => !v.children || !v.children.length);
		this.setState({
			value: selectedData,
			node
		});
		if (!hasConfirmButton || single) {
			this.setState({
				prevValue: selectedData
			});
			onChange(node, selectedData);
			if (single) this.handleSelect();
		}
	}

	onClearSelected = e => {
		e.preventDefault();
		e.stopPropagation();
		const value = this.isTree ? [] : {};
		this.setState({
			value,
			prevValue: value
		});

		if (this.isTree) {
			this.props.onChange({}, value);
		} else {
			this.props.onChange(value);
		}
	}

	handleOk = () => {
		const { value: selectedNodes, node } = this.state;
		this.setState({
			prevValue: selectedNodes
		});
		this.props.onOk(node, selectedNodes);
		this.handleSelect();
	};

	handleCancel = () => {
		const { prevValue } = this.state;
		this.setState({
			value: prevValue
		})
		this.props.onCancel();
		this.handleSelect();
	}

	handleReset = () => {
		this.setState({
			value: []
		});
		this.props.onReset();
	}

	render() {
		const { placeholder, disabled, allowClear, style, className } = this.props;
		const { value, open } = this.state;
		const classNames = classnames(`${selector}`, { [`${selector}-open`]: open }, className);

		return (
			<div className={`${classNames}`} style={style} ref={this.node}>
				{/* 已选显示区域 */}
				<Selected
					ref={this.selectedNode}
					onClick={this.onClickSelected}
					onClear={this.onClearSelected}
					open={open}
					allowClear={allowClear}
					placeholder={placeholder}
					dataSource={value}
					disabled={disabled} />
			</div>
		);
	}
}

const noop = () => {};

TreeSelect.propTypes = {
	multiple: PropTypes.bool,
	single: PropTypes.bool,
	allowClear: PropTypes.bool,
	defaultOpen: PropTypes.bool,
	open: PropTypes.bool,
	dataSource: PropTypes.array,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	searchable: PropTypes.bool,
	emptyRender: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	]),
	value: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	]),
	hasConfirmButton: PropTypes.bool,
	className: PropTypes.string,
	zIndex: PropTypes.number,
	getPopupContainer: PropTypes.func,
	onChange: PropTypes.func,
	onSelectOpen: PropTypes.func,
	onSelectClose: PropTypes.func,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
	onReset: PropTypes.func
};

TreeSelect.defaultProps = {
	multiple: false,
	single: false,
	allowClear: false,
	defaultOpen: false,
    open: null,
    dataSource: [],
	disabled: false,
	placeholder: '',
	width: 'auto',
    searchable: false,
	emptyRender: '暂时没有数据',
	defaultValue: [],
	value: [],
	hasConfirmButton: false,
	className: '',
	zIndex: 1050,
	getPopupContainer: triggerNode => triggerNode.parentElement,
	onChange: noop,
	onSelectOpen: noop,
	onSelectClose: noop,
	onOk: noop,
	onCancel: noop,
	onReset: noop
};

export default TreeSelect;
