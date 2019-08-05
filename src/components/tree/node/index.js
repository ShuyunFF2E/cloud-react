/**
 * 树节点
 * index.js
 * wangbo
 * 2019-07-02
 */

import React, { Component, Fragment } from 'react';
import Icon from '../../icon';
import Message from '../../message';
import Checkbox from '../../checkbox';
// import Radio from '../../radio';
import TreeContext from "../context";
import Input from "../../input";
import '../index.less';

class Node extends Component {
	static contextType = TreeContext;

	constructor(props) {
		super(props);
		this.state = {
			showChildrenItem: true,
			inputValue: '',
			isShowInput: false,
			isAdd: false,
			isRadioValue: null,
		};
	}

	// 打开右键菜单
	onHandleContextMenu = (e, node, options) => {
		e.preventDefault();
		const menuStyle = {
			left: `${e.pageX}px`,
			top: `${e.pageY}px`
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
		if (!name) {
			this.setState({
				inputValue: '',
				isShowInput: true,
				isAdd: true
			});
			return;
		}
		this.setState({
			inputValue: name,
			isShowInput: true,
			isAdd: false
		});
	};

	// 输入节点名称
	handleInputChange = (event) => {
		this.setState({ inputValue: event.target.value });
	};

	// 保存节点信息
	onClickSave = (pId) => {
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

	// 单选状态切换
	handleChangeRadio = (value) => {
		const { data } = this.props;
		data.checked = true;
		this.setState({
			isRadioValue: value
		});
		this.context.onSelectedAction(data);
	};

	// 复选状态切换
	handleChangeCheck = (checked) => {
		const { data } = this.props;
		if (this.context.supportCheckbox) {
			data.checked = checked;
		}
		this.context.onSelectedAction(data);
	};

	render() {
		const { data, children } = this.props;
		const { showInput, onClickSave, onClickCancel } = this;
		// 将三个方法传递出去可以供外部调用
		const options = {
			showInput,
			onClickSave,
			onClickCancel
		};

		return (
			<Fragment>
				<div className='tree-list-node-area'>
					{/* 折叠展开icon */}
					<ToggleFold
						hasChildren={data.children.length > 0}
						showChildrenItem={this.state.showChildrenItem}
						toggle={this.toggle}/>

					<div className={`node-item ${this.state.isShowInput && !this.state.isAdd ? 'hide-node' : null} ${data.isActive ? 'is-active' : null}`}
						 onContextMenu={(e) => this.onHandleContextMenu(e, data, options)}>

						{/* 节点前面的icon */}
						<NodeIcon hasChildren={!!children}/>

						{/* checkbox选择，新增或编辑时不显示 */}
						<ShowSelection
							id={data.id}
							name={data.name}
							searchText={this.context.searchText}
							indeterminate={data.indeterminate}
							checked={data.checked}
							isRadioValue={this.state.isRadioValue}
							supportRadio={this.context.supportRadio}
							supportCheckbox={this.context.supportCheckbox}
							onHandleChangeRadio={this.handleChangeRadio}
							onHandleChangeCheck={this.handleChangeCheck}/>
					</div>

					<ShowInput
						isShow={this.state.isShowInput}
						isAdd={this.state.isAdd}
						inputValue={this.state.inputValue}
						maxLength={this.context.nodeNameMaxLength}
						handleInputChange={this.handleInputChange}
						saveItem={() => this.onClickSave(data.id)}
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
	if (!hasChildren) {
		return null;
	}
	return (
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
	if (!isShow && !isAdd) {
		return null;
	}
	return (
		<div className={!isAdd ? 'is-rename' : 'is-add'}>
			<Input className='node-input' value={inputValue} onChange={handleInputChange} autoFocus maxLength={maxLength} placeholder={`最多可输入${maxLength}个字符`}/>
			<Icon type='finish' className='save-icon' onClick={saveItem}/>
			<Icon type='close' className='cancel-icon' onClick={cancelSave}/>
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
 * @param onHandleChangeCheck
 * @returns {null|*}
 * @constructor
 */
function ShowSelection({ searchText, indeterminate, checked, supportRadio, supportCheckbox, id, name, onHandleChangeCheck }) {
	// 处理搜索关键字高亮
	const re = new RegExp(searchText,"g");
	const tmp = name.replace(re, `<span class="hot-text">${searchText}</span>`);

	if (supportCheckbox) {
		return (
			<Checkbox indeterminate={indeterminate} checked={checked} value={id} onChange={onHandleChangeCheck}>
				<span dangerouslySetInnerHTML={{ __html: tmp }}/>
			</Checkbox>
		);
	}

	if (supportRadio) {
		return (
			<label htmlFor={id} className='radio'>
				<input type="radio" name='radio' id={id}/>
				<span dangerouslySetInnerHTML={{ __html: tmp }}/>
			</label>
		);
	}
	return (
		<span className='node-name' dangerouslySetInnerHTML={{ __html: tmp }} onClick={onHandleChangeCheck}/>
	);
}

/**
 * 节点Icon
 * @param hasChildren
 * @returns {*}
 * @return {null}
 */
function NodeIcon({ hasChildren }) {
	if (hasChildren) {
		return (
			<Icon type='info-circle'></Icon>
		);
	}
	return (
		<Icon type='shop'></Icon>
	);
}
export default Node;
