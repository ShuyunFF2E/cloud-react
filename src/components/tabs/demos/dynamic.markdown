---
title: 动态用法
desc: 没用....
---

````javascript
import React, { Component, Fragment } from 'react';
import Tabs from 'ccms-components-react/tabs';

export default class DynamicTabsDemo extends Component {
    
    state = { 
        tabList: [{ title: 'indian mi fans', content: 'are you ok ?', key: 'leijun'}],
        activeKey: ''
    }

    count = 1;

    handleClose = key => {
        const { activeKey, tabList } = this.state;

        const pos = tabList.findIndex(item => item.key === key);
        const lastPos = Math.max(0, pos - 1);
        const panes = tabList.filter(item => item.key !== key);

        if (panes.length<=0) return;
        const nextactiveKey = panes[lastPos].key;

        this.setState({ tabList: panes, activeKey: nextactiveKey });
    }

    handleAdd = () => {
        const newKey = (this.count++) + '';
        const newList = [...this.state.tabList, { 
            title: '选项卡卡卡卡' + newKey, 
            content: '当前时间啊:' + Date.now(), 
            key: newKey 
        }];
        this.setState({ tabList: newList, activeKey: newKey });
    }

    handleChange = () => {}

    render() {
        const { tabList, activeKey, count } = this.state;

        return <Fragment> 
            <button onClick={this.handleAdd}>给加一个？</button>
            <div>=======================并不华丽的分割线=====================</div>
            <Tabs defaultActiveKey={'leijun'} activeKey={activeKey} onChange={this.handleChange} onClose={this.handleClose}>
                {tabList.map((item, index) => (
                    <Tabs.TabPanel tab={item.title} closable key={item.key} index={item.index}>
                        {item.content}
                    </Tabs.TabPanel>
                ))}
            </Tabs>
        </Fragment>
    }
}


````
