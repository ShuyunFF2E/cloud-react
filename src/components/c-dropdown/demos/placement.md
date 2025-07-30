---
order: 1
title: 下拉菜单选择器（新）
desc: 基本用法。
---

```jsx
/**
 * title: 下拉菜单选择器（新）
 * desc: 支持 6 个弹出位置, 'bottom', 'bottomLeft', 'bottomRight', 'top', 'topLeft', 'topRight'。
 */
import React, { useState } from "react";
import {
  CDropdown as Dropdown,
  Icon,
  CMenu as Menu,
  Button,
  Message,
} from "cloud-react";

const { Item } = Menu;

class DropdownDemo extends React.Component {
  handleMenuClick = (key) => {
    Message.success(`菜单Item onClick ${key}`);
  };

  onOpenChange = (e) => {
    console.log(`收缩、展开 ${e}`);
    Message.success(`收缩、展开 ${e}`);
  };

  render() {
    // 'bottom', 'bottomLeft', 'bottomRight', 'top', 'topLeft', 'topRight'。
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
        <Dropdown overlay={overlay} placement="bottom">
          <Button type="normal">向下</Button>
        </Dropdown>
        <Dropdown overlay={overlay} placement="bottomLeft">
          <Button type="normal">向左下</Button>
        </Dropdown>
        <Dropdown overlay={overlay} placement="bottomRight">
          <Button type="normal">向右下</Button>
        </Dropdown>
        <Dropdown overlay={overlay} placement="top">
          <Button type="normal">向上</Button>
        </Dropdown>
        <Dropdown overlay={overlay} placement="topLeft">
          <Button type="normal">向左上</Button>
        </Dropdown>
        <Dropdown overlay={overlay} placement="topRight">
          <Button type="normal">向右上</Button>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownDemo;
```
