---
order: 1
title: 下拉菜单选择器（新）
desc: 基本用法。
---

```jsx

/**
 * title: 下拉菜单选择器（新）
 * desc: 可控组件。
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

    state = {
		current: '1',
        open: false
	};

	handleClick = e => {
		this.setState({ current: e.key });
        Message.success(`菜单Item onClick ${e.key}`);
    }

    changeOpen = () => {
        this.setState({
            open: !this.state.open
        });
    }

	getMenu = () => (
			<Menu
				onClick={this.handleClick}
				selectedKeys={[this.state.current]}
				mode="inline">
				<Item key="1" icon={<Icon type="mail"/>}>一级菜单</Item>
				<Item key="2" icon={<Icon type="mail"/>}>二级菜单</Item>
			</Menu>);

	render() {
        const style = { display: 'flex', gap: '30px', alignItems: 'center' };
		return (
            <div style={style}>
                <Button onClick={this.changeOpen}>改变下拉状态</Button>
                <Dropdown
                    overlay={this.getMenu()}
                    open={this.state.open}>
                    <div>
                        <span>可控下拉菜单</span>
                        <Icon type="down" />
                    </div>
                </Dropdown>
            </div>
		);
	}
}
```
