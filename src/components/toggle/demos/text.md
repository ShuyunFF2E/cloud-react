---
order: 5
title: 设置文案显示
desc:
---

```jsx
/**
 * title: 设置文案显示
 * desc:
 */
import React from "react";
import { Toggle } from "cloud-react";

class ToggleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  handleChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    const { checked } = this.state;
    return (
      <Toggle
        checked={checked}
        checkedText="on"
        unCheckedText="off"
        onChange={this.handleChange}
      />
    );
  }
}
export default ToggleDemo;
```
