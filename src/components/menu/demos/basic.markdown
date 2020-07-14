---
title: 基础用法，自定义结构
desc: Menu组件的静态用法，自定义组合进行使用
order: 1
---

```javascript
import React, { Component } from 'react';
import { Menu } from 'cloud-react';

const { MenuItem, SubMenu } = Menu;

export default class MenuBasicDemo extends Component {

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
```

```less
.menu-basic {
	display: flex;

	.menu-basic-content {
		flex: 1;
		background-color: #fefefe;
		> header {
			height: 36px;
			line-height: 36px;
			background-color: rgba(139, 200, 255, 0.1);
			text-align: center;
		}
		> ul,
		li {
			padding: 10px;
			list-style-type: none;
			margin: 0;
		}
		.content-label {
			display: inline-block;
			width: 150px;
			text-align: right;
			margin-right: 10px;
		}
	}
}
```
