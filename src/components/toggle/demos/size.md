---
order: 4
title: 两种大小
desc: size可为 `small`、`default`，默认为 `defalut`
---

```jsx
/**
 * title: 两种大小
 * desc: size可为 `small`、`default`，默认为 `defalut`
 */
import React from "react";
import { Button, Toggle } from "cloud-react";

class ToggleSizeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      size: "default",
      isSmall: false,
    };
  }

  handleChange = (checked) => {
    this.setState({ checked });
  };

  handleSize = (size) => {
    const { isSmall } = this.state;
    this.setState({ size, isSmall: !isSmall });
  };

  render() {
    const { size, checked, isSmall } = this.state;
    const switchSize = isSmall ? "default" : "small";
    return (
      <div>
        当前size为{size}：
        <Toggle size={size} checked={checked} onChange={this.handleChange} />
        <br />
        <br />
        <Button onClick={() => this.handleSize(switchSize)}>
          切换为{switchSize}
        </Button>
      </div>
    );
  }
}
export default ToggleSizeDemo;
```
