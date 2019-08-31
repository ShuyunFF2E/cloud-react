/**
 * 上下文所需字段
 * context.js
 * wangbo
 * 2019-07-08
 */

import React from 'react';

const noop = () => {};
const TreeContext = React.createContext({
	supportCheckbox: false,
	supportRadio: false,
	supportMenu: true,
	isAddFront: true,
	nodeNameMaxLength: 10,
	searchText: '',
	// 显示输入框
	showInput: noop,
	// 点击保存按钮
	onSaveClick: noop,
	// 点击取消按钮
	onClickCancel: noop,
	// onAddAction: noop,
	// onRemoveAction: noop,
	// onRenameAction: noop,
	onSelectedAction: noop
});

export default TreeContext;
