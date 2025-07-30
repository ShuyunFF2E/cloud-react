---
order: 6
title: 导航
desc: 可切换主题的垂直内嵌菜单
---

```jsx
/**
 * title: 内嵌导航
 * desc: 可切换主题的垂直内嵌菜单
 */

import React from "react";
import { CMenu as Menu, Toggle } from "cloud-react";

const { SubMenu, Item } = Menu;

class App extends React.Component {
  state = {
    current: "1",
    theme: "light",
    checked: true,
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  handleChange = (checked) => {
    this.setState({ checked, theme: checked ? "light" : "dark" });
  };

  render() {
    const { current, theme, checked } = this.state;
    return (
      <>
        切换主题
        <Toggle
          checked={checked}
          onChange={this.handleChange}
          checkedText="light"
          unCheckedText="dark"
        />
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="inline"
          onOpenChange={this.onOpenChange}
          // header={<img src="https://qa-pcrm.shuyun.com/pcrm/202102/e2f5f56627cbabf6e6790fe70503cefe/173253_54091_banner_syyj.jpg" />}
          theme={theme}
        >
          <Item key="2">一级菜单</Item>

          <SubMenu title="二级菜单" key="1">
            <Item key="1-1">0111</Item>
            <Item key="1-2">0-2</Item>
          </SubMenu>

          <SubMenu title="四级菜单" key="4">
            <Item key="4-1">inner inner</Item>

            <SubMenu key="4-2" title="sub menu 1">
              <SubMenu title="sub 4-2-0" key="4-2-0">
                <Item key="4-2-0-1">inner inner</Item>
                <Item key="4-2-0-2">inner inner2</Item>
              </SubMenu>
              <Item key="4-2-1">inn</Item>
              <SubMenu title="sub menu 4" key="4-2-2">
                <Item key="4-2-2-1">inner inner</Item>
                <Item key="4-2-2-2">inner inner2</Item>
              </SubMenu>
              <SubMenu title="sub menu 3" key="4-2-3">
                <Item key="4-2-3-1">inner inner</Item>
                <Item key="4-2-3-2">inner inner2</Item>
              </SubMenu>
            </SubMenu>
          </SubMenu>

          <Item key="5" disabled>
            禁用菜单
          </Item>
        </Menu>
      </>
    );
  }
}

export default App;
```
