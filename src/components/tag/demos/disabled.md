---
order: 1
title: 基本使用
desc: 普通标签、link标签
---

```jsx
import React, { Component } from "react";
import { Tag, Checkbox } from "cloud-react";

class TagDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
  }
  render() {
    return (
      <React.Fragment>
        <Checkbox
          style={{ marginBottom: 15 }}
          checked={this.state.disabled}
          onChange={(checked) => {
            this.setState({ disabled: checked });
          }}
        >
          禁用
        </Checkbox>
        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <Tag disabled={this.state.disabled}>默认标签</Tag>
          <Tag
            disabled={this.state.disabled}
            type="link"
            onClick={() => {
              window.open("http://www.baidu.com");
            }}
          >
            超链接标签
          </Tag>
          <Tag disabled={this.state.disabled} type="stroke">
            描边标签
          </Tag>
          <Tag disabled={this.state.disabled} type="fill-stroke">
            填充描边标签
          </Tag>
          <Tag disabled={this.state.disabled} checkable checked>
            已选禁用标签
          </Tag>

          <div style={{ marginTop: 15, fontSize: 14 }}>
            <Tag
              color="blue"
              icon="people"
              size={this.state.size}
              disabled={this.state.disabled}
            >
              {" "}
              蓝色{" "}
            </Tag>
            <Tag
              color="yellow"
              icon="people"
              size={this.state.size}
              disabled={this.state.disabled}
            >
              {" "}
              黄色{" "}
            </Tag>
            <Tag
              color="orange"
              icon="people"
              size={this.state.size}
              disabled={this.state.disabled}
            >
              {" "}
              橙色{" "}
            </Tag>
            <Tag
              color="red"
              icon="people"
              size={this.state.size}
              disabled={this.state.disabled}
            >
              {" "}
              红色{" "}
            </Tag>
            <Tag
              color="green"
              icon="people"
              size={this.state.size}
              disabled={this.state.disabled}
            >
              {" "}
              绿色{" "}
            </Tag>
            <Tag
              color="gray"
              icon="people"
              size={this.state.size}
              disabled={this.state.disabled}
            >
              {" "}
              灰色{" "}
            </Tag>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default TagDemo;
```
