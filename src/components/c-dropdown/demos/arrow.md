---
order: 1
title: 下拉菜单选择器（新）
desc: 基本用法。
---

```jsx

/**
 * title: 下拉菜单选择器（新）
 * desc: 带箭头。
 */
import React, { useState } from 'react';
import { 
	CDropdown as Dropdown,
	Icon,
	CMenu as Menu,
    Button,
    Message
} from 'cloud-react';

const { Item } = Menu;

export default class DropdownDemo extends React.Component {

	handleMenuClick = key => {
        Message.success(`菜单Item onClick ${key}`);
    }

	getMenu = () => {
		const menu = (
            <Dropdown.Menu onClick={this.handleMenuClick}>
                <Dropdown.Item icon={<Icon type="shop-line"/>} id="tenement">租户</Dropdown.Item>
                <Dropdown.Item icon={<Icon type="people"/>} id="client">客户</Dropdown.Item>
                <Dropdown.Item icon={<Icon type="group"/>} id="clientBase">客户群</Dropdown.Item>
            </Dropdown.Menu>
        );
		return menu;
	}

	render() {
        const style = { display: 'flex', gap: '30px' };
		return (
            <div style={style}>
                <Dropdown
                    overlay={this.getMenu()}
                    arrow
                    placement="center">
                    <div>
                        <span>有箭头,箭头根据placement</span>
                        <Icon type="down" />
                    </div>
                </Dropdown>
                <Dropdown
                    overlay={this.getMenu()}
                    arrow={{ pointAtCenter: 'center' }}
                    placement="topRight">
                    <div>
                        <span>有箭头,箭头居中</span>
                        <Icon type="down" />
                    </div>
                </Dropdown>
            </div>
		);
	}
}
```
