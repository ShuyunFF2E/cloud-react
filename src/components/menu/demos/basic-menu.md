---
title: 基础用法，自定义结构
desc: Menu组件的静态用法，自定义组合进行使用
order: 1
---

```jsx

            /**
             * title: 基础用法，自定义结构
             * desc: Menu组件的静态用法，自定义组合进行使用
             */
import React, { Component } from 'react';
import { Menu } from 'cloud-react';
import './styles/basic.less';

const { MenuItem, SubMenu } = Menu;

class MenuBasicDemo extends Component {

	handleSubMenuToggle = (openKey, path, expanded) => {
		console.log('激活项目key:', openKey);
		console.log('激活项目定位路径:', path);
		console.log('子菜单是否展开：', expanded);
	};

	handleMenuItemClick = (key, path) => {
		console.log('激活项目key:', key);
		console.log('激活项目定位路径:', path);
	};

	render() {
		return (
			<Menu 
				onSubMenuToggle={this.handleSubMenuToggle} 
				onItemClick={this.handleMenuItemClick} >
				<SubMenu key="1" title="菜单1">
					<MenuItem key="11">子菜单项11</MenuItem>
				</SubMenu>
				<SubMenu key="2" title="子菜单1">
					<MenuItem key="21">子菜单项1</MenuItem>
					<MenuItem key="22">子菜单项2</MenuItem>
					<SubMenu key="23" title="子菜单3">
						<MenuItem key="231">子菜单项3</MenuItem>
					</SubMenu>
				</SubMenu>
			</Menu>
		);
	}
}

export default MenuBasicDemo;
```

