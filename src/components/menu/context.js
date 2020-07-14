import React from 'react';

export const types = {
	// link类型
	LINK: 'link',
	// 默认类型
	COMMON: 'common'
};

const MenuContext = React.createContext({
	openKeys: [],
	selectedKeys: [],
	changeSelectedKeys: () => {}
});

export default MenuContext;
