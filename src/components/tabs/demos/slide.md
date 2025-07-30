---
title: 页签类型为slide的Tabs
desc: 页签类型为slide的基础Tabs
---

```jsx
/**
 * title: 页签类型为 slide 的 Tabs
 * desc: 页签类型为 slide 的基础 Tabs
 */
import React, { Component, useState } from "react";
import { Button, Tabs, Icon, Tooltip } from "cloud-react";

const linePrefixTpl = <Icon type="search-file" />;

const lineSuffixTpl = (
  <Icon type="warning-circle-solid" style={{ color: "#E74949" }} />
);

class BasicTabs extends Component {
  handleChange = (key) => {
    console.log("当前激活面板key值为：" + key);
  };

  tabList = [
    { tab: "选项卡normal", key: 1, disabled: false },
    { tab: "选项卡active", key: 2, disabled: false },
    { tab: "选项卡normal", key: 3, disabled: false },
    { tab: "选项卡disabled", key: 4, disabled: true },
  ];

  tabList1 = [
    { tab: <Icon type="search-file" />, key: 1, disabled: false },
    { tab: <Icon type="config" />, key: 2, disabled: false },
    { tab: <Icon type="view" />, key: 3, disabled: false },
    { tab: <Icon type="people-solid" />, key: 4, disabled: true },
  ];

  render() {
    return (
      <div>
        <h4>文字</h4>
        <Tabs
          defaultActiveKey="2"
          type="slide"
          linePlacement={this.props.linePlacement}
          lineBgMode={this.props.lineBgMode}
          onChange={this.handleChange}
        >
          {this.tabList.map((item) => (
            <Tabs.Panel
              tab={item.tab}
              key={item.key}
              disabled={item.disabled}
            />
          ))}
        </Tabs>
        <h4>图标</h4>
        <Tabs
          defaultActiveKey="2"
          type="slide"
          linePlacement={this.props.linePlacement}
          lineBgMode={this.props.lineBgMode}
          onChange={this.handleChange}
        >
          {this.tabList1.map((item) => (
            <Tabs.Panel
              tab={item.tab}
              key={item.key}
              disabled={item.disabled}
            />
          ))}
        </Tabs>
      </div>
    );
  }
}

export default BasicTabs;
```
