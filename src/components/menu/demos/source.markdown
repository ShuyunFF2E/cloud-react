---
title: 使用特定数据结构进行渲染
desc: 优先使用自定义children组合进行渲染; 未传入自定义组合时，使用source进行渲染
order: 2
---

```javascript
import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Menu } from 'cloud-react';

const { MenuItem, SubMenu } = Menu;

const menuSource = [
	{
		title: '北京',
		key: '/beijing',
		children: [
			{
				title: <span style={{ color: 'red', fontWeight: 'bold' }}>朝阳区</span>,
				key: '/beijing/chaoyang'
			},
			{
				title: '海淀区',
				key: '/beijing/haidian'
			}
		]
	},
	{
		title: '上海',
		key: '/shanghai',
		children: [
			{
				title: '浦东区',
				key: '/shanghai/pudong'
			},
			{
				title: '南京路',
				key: '/shanghai/nanjinglu'
			}
		]
	}
];

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
				onSubMenuToggle={this.handleSubMenuToggle}
				onItemClick={this.handleMenuItemClick}
				source={menuSource}
				openKeys={['/shanghai']}
				selectedKeys={['/shanghai/pudong']}></Menu>
		);
	}
}
```
