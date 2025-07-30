---
order: 1
title: 基本使用
desc: 明密文切换
---

```jsx
/**
 * title: 基本使用
 * desc: 明密文切换
 */
import React, { Component } from "react";
import { Plaintext } from "cloud-react";

class PlainTextDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "李**",
    };
  }

  handleViewPlainClick = () => {
    this.setState({
      content: "李子最美",
    });
  };

  handleViewSecretClick = () => {
    this.setState({
      content: "李**",
    });
  };

  render() {
    const { content } = this.state;
    return (
      <Plaintext
        text={content}
        onViewPlainClick={this.handleViewPlainClick}
        onViewSecretClick={this.handleViewSecretClick}
      />
    );
  }
}

export default PlainTextDemo;
```
