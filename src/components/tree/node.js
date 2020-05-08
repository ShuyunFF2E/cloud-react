import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Message from '../message';
import Checkbox from '../checkbox';
import TreeContext from './context';
import Input from '../input';
import './index.less';

class Node extends Component {
	static contextType = TreeContext;

	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			hasBackValue: true
		};
	}

	// 打开右键菜单
	onHandleContextMenu = (e, node, options) => {
		// 不使用右键菜单则使用浏览器默认右键菜单
		if (!this.context.supportMenu) {
			return;
		}
		e.preventDefault();
		const menuStyle = {
			left: `${e.clientX}px`,
			top: `${e.clientY}px`
		};

		// 将节点信息、点击位置、点击函数传递出去
		this.context.showMenu(node, menuStyle, options);
	};

	// 显示/隐藏子节点
	toggle = node => {
		this.context.onFoldNodeAction(this.context.treeData, node);
	};

	setInputValue = name => {
		this.setState({
			inputValue: name || ''
		});
	};

	// 输入节点名称
	handleInputChange = event => {
		this.setState({ inputValue: event.target.value });
	};

	// 保存节点信息
	onSaveClick = (data, name) => {
		const { id, level } = data;
		// 输入内容不能为空
		if (!this.state.inputValue) {
			Message.error('名称不能为空！');
			return;
		}

		const isRepeat = this.context.onCheckRepeatNameAction(name);
		if (isRepeat) {
			return;
		}

		this.setState({
			inputValue: ''
		});

		// 编辑与新增
		this.context[!data.isAdd ? 'onRenameAction' : 'onAddAction'](id, name, level);

		this.context.onReRenderNode({ currentNode: data });
	};

	// 取消保存
	onClickCancel = data => {
		this.setState({
			inputValue: ''
		});
		this.context.onReRenderNode({ currentNode: data });
	};

	// 选中节点
	handleSelect = checked => {
		const { data } = this.props;
		this.setState({
			hasBackValue: false
		});
		if (this.context.supportCheckbox) {
			data.checked = checked;
		}
		this.context.onSelectedAction(data);
	};

	render() {
		const { data, children, prefixCls } = this.props;
		const { setInputValue, onSaveClick, onClickCancel } = this;
		// 将三个方法传递出去可以供外部调用
		const options = { setInputValue, onSaveClick, onClickCancel };
		return (
			<Fragment>
				<div className={classNames(`${prefixCls}-list-node-area ${data.children && data.children.length > 0 ? 'has-child-style' : null}`)}>
					{/* 折叠展开icon */}
					<ToggleFold hasChildren={data.children.length > 0} showChildrenItem={data.isUnfold} toggle={() => this.toggle(data)} />
					<div
						className={`node-item ${data.isEdit && !data.isAdd ? 'hide-node' : null} ${data.isActive ? 'is-active' : null}`}
						onContextMenu={e => this.onHandleContextMenu(e, data, options)}>
						{/* 节点前面的icon */}
						<NodeIcon
							showIcon={this.context.showIcon}
							openIconType={this.context.openIconType}
							closeIconType={this.context.closeIconType}
							iconColor={this.context.iconColor}
							hasChildren={data.children.length > 0}
							showChildrenItem={data.isUnfold}
						/>

						{/* checkbox选择，新增或编辑时不显示 */}
						<ShowSelection
							id={data.id}
							name={data.name}
							disableSelected={data.disableSelected}
							searchText={this.context.searchText}
							indeterminate={data.indeterminate}
							checked={data.checked}
							hasBackValue={this.state.hasBackValue}
							backValue={this.context.selectedValue}
							supportCheckbox={this.context.supportCheckbox}
							onHandleSelect={this.handleSelect}
						/>
					</div>

					<ShowInput
						isEdit={data.isEdit}
						isAdd={data.isAdd}
						inputValue={this.state.inputValue}
						maxLength={this.context.nodeNameMaxLength}
						handleInputChange={this.handleInputChange}
						saveItem={() => this.onSaveClick(data, this.state.inputValue)}
						cancelSave={() => this.onClickCancel(data)}
					/>

					{data.isUnfold && <ul>{children}</ul>}
				</div>
			</Fragment>
		);
	}
}

/**
 * 显示折叠与展开图标
 * @param isShow
 * @param hasChildren
 * @param showChildrenItem
 * @param toggle
 * @returns {null|*}
 * @constructor
 */
function ToggleFold({ hasChildren, showChildrenItem, toggle }) {
	return hasChildren && <Icon type={!showChildrenItem ? 'right-solid' : 'down-solid'} onClick={toggle} />;
}

/**
 * 显示输入框
 * @param isEdit
 * @param isAdd
 * @param maxLength
 * @param inputValue
 * @param handleInputChange
 * @param saveItem
 * @param cancelSave
 * @returns {*}
 * @constructor
 */
function ShowInput({ isEdit, isAdd, maxLength, inputValue, handleInputChange, saveItem, cancelSave }) {
	return isEdit || isAdd ? (
		<div className={!isAdd ? 'is-rename' : 'is-add'}>
			<Input
				className="node-input"
				value={inputValue}
				onChange={handleInputChange}
				autoFocus
				onEnter={saveItem}
				maxLength={maxLength}
				placeholder={`最多可输入${maxLength}个字符`}
			/>
			<Icon type="finish" className="save-icon" onClick={saveItem} />
			<Icon type="close" className="cancel-icon" onClick={cancelSave} />
		</div>
	) : null;
}

/**
 * 显示复选框
 * @param searchText
 * @param backValue
 * @param hasBackValue
 * @param indeterminate
 * @param checked
 * @param supportCheckbox
 * @param id
 * @param name
 * @param disableSelected
 * @param onHandleSelect
 * @returns {null|*}
 * @constructor
 */
function ShowSelection({ searchText, backValue, hasBackValue, indeterminate, checked, supportCheckbox, id, name, disableSelected, onHandleSelect }) {
	// 处理搜索关键字高亮
	const re = new RegExp(`(${searchText.replace(/[(){}.+*?^$|\\[\]]/g, '\\$&')})`, 'ig');
	const tmp = name.replace(re, `<span class="hot-text">${searchText}</span>`);
	const labelWidth = {
		width: '100%',
		zIndex: 0
	};

	const backStyle = {
		color: '#08F'
	};

	// 多选类型展示
	if (supportCheckbox) {
		return (
			<Checkbox disabled={disableSelected} indeterminate={indeterminate} checked={checked} value={id} onChange={onHandleSelect} style={labelWidth}>
				<span dangerouslySetInnerHTML={{ __html: tmp }} />
			</Checkbox>
		);
	}

	return (
		<span
			style={backValue.length === 1 && hasBackValue && backValue[0].id === id ? backStyle : null}
			className="node-name"
			dangerouslySetInnerHTML={{ __html: tmp }}
			onClick={onHandleSelect}
		/>
	);
}

/**
 * 节点Icon
 * @param showIcon
 * @param openIconType
 * @param closeIconType
 * @param iconColor
 * @param hasChildren
 * @param showChildrenItem
 * @return {null}
 */
function NodeIcon({ showIcon, openIconType, closeIconType, iconColor, hasChildren, showChildrenItem }) {
	if (!showIcon) {
		return null;
	}
	const style = {
		color: iconColor
	};
	// 存在子节点,并且要显示子节点
	return hasChildren && showChildrenItem ? <Icon style={style} type={openIconType} /> : <Icon style={style} type={closeIconType} />;
}
export default Node;
