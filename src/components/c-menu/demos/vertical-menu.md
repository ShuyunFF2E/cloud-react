---
order: 8
title: 导航
desc: 子菜单不出现在主菜单内
---

```jsx
/**
 * title: 竖直导航
 * desc: 子菜单不出现在主菜单内
 */

import React from "react";
import { CMenu as Menu } from "cloud-react";

const { SubMenu, Item } = Menu;

class App extends React.Component {
  state = {
    current: "1",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="vertical">
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
    );
  }
}

export default App;
```
