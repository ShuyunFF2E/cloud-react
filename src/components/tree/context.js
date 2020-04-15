import React from 'react';
import { noop } from '@utils';

const TreeContext = React.createContext({
	supportCheckbox: false,
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
	// 点击选中
	onSelectedAction: noop
});

export default TreeContext;
