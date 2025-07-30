---
order: 1
title: 基础用法
desc: Tabs组件的基础用法
---

```jsx
/**
 * title: 异步获取选项卡列表
 * desc: 异步获取选项卡列表
 */
import React, { Component } from "react";
import { Tabs } from "cloud-react";

class BasicTabsDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [],
    };

    setTimeout(() => {
      this.state.tabList.push(
        ...[
          { label: "选项normal", value: 1 },
          { label: "选项active", value: 2 },
          { label: "选项normal1", value: 3 },
        ]
      );
      this.setState({ tabList: [...this.state.tabList] });
    }, 1500);
  }

  handleChange = (key) => {
    console.log("当前激活面板key值为：" + key);
  };

  render() {
    return (
      <Tabs
        activeKey={this.state.tabList?.[0]?.value}
        onChange={this.handleChange}
        step={500}
      >
        {this.state.tabList.map((tab) => (
          <Tabs.Panel tab={tab.label} key={tab.value}>
            选项normal
          </Tabs.Panel>
        ))}
      </Tabs>
    );
  }
}

export default BasicTabsDemo;
```
