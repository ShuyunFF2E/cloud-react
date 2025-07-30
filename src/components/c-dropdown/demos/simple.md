---
order: 1
title: 下拉菜单选择器（新）
desc: 基本用法。
---

```jsx
/**
 * title: 下拉菜单选择器（新）
 * desc: 默认的Menu
 */
import React, { useState } from "react";
import {
  CDropdown as Dropdown,
  Icon,
  CMenu as Menu,
  Message,
} from "cloud-react";

const { Item } = Menu;

class DropdownDemo extends React.Component {
  handleMenuClick = (key) => {
    Message.success(`菜单Item onClick ${key}`);
  };

  render() {
    const style = { display: "flex", gap: "30px" };
    const overlay = (
      <Dropdown.Menu onClick={this.handleMenuClick}>
        <Dropdown.Item icon={<Icon type="shop-line" />} id="tenement">
          租户
        </Dropdown.Item>
        <Dropdown.Item icon={<Icon type="people" />} id="client">
          客户
        </Dropdown.Item>
        <Dropdown.Item icon={<Icon type="group" />} id="clientBase">
          客户群
        </Dropdown.Item>
      </Dropdown.Menu>
    );
    return (
      <div style={style}>
        <Dropdown
          overlay={
            <Dropdown.Menu onClick={this.handleMenuClick}>
              <Dropdown.Item id="1">菜单一</Dropdown.Item>
              <Dropdown.Item id="2">菜单二</Dropdown.Item>
              <Dropdown.Item id="3">菜单三</Dropdown.Item>
              <Dropdown.Item id="4" type="divider" />
              <Dropdown.Item id="5">菜单四</Dropdown.Item>
              <Dropdown.Item id="6" disabled>
                菜单五
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <div>
            <span>基础下拉菜单,带分割线</span>
            <Icon type="down" />
          </div>
        </Dropdown>
        <Dropdown overlay={overlay}>
          <div>
            <span>带图标的菜单类目</span>
            <Icon type="down" />
          </div>
        </Dropdown>
        <Dropdown overlay={overlay}>
          <div>
            <Icon type="people" />
            <span>带图标下拉菜单</span>
            <Icon type="down" />
          </div>
        </Dropdown>
        <Dropdown overlay={overlay} disabled>
          <div>
            <span>不能使用的下拉菜单</span>
            <Icon type="down" />
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownDemo;
```
