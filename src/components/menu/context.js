import React from 'react';
import { noop } from '@utils';

const MenuContext = React.createContext({
	openKeys: [],
	selectedKeys: [],
	changeSelectedKeys: noop
});

export const types = {
	LINK: 'link', // link类型
	COMMON: 'common' // 预设类型
};

export default MenuContext;
