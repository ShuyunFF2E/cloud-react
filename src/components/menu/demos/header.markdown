---
title: 自定义header
desc: Menu组件的静态用法，配置自定义头部
order: 4
---

```javascript
import React, { Component } from 'react';
import { Menu, Icon } from 'cloud-react';
import { HashRouter } from 'react-router-dom';

const { MenuItem, SubMenu } = Menu;

export default class MenuBasicDemo extends Component {
	handleSubMenuToggle = (key, path, expanded) => {
		console.log('激活项目key:', key);
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
				selectedKeys={['/c']}
				header={
					<div className="menu-header-extra">
						<Icon type="swap" />
						我是自定义头部
					</div>
				}
				onSubMenuToggle={this.handleSubMenuToggle}
				onItemClick={this.handleMenuItemClick}>
				<MenuItem key="/a">双鱼座</MenuItem>
				<MenuItem key="/b">水瓶座</MenuItem>
				<MenuItem key="/c">巨蟹座</MenuItem>
				<MenuItem key="/d">处女座</MenuItem>
			</Menu>
		);
	}
}
```

```less
.menu-header-extra {
	width: 180px;
	height: 30px;
	line-height: 30px;
	background-color: #829abe;
	font-size: 12px;
	cursor: pointer;
	color: #fff;
	text-align: center;
}
```
