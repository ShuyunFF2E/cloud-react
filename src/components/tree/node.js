import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Message from '../message';
import Checkbox from '../checkbox';
import Radio from '../radio';
import TreeContext from './context';
import Input from '../input';
import './index.less';

class Node extends Component {

	static contextType = TreeContext;

	constructor(props) {
		super(props);
		this.state = {
			showChildrenItem: true,
			inputValue: '',
			isShowInput: false,
			isAdd: false
		};
	}

	// 打开右键菜单
	onHandleContextMenu = (e, node, options) => {
		e.preventDefault();
		const menuStyle = {
			left: `${e.clientX}px`,
			top: `${e.clientY}px`
		};

		// 将节点信息、点击位置、点击函数传递出去
		this.context.showMenu(node, menuStyle, options);
	};

	// 显示/隐藏子节点
	toggle = () => {
		const showChild = this.state.showChildrenItem;
		this.setState({
			showChildrenItem: !showChild
		})
	};

	// 显示Input输入框
	showInput = name => {
		this.setState({
			inputValue: name || '',
			isShowInput: true,
			isAdd: !name
		});
	};

	// 输入节点名称
	handleInputChange = (event) => {
		this.setState({ inputValue: event.target.value });
	};

	// 保存节点信息
	onSaveClick = (pId) => {
		// 输入内容不能为空
		if (!this.state.inputValue) {
			return Message.error('名称不能为空！');
		}
		this.setState({
			isShowInput: false,
			isAdd: false,
			inputValue: ''
		});
		// 编辑与新增
		return !this.state.isAdd ? this.context.onRenameAction(pId, this.state.inputValue) : this.context.onAddAction(pId, this.state.inputValue);
	};

	// 取消保存
	onClickCancel = () => {
		this.setState({
			isShowInput: false,
			isAdd: false,
			inputValue: ''
		});
	};

	// 选中节点
	handleSelect = checked => {
		const { data } = this.props;
		// 清空已选值，外部后自动增加
		this.context.selectedValue = [];
		if (this.context.supportCheckbox) {
			data.checked = checked;
		}
		this.context.onSelectedAction(data);
	};

	render() {
		const { data, children, prefixCls } = this.props;
		const { showInput, onSaveClick, onClickCancel } = this;
		// 将三个方法传递出去可以供外部调用
		const options = { showInput, onSaveClick, onClickCancel };
		return (
			<Fragment>
				<div className={classNames(`${prefixCls}-list-node-area`)}>
					<div className={`node-item ${this.state.isShowInput && !this.state.isAdd ? 'hide-node' : null} ${data.isActive ? 'is-active' : null}`}
						 onContextMenu={(e) => this.onHandleContextMenu(e, data, options)}>
						{/* 折叠展开icon */}
						<ToggleFold
							hasChildren={data.children.length > 0}
							showChildrenItem={this.state.showChildrenItem}
							toggle={this.toggle}/>

						{/* 节点前面的icon */}
						<NodeIcon showIcon={this.context.showIcon} openIconType={this.context.openIconType} closeIconType={this.context.closeIconType} iconColor={this.context.iconColor} hasChildren={data.children.length > 0} showChildrenItem={this.state.showChildrenItem}/>

						{/* checkbox选择，新增或编辑时不显示 */}
						<ShowSelection
							id={data.id}
							name={data.name}
							disableSelected={data.disableSelected}
							searchText={this.context.searchText}
							indeterminate={data.indeterminate}
							checked={data.checked}
							isRadioSelected={data.isActive}
							supportRadio={this.context.supportRadio}
							supportCheckbox={this.context.supportCheckbox}
							onHandleSelect={this.handleSelect}/>
					</div>

					<ShowInput
						isShow={this.state.isShowInput}
						isAdd={this.state.isAdd}
						inputValue={this.state.inputValue}
						maxLength={this.context.nodeNameMaxLength}
						handleInputChange={this.handleInputChange}
						saveItem={() => this.onSaveClick(data.id)}
						cancelSave={this.onClickCancel}/>
					<ul className={!this.state.showChildrenItem ? 'hide-node' : null}>
						{children}
					</ul>
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
	return (hasChildren &&
		<Icon type={!showChildrenItem ? 'right-solid' : 'down-solid'} onClick={toggle}/>
	)
}

/**
 * 显示输入框
 * @param showInput
 * @param inputValue
 * @param handleInputChange
 * @param saveItem
 * @param cancelSave
 * @returns {null|*}
 * @constructor
 */
function ShowInput({ isShow, isAdd,  maxLength, inputValue, handleInputChange, saveItem, cancelSave }) {
	return (isShow || isAdd) && (
		<div className={!isAdd ? 'is-rename' : 'is-add'}>
			<Input className="node-input" value={inputValue} onChange={handleInputChange} autoFocus maxLength={maxLength} placeholder={`最多可输入${maxLength}个字符`}/>
			<Icon type="finish" className="save-icon" onClick={saveItem}/>
			<Icon type="close" className="cancel-icon" onClick={cancelSave}/>
		</div>
	);
}

/**
 * 显示复选框
 * @param searchText
 * @param indeterminate
 * @param checked
 * @param supportRadio
 * @param supportCheckbox
 * @param id
 * @param name
 * @param disableSelected
 * @param isRadioSelected
 * @param onHandleSelect
 * @returns {null|*}
 * @constructor
 */
function ShowSelection({ searchText, indeterminate, checked, supportRadio, supportCheckbox, id, name, disableSelected, isRadioSelected, onHandleSelect }) {
	// 处理搜索关键字高亮
	const re = new RegExp(searchText,'g');
	const tmp = name.replace(re, `<span class="hot-text">${searchText}</span>`);
	const labelWidth = {
		width: '100%',
		zIndex: 0
	};

	// 多选类型展示
	if (supportCheckbox) {
		return (
			<Checkbox disabled={disableSelected} indeterminate={indeterminate} checked={checked} value={id} onChange={onHandleSelect} style={labelWidth}>
				<span dangerouslySetInnerHTML={{ __html: tmp }}/>
			</Checkbox>
		);
	}

	// 单选类型展示
	if (supportRadio) {
		return (
			<Radio value={id} disabled={disableSelected} className={isRadioSelected ? 'is-active' : ''} checked={isRadioSelected} onChange={onHandleSelect} style={labelWidth}>
				<span dangerouslySetInnerHTML={{ __html: tmp }}/>
			</Radio>
		);
	}

	return (
		<span className="node-name" dangerouslySetInnerHTML={{ __html: tmp }} onClick={onHandleSelect}/>
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
	return hasChildren && showChildrenItem ? <Icon style={style} type={closeIconType}/> : <Icon style={style} type={openIconType}/>;
}
export default Node;
