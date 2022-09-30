---
order: 1
title: 下拉菜单选择器（新）
desc: 基本用法。
---

```jsx

/**
 * title: 下拉菜单选择器（新）
 * desc: 触发方式，默认是移入触发菜单，可以点击触发。
 */
import React, { useState } from 'react';
import { 
	CDropdown as Dropdown,
	Icon,
	CMenu as Menu,
	Message
} from 'cloud-react';

const { Item } = Menu;

export default class DropdownDemo extends React.Component {

    state = {
		current: '1',
	};

	handleClick = e => {
		this.setState({ current: e.key });
		Message.success(`菜单Item onClick ${key}`);
    }

    onOpenChange = e => {
        console.log('收缩、展开', e)
		Message.success(`收缩、展开 ${e}`);
    }

	render() {
		const overlay = (
            <Dropdown.Menu>
                <Dropdown.Item icon={<Icon type="shop-line"/>}>租户</Dropdown.Item>
                <Dropdown.Item icon={<Icon type="people"/>}>客户</Dropdown.Item>
                <Dropdown.Item icon={<Icon type="group"/>}>客户群</Dropdown.Item>
            </Dropdown.Menu>
        );
		return (
			<Dropdown
				overlay={overlay}
                trigger={['click']}>
				<div>
					<span>点击展示</span>
					<Icon type="down" />
				</div>
			</Dropdown>
		);
	}
}
```
