import React from 'react';
import { noop } from '@utils';

export const types = {
	// link类型
	LINK: 'link',
	// 默认类型
	COMMON: 'common'
};

const MenuContext = React.createContext({
	openKeys: [],
	selectedKeys: [],
	changeSelectedKeys: noop
});

export default MenuContext;
