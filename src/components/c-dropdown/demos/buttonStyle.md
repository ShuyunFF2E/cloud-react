---
order: 1
title: 下拉菜单选择器（新）
desc: 基本用法。
---

```jsx

/**
 * title: 下拉菜单是按钮（新）
 * desc: 按钮下拉菜单的基础用法
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

	handleClick = () => {
		Message.success(`click left button`);
	}

	render() {
        const style = { display: 'flex', gap: '10px 30px', alignItems: 'center' };
        const overlay = (
            <Dropdown.Menu onClick={this.handleMenuClick}>
                <Dropdown.Item icon={<Icon type="shop-line"/>} id="tenement">租户</Dropdown.Item>
                <Dropdown.Item icon={<Icon type="people"/>} id="client">客户</Dropdown.Item>
                <Dropdown.Item icon={<Icon type="group"/>} id="clientBase">客户群</Dropdown.Item>
            </Dropdown.Menu>
        );
		return (
            <div>
                <div style={style}>
                    <span>常见样式</span>
                    <Dropdown.Button
                        overlay={overlay}
                        onClick={this.handleClick}
                        type="primary">
                        DropdownBtn
                    </Dropdown.Button>
                    <Dropdown.Button
                        overlay={overlay}
                        onClick={this.handleClick}>
                        DropdownBtn
                    </Dropdown.Button>
                </div>
                <br/>
                <div style={style}>
                    <span>disabled</span>
                    <Dropdown.Button
                        overlay={overlay}
                        onClick={this.handleClick}
                        type="primary"
                        disabled>
                        DropdownBtn
                    </Dropdown.Button>
                    <Dropdown.Button
                        overlay={overlay}
                        onClick={this.handleClick}
                        disabled>
                        DropdownBtn
                    </Dropdown.Button>
                </div>
            </div>
		);
	}
}
```
