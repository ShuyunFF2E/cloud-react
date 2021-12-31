---
order: 3
title: 导航
desc: 带logo的顶部导航
---

```jsx
/**
 * title: 顶部导航
 * desc: 带logo的顶部导航
 */

import React from 'react';
// import Menu from '../index.js';
import { CMenu as Menu, Icon } from 'cloud-react';

const { SubMenu, Item } = Menu;

class App extends React.Component {
	state = {
    current: '1',
  };

	handleClick = e => {
		console.log('click ', e);
		this.setState({ current: e.key });
	};

	render() {
		const { current } = this.state;
		return (
			<Menu
				onClick={this.handleClick}
				selectedKeys={[current]}
				mode="horizontal"
                header={<img src="https://qa-pcrm.shuyun.com/pcrm/202102/e2f5f56627cbabf6e6790fe70503cefe/173253_54091_banner_syyj.jpg" />}
				>
				<Item key="2" icon={<Icon type="mail"/>}>一级菜单</Item>

				<SubMenu title="二级菜单" key="1" icon={<Icon type="mail"/>}>
					<Item key="1-1">二级菜单1</Item>
					<Item key="1-2">二级菜单2</Item>
				</SubMenu>

				<SubMenu
					title="四级菜单"
					key="4"
					icon={<Icon type="mail"/>}
					>
					<Item key="4-1">inner inner</Item>

					<SubMenu key="4-2" title="sub menu 1">
						<SubMenu title="sub 4-2-0" key="4-2-0">
							<Item key="4-2-0-1">inner inner</Item>
							<Item key="4-2-0-2">inner inner2</Item>
						</SubMenu>
						<Item key="4-2-1">inn</Item>
						<SubMenu title="sub menu 4" key="4-2-2">
							<Item key="4-2-2-1">inner inner</Item>
							<Item key="4-2-2-2">inner inner2</Item>
						</SubMenu>
						<SubMenu title="sub menu 3" key="4-2-3">
							<Item key="4-2-3-1">inner inner</Item>
							<Item key="4-2-3-2">inner inner2</Item>
						</SubMenu>
					</SubMenu>
				</SubMenu>

				<Item key="5" disabled>禁用菜单</Item>
			</Menu>
		);
	}
}

export default App;

```
