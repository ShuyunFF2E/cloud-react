---
title: 基本用法
desc: 四种类型 `normal`、`warning`、`major`、`success`，默认为`normal`
order: 1
---

```jsx
/**
 * title: 基本用法
 * desc: 四种类型 `normal`、`warning`、`major`、`success`，默认为`normal`
 */
import React from "react";
import { Tips, Radio } from "cloud-react";

class TipsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderRadiusSize: "default",
    };
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ marginBottom: 15 }}>
          <Radio.Group
            value={this.state.borderRadiusSize}
            onChange={(v) => {
              this.setState({
                borderRadiusSize: v,
              });
            }}
          >
            <Radio value="small">圆角(small)：3px</Radio>
            <Radio value="default">圆角(default)：6px</Radio>
            <Radio value="large">圆角(large)：12px</Radio>
          </Radio.Group>
        </div>
        <Tips
          msg="normal 默认提示信息"
          borderRadiusSize={this.state.borderRadiusSize}
        />
        <Tips
          type="warning"
          msg="warning 提示信息"
          borderRadiusSize={this.state.borderRadiusSize}
        />
        <Tips
          type="major"
          msg="major 提示信息"
          borderRadiusSize={this.state.borderRadiusSize}
        />
        <Tips
          type="success"
          msg="success 提示信息"
          borderRadiusSize={this.state.borderRadiusSize}
        />
      </div>
    );
  }
}

export default TipsDemo;
```
