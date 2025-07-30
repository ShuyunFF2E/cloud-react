---
title: 箭头显隐
desc: 可配置箭头的显示与否
---

```jsx
/**
 * title: 箭头显隐
 * desc: 可配置箭头的显示与否。
 */
import React from "react";
import { Button, Tooltip } from "cloud-react";

class ToolTipDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "config arrow toolTip",
      showArrow: true,
      show: true,
    };
  }

  onChangeStatus = () => {
    this.setState({ showArrow: !this.state.showArrow });
  };

  render() {
    const { content, showArrow, show } = this.state;
    const style = { marginRight: "10px" };
    return (
      <div id="wrap" className="wrapClass">
        <Button style={style} onClick={this.onChangeStatus}>
          config {showArrow ? "no arrow" : "has arrow"} tooltip
        </Button>
        <Tooltip
          content={content}
          placement="top"
          visible={show}
          showArrow={showArrow}
          alwaysShow
        >
          <span>
            Click button to config {showArrow ? "no" : "has"} arrow toolTip.
          </span>
        </Tooltip>
      </div>
    );
  }
}
export default ToolTipDemo;
```
