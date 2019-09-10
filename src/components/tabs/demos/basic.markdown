---
title: 基础用法
desc: Tabs组件的基础用法
---

````javascript
import React, { Component } from 'react';
import Tabs from 'cloud-react/tabs';

export default class BasicTabsDemo extends Component {

    handleChange = key => {
        console.log('当前激活面板key值为：' + key);
    }

    render() {
        return (
            <Tabs defaultActiveKey="eat" onChange={this.handleChange}>
                <Tabs.Panel tab="选项1" key='1'>选项1111111111111</Tabs.Panel>
                <Tabs.Panel tab="吃饭" key="eat">吃饭啊啊啊啊啊</Tabs.Panel>
                <Tabs.Panel tab="加关闭按钮" key="aaa" closable>为什么要关掉我！</Tabs.Panel>
                <Tabs.Panel tab="禁用我？？" key="bbb" disabled>试试</Tabs.Panel>
                <Tabs.Panel tab={<span style={{color: 'red'}}>自定义标题</span>} key="ccc">测试自定义啊</Tabs.Panel>
            </Tabs>
        );
    }
}

````
