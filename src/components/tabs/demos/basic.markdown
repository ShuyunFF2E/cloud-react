---
title: 基础用法
desc: 啦啦啦啦....
---

````javascript
import React, { Component, useState, useEffect } from 'react';
import Tabs from 'ccms-components-react/tabs';

export default class BasicTabsDemo extends Component {

    handleChange = key => {
        console.log('当前激活面板key值为：' + key);
    }

    render() {
                return <Tabs defaultActiveKey="eat" onChange={this.handleChange}>
                        <Tabs.TabPanel tab="选项1" key='1'>选项1111111111111</Tabs.TabPanel>
                        <Tabs.TabPanel tab="吃饭" key="eat">吃饭啊啊啊啊啊</Tabs.TabPanel>
                        <Tabs.TabPanel tab="加关闭按钮" key="aaa" closable>为什么要关掉我！</Tabs.TabPanel>
                        <Tabs.TabPanel tab="禁用我？？" key="bbb" disabled>试试</Tabs.TabPanel>
                        <Tabs.TabPanel tab={<span style={{color: 'red'}}>自定义标题</span>} key="ccc">测试自定义啊</Tabs.TabPanel>
                    </Tabs>
    }
}

````
