---
title: 配置路由功能
desc: 设置type以获得路由跳转的功能
order: 3
---

````javascript
import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Menu } from 'cloud-react';

const { MenuItem, SubMenu } = Menu;

export default class MenuBasicDemo extends Component {

    handleSubMenuToggle = (key, path, expanded) => {
        console.log('激活项目key:', key);
        console.log('激活项目定位路径:', path);
        console.log('子菜单是否展开：', expanded);
    }

    handleMenuItemClick = (key, path) => {
        console.log('激活项目key:', key);
        console.log('激活项目定位路径:', path);
    }

   render() {
       return (
        <HashRouter>
            <Menu
                type="link"
                selectedKeys={['/components/button']}
                onSubMenuToggle={this.handleSubMenuToggle}
                onItemClick={this.handleMenuItemClick}>
                <MenuItem key="/components/button">Button 按纽</MenuItem>
                <MenuItem key="/components/checkbox">Checkbox 复选</MenuItem>
                <MenuItem key="/components/icon">Icon 图标</MenuItem>
                <MenuItem key="/components/input">Input 输入框</MenuItem>
                <MenuItem key="/components/loading">Loading 加载</MenuItem>
            </Menu>
        </HashRouter>
       );

   }
}

````
