---
order: 1
title: 下拉菜单选择器（新）
desc: 基本用法。
---

```jsx

/**
 * title: 下拉菜单是按钮（新）
 * desc: 通过设置icon属性修改右边的图标
 */
import React, { useState } from 'react';
import { 
	CDropdown as Dropdown,
	Icon,
	CMenu as Menu,
    Button,
    Message,
	Tooltip
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
         const style = { display: 'flex', gap: '10px 30px', 'flexWrap': 'wrap' };
		const overlay = (
            <Dropdown.Menu onClick={this.handleMenuClick}>
                <Dropdown.Item icon={<Icon type="shop-line"/>} id="tenement">租户</Dropdown.Item>
                <Dropdown.Item icon={<Icon type="people"/>} id="client">客户</Dropdown.Item>
                <Dropdown.Item icon={<Icon type="group"/>} id="clientBase">客户群</Dropdown.Item>
            </Dropdown.Menu>
        );
		return (
			<>
				<div style={style}>
					<Dropdown.Button
						overlay={overlay}
						onClick={this.handleClick}>
						DropdownBtn
					</Dropdown.Button>
					<Dropdown.Button overlay={overlay} placement="topLeft" icon={<Icon type="user-fill"/>} onClick={this.handleClick}>
						DropdownBtn
					</Dropdown.Button>
					<Dropdown.Button overlay={overlay} danger onClick={this.handleClick}>
						DropdownBtn
					</Dropdown.Button>
				</div>
				<div style={{ ...style, marginTop: 10 }}>
					<Dropdown overlay={overlay} onClick={this.handleClick}>
						<Button>
							Button
							<Icon type="down"/>
						</Button>
					</Dropdown>
					<Dropdown.Button overlay={overlay} onClick={this.handleClick} buttonsRender={(leftBtn, rightBtn)  => (
						[
							<Tooltip content="click send">
								{React.cloneElement(leftBtn, {}, <span style={{ width: 50, display: 'inline-blank'}}>Send</span>)}
							</Tooltip>,
							React.cloneElement(rightBtn, {}, <Icon type ='sent'/>)
						]
					)} />
				</div>
			</>
		);
	}
}
```
