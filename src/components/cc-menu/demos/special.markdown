---
title: ccMenu
desc: ccMenu无店铺的用法
order: 6
---

````javascript
import React, { Component } from 'react';
import CcMenu from 'ccms-components-react/cc-menu';
import Icon from 'ccms-components-react/icon';
import { HashRouter } from 'react-router-dom';

const menuSource = [{
    title: '会员',
    key: '/member',
    children: [{
        title: <span style={{color: 'red'}}>等级</span>,
        key: '/member/preview'
    }, {
        title: '积分',
        key: '/member/pointChange'
    }]
}, {
    title: '操作',
    key: '/loyalty',
    children: [{
        title: '积分发放',
        key: '/loyalty/pointDeliver'
    }, {
        title: '等级计算',
        key: '/loyalty/gradeCompute'
    }]
}];

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

    handleShopSearch = (keyword, newShopList) => {
        console.log('搜索关键字:', keyword);
        console.log('搜索结果', newShopList);
    }

    handleShopChange = (shop, plat) => {
        console.log('选中的店铺:', shop);
        console.log('选中的平台:', plat);
    }

   render() {

       return (
            
           <HashRouter>
                <div className="cc-menu-wrapper">
                        <CcMenu
                            header={
                                <div className="menu-header-extra">
                                    <Icon type="swap"/>
                                    切换旧版
                                </div>
                            }
                            menuSource={menuSource}
                            onMenuItemClick={this.handleMenuItemClick}
                            onSubMenuToggle={this.handleSubMenuToggle}
                            onShopSearch={this.handleShopSearch}
                            onShopChange={this.handleShopChange}>
                        </CcMenu>
                </div>
           </HashRouter>
       );
      
   }
}

````

````less
.cc-menu-wrapper {
    height: 300px;
    border: 1px solid #ccc;
    overflow: hidden;

    .menu-header-extra {
        width: 180px;
        height: 30px;
        line-height: 30px;
        background-color: #829abe;
        font-size: 12px;
        cursor: pointer;
        color: #fff;
        text-align: center;
    }
}
````
