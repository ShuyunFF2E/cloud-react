---
title: 受控的Menu
desc: Menu组件受控的用法，selectedKeys和openKeys均受控
order: 1
---

```javascript
import React, { Component } from 'react';
import { Menu } from 'cloud-react';

const { MenuItem, SubMenu } = Menu;

export default class MenuBasicDemo extends Component {
	state = { key: 'animal_monkey_1', openKeys: [] };

    // 如果想手动维护openKeys时，启用以下代码，否则组件内部会自动处理openKeys
	// handleSubMenuToggle = (openKey, path, expanded) => {
	// 	console.log('激活项目key:', openKey);
	// 	console.log('激活项目定位路径:', path);
    //     console.log('子菜单是否展开：', expanded);
    //     this.setState({ openKeys: expanded ? [...this.state.openKeys, openKey] : this.state.openKeys.filter(item => item === openKey) })
	// };

	handleMenuItemClick = (key, path) => {
		console.log('激活项目key:', key);
		console.log('激活项目定位路径:', path);

		this.setState({
			key
		});
	};

	render() {

        /**
         * 注： 
         * 1. 如果MenuItem和SubMenu按照父子关系前缀设置的key值，则可直接通过设置selectedKey展开父级/祖先级子菜单。
		 * 例如：
		 * <SubMenu key="/path">
		 * 	<MenuItem key="/path/item" />
		 * </SubMenu>
		 * 此时设置selectedKeys="/path/item", 其父级SubMenu会自动展开，无需手动设置openKeys
		 * 
         * 2. 如果MenuItem和SubMenu中的key值无父子/祖先关系，则需要手动维护openKeys，否则对应子菜单不会展开。
         */ 

		return (
            // 需要手动维护openKeys时，启用openKeys

            <Menu 
                // openKeys={this.state.openKeys}
                selectedKeys={this.state.key}
				onSubMenuToggle={this.handleSubMenuToggle} 
				onItemClick={this.handleMenuItemClick} >
				<SubMenu key="animal" title="动物">
					<MenuItem key="animal_single">单细胞</MenuItem>
					<MenuItem key="animal_double">两栖类</MenuItem>
					<SubMenu key="animal_monkey" title="哺乳动物">
                        <MenuItem key="animal_monkey_1">鸭嘴兽</MenuItem>
						<MenuItem key="animal_monkey_2">大鲸鱼</MenuItem>
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
