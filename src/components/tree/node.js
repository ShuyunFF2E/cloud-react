import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Message from '../message';
import Checkbox from '../checkbox';
import TreeContext from './context';
import Input from '../input';
import Tooltip from '../tooltip';
import './index.less';
// 默认菜单类型
const MENU_TYPE = 'rightMenu';
// 双击事件记录器
let count = 0;
class Node extends Component {
	static contextType = TreeContext;

	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	// 打开菜单
	onHandleShowMenu = (e, menuTypeNow, node, options) => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		// 不使用右键菜单则使用浏览器默认右键菜单
		const { supportMenu, menuType, onShowMenu } = this.context;
		if (!supportMenu) {
			return;
		}
		let menuStyle = {};
		// right模式，并且当前正在右键，则禁用右键
		if (menuType === MENU_TYPE && menuTypeNow === MENU_TYPE) {
			e.preventDefault();
			menuStyle = {
				left: `${e.clientX}px`,
				top: `${e.clientY}px`
			};
		}

		// dialog模式，并且当前正在右键，则正常走浏览器模式
		if (menuType === 'dialogMenu' && menuTypeNow === MENU_TYPE) {
			return;
		}

		// dialog模式，并且点击了菜单区域，则显示菜单
		if (menuType === 'dialogMenu' && menuTypeNow === 'dialogMenu') {
			menuStyle = {
				left: `${e.clientX - 40}px`,
				top: `${e.clientY + 10}px`
			};
		}

		// 将节点信息、点击位置、点击函数传递出去
		onShowMenu(node, menuStyle, options);
	};

	// 显示/隐藏子节点
	toggle = (e, node) => {
		this.context.onFoldNodeAction(this.context.treeData, node);
		e.stopPropagation();
	};

	// 行内菜单输入
	setInputValue = name => {
		this.setState({ inputValue: name || '' });
	};

	// 输入节点名称
	handleInputChange = event => {
		this.setState({ inputValue: event.target.value });
	};

	// 保存节点信息
	onSaveClick = (e, node, name) => {
		e.stopPropagation();
		const { id, level } = node;
		// 输入内容不能为空
		if (!this.state.inputValue) {
			Message.error('名称不能为空！');
			return;
		}

		const isRepeat = this.context.onCheckRepeatNameAction(node, name);
		if (isRepeat) {
			Message.error('该目录名称已存在！');
			return;
		}

		this.setState({
			inputValue: ''
		});

		// 编辑与新增
		this.context[!node.isAdd ? 'onRenameAction' : 'onAddAction'](id, name, level);

		this.context.onReRenderNode({ currentNode: node });
	};

	// 取消保存
	onClickCancel = (e, data) => {
		e.stopPropagation();
		this.setState({
			inputValue: ''
		});
		this.context.onReRenderNode({ currentNode: data });
	};

	// 选中节点
	handleSelect = checked => {
		const { data } = this.props;
		if (this.context.supportCheckbox) {
			data.checked = checked;
		}
		count += 1;
		setTimeout(() => {
			if (count === 1) {
				this.context.onSelectedAction(data);
			} else if (count === 2) {
				this.context.onDoubleClick(data);
			}
			count = 0;
		}, 300);
	};

	render() {
		const { data, children, prefixCls } = this.props;
		const { setInputValue, onSaveClick, onClickCancel } = this;
		// 将三个方法传递出去可以供外部调用
		const options = { setInputValue, onSaveClick, onClickCancel };
		const paddingLeft = 14 * data.level;
		return (
			<>
				<div className={classNames(`${prefixCls}-list-node-area ${data.children && !data.children.length ? 'child-style' : null}`)}>
					<div
						onContextMenu={e => this.onHandleShowMenu(e, 'rightMenu', data, options)}
						style={{ minWidth: `calc(100% - ${paddingLeft}px)`, paddingLeft }}
						className={`node-item-container ${data.isActive ? 'is-active' : null} ${this.context.supportCheckbox ? 'support-checkbox' : ''}`}>
						{/* 拖拽icon: 根节点不支持拖拽 */}
						{this.context.supportDrag && (data.pId || data.pId === 0) && (
							<Tooltip content="拖拽行调整顺序">
								<div className="drag-icon" />
							</Tooltip>
						)}

						{/* 折叠展开icon */}
						<ToggleFold hasChildren={data.children.length > 0} showChildrenItem={data.isUnfold} toggle={e => this.toggle(e, data)} />
						<div
							onClick={this.context.supportCheckbox ? () => {} : this.handleSelect}
							className={`node-item ${data.isEdit && !data.isAdd ? 'hide-node' : null}`}>
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
								isShowNameTooltip={this.context.isShowNameTooltip}
								supportCheckbox={this.context.supportCheckbox}
								onHandleSelect={this.handleSelect}
							/>
							{this.context.menuType !== MENU_TYPE && (
								<span className="edit-icon" onClick={e => this.onHandleShowMenu(e, 'dialogMenu', data, options)}>
									...
								</span>
							)}
						</div>

						<ShowInput
							isEdit={data.isEdit}
							isAdd={data.isAdd}
							inputValue={this.state.inputValue}
							maxLength={this.context.nodeNameMaxLength}
							handleInputChange={this.handleInputChange}
							saveItem={e => this.onSaveClick(e, data, this.state.inputValue)}
							cancelSave={e => this.onClickCancel(e, data)}
						/>
					</div>
					{data.isUnfold && <>{children}</>}
				</div>
			</>
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
	return hasChildren && <Icon className="toggle-icon" type={!showChildrenItem ? 'right-solid' : 'down-solid'} onClick={toggle} />;
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
 * @param isShowNameTooltip
 * @param indeterminate
 * @param checked
 * @param supportCheckbox
 * @param id
 * @param name
 * @param disableSelected
 * @param onHandleSelect
 * @returns {*}
 * @constructor
 */
function ShowSelection({ searchText, isShowNameTooltip, indeterminate, checked, supportCheckbox, id, name, disableSelected, onHandleSelect }) {
	// 处理搜索关键字高亮
	const re = new RegExp(`(${searchText.replace(/[(){}.+*?^$|\\[\]]/g, '\\$&')})`, 'ig');
	const tmp = name.replace(re, `<span class="hot-text">${searchText}</span>`);
	const labelWidth = {
		width: '94%',
		zIndex: 0
	};
	const noneTipName = <span className={supportCheckbox ? 'check-box-node-name' : 'node-name'} dangerouslySetInnerHTML={{ __html: tmp }} />;
	const hasTipName = (
		<Tooltip content={tmp} placement="top-left">
			{noneTipName}
		</Tooltip>
	);
	const showName = isShowNameTooltip ? hasTipName : noneTipName;

	return supportCheckbox ? (
		<Checkbox disabled={disableSelected} indeterminate={indeterminate} checked={checked} value={id} onChange={onHandleSelect} style={labelWidth}>
			{showName}
		</Checkbox>
	) : (
		showName
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
