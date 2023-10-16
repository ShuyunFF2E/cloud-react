---
title: 页签类型为line的Tabs
desc: 页签类型为line的基础Tabs
---

```jsx

            /**
             * title: 页签类型为 line 的 Tabs
             * desc: 页签类型为 line 的基础 Tabs，支持横向、纵向（居左、居右）展示
             */
import React, { Component, useState } from 'react';
import { Badge, Button, Tabs, Icon, Tooltip } from 'cloud-react';

const linePrefixTpl = <Icon type="search-file"/>;

const lineSuffixTpl = <Badge mode="number" number={6} type="fail" onClick={() => {
    console.log('点击了徽标')
}}/>;

class BasicTabs extends Component {
    handleChange = key => {
        console.log('当前激活面板key值为：' + key);
    };
    
    tabList = this.props.tabList || [
        { tab: '选项卡normal', key: 1, linePrefixTpl, closable: true, disabled: false },
        { tab: '选项卡active', key: 2, linePrefixTpl, lineSuffixTpl, closable: false, disabled: false },
        { tab: '选项卡normal', key: 3, linePrefixTpl, closable: true, disabled: false },
        { tab: '选项卡disabled', key: 4, linePrefixTpl, closable: true, disabled: true },
        { tab: <span style={{ color: 'red' }}>自定义标题</span>, key: 5, linePrefixTpl, closable: true, disabled: false }
    ];

    render() {
        return (
            <Tabs
                defaultActiveKey="2"
                type="line"
                linePlacement={this.props.linePlacement}
                lineBgMode={this.props.lineBgMode}
                onChange={this.handleChange}>
                {this.tabList.map(item => (
                    <Tabs.Panel tab={item.tab} key={item.key} linePrefixTpl={item.linePrefixTpl} lineSuffixTpl={item.lineSuffixTpl} closable={item.closable} disabled={item.disabled}>
                        <div style={{ marginLeft: this.props.linePlacement === 'left' ? 20 : 0 }}>
                            {item.tab}
                        </div>
                    </Tabs.Panel>
                ))}
            </Tabs>
        );
    }
}

class BasicTabsDemo extends Component {
	render() {
		return (
            <div>
                <h4>横向</h4>
                <BasicTabs tabList={[
                  { tab: '选项卡1', key: 1 },
                  { tab: '选项卡2', key: 2 },
                  { tab: '选项卡3', key: 3 },
                  { tab: '选项卡4', key: 4 }
                ]}/>
                <BasicTabs/>
                <h4>纵向（左）</h4>
                <BasicTabs linePlacement="left" tabList={[
                    { tab: '选项卡normal', key: 1, linePrefixTpl, closable: true, disabled: false },
                    { tab: '选项卡active', key: 2, linePrefixTpl, closable: true, disabled: false },
                    { tab: '选项卡normal', key: 3, linePrefixTpl, closable: true, disabled: false },
                    { tab: '选项卡disabled', key: 4, linePrefixTpl, closable: true, disabled: true },
                    { tab: <span style={{ color: 'red' }}>自定义标题</span>, key: 5, linePrefixTpl, lineSuffixTpl, closable: true, disabled: false }
                ]}/>
                <h4>纵向（超长）</h4>
                <BasicTabs linePlacement="left" tabList={[
                    { tab: '选项卡normal', key: 1, linePrefixTpl, closable: true, disabled: false },
                    { tab: '选项卡active', key: 2, linePrefixTpl, closable: true, disabled: false },
                    { tab: '选项卡normal', key: 3, linePrefixTpl, closable: true, disabled: false },
                    { tab: '选项卡disabled', key: 4, linePrefixTpl, closable: true, disabled: true },
                    { tab: '好长好长好长好长好长好长好长好长好长好长', key: 5, linePrefixTpl, lineSuffixTpl, closable: true, disabled: false }
                ]}/>
                <h4>纵向（右）</h4>
                <BasicTabs linePlacement="right" tabList={[
                    { tab: '选项卡1', key: 1, linePrefixTpl, disabled: false, closable: true },
                    { tab: '选项卡2', key: 2, linePrefixTpl, disabled: false, closable: true },
                    { tab: '选项卡3', key: 3, linePrefixTpl, disabled: false, closable: true },
                    { tab: '选项卡4', key: 4, linePrefixTpl, disabled: true, closable: true },
                    { tab: '选项卡5', key: 5, linePrefixTpl, disabled: false, closable: true }
                ]}/>
                <h4>纵向（背景色模式）</h4>
                <BasicTabs linePlacement="left" lineBgMode tabList={[
                    { tab: '选项卡1', key: 1, linePrefixTpl, lineSuffixTpl, disabled: false },
                    { tab: '选项卡2', key: 2, linePrefixTpl, lineSuffixTpl, disabled: false },
                    { tab: '选项卡3', key: 3, linePrefixTpl, lineSuffixTpl, disabled: false },
                    { tab: '选项卡4', key: 4, linePrefixTpl, lineSuffixTpl, disabled: true }
                ]}/>
            </div>
		);
	}
}

export default BasicTabsDemo;
```
