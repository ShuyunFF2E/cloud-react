---
title: 基础用法，自定义结构
desc: Menu组件的静态用法，自定义组合进行使用
order: 1
---

````javascript
import React, { Component } from 'react';
import Menu from 'ccms-components-react/menu';

const { MenuItem, SubMenu } = Menu;

export default class MenuBasicDemo extends Component {

    state = { key: null, path: null, expanded: null };
    
    handleSubMenuToggle = (key, path, expanded) => {
        console.log('激活项目key:', key);
        console.log('激活项目定位路径:', path);
        console.log('子菜单是否展开：', expanded);

        this.setState({
            key,
            path,
            expanded
        });
    }

    handleMenuItemClick = (key, path) => {
        console.log('激活项目key:', key);
        console.log('激活项目定位路径:', path);
        
        this.setState({
            key,
            path,
            expanded: null
        });
    }

    renderMenu() {
        return (
            <Menu 
                onSubMenuToggle={this.handleSubMenuToggle} 
                onItemClick={this.handleMenuItemClick} 
                openKeys={['2', '3']} 
                selectedKeys={['21']}>

                <MenuItem key="1">菜单1</MenuItem>
                <SubMenu key="2" title="子菜单1">
                    <MenuItem key="21">子菜单项1</MenuItem>
                    <MenuItem key="22">子菜单项2</MenuItem>
                    <SubMenu key="3" title="子菜单3">
                        <MenuItem key="31">子菜单项3</MenuItem>
                    </SubMenu>
                </SubMenu>
            </Menu>
        );
    }

   render() {
       const { key, path, expanded } = this.state;
       return (
           <div className="menu-basic">
            {this.renderMenu()}
            <div className="menu-basic-content">
                <div>内容区域</div>
                <ul>
                    <li>激活项目key: {key}</li>
                    <li>激活项目传播路径: {path}</li>
                    <li>子菜单是否展开: {expanded ? '展开' : '关闭'}</li>
                </ul>
            </div>
           </div>
       );
      
   }
}

````

````less
.menu-basic {

    display: flex;

    .menu-basic-content {
        padding: 10px;
        flex: 1;
    }
}

````
