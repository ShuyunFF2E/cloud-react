---
title: 配置路由功能
desc: 设置type以获得路由跳转的功能
order: 3
---

````javascript
import React, { Component } from 'react';
import Menu from 'ccms-components-react/menu';
import { HashRouter } from 'react-router-dom';

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
                selectedKeys={['/google', '/bing']}
                onSubMenuToggle={this.handleSubMenuToggle} 
                onItemClick={this.handleMenuItemClick}>

                <MenuItem key="/baidu">百度</MenuItem>
                <MenuItem key="/google">谷歌</MenuItem>
                <MenuItem key="/sougou">搜狗</MenuItem>
                <MenuItem key="/bing">必应</MenuItem>
                <MenuItem key="/sm">神马搜索</MenuItem>
            </Menu>
        </HashRouter>
       );
      
   }
}

````
