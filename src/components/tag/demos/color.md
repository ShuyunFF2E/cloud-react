---
order: 5 title: 颜色标签 desc: 不同的主题色标签
---

```jsx
import React, { Component } from "react";
import { Tag, Radio } from "cloud-react";

class TagDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "normal",
    };
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ marginBottom: 15 }}>
          <Radio.Group
            value={this.state.size}
            onChange={(v) => {
              this.setState({ size: v });
            }}
          >
            <Radio value="large">大尺寸标签</Radio>
            <Radio value="normal">默认尺寸标签</Radio>
            <Radio value="small">小尺寸标签</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>一般标签</div>
          <Tag size={this.state.size}> 默认 </Tag>
          <Tag size={this.state.size} checkable>
            {" "}
            可选{" "}
          </Tag>
          <Tag color="blue" size={this.state.size}>
            {" "}
            蓝色{" "}
          </Tag>
          <Tag color="yellow" size={this.state.size}>
            {" "}
            黄色{" "}
          </Tag>
          <Tag color="orange" disabled size={this.state.size}>
            {" "}
            橙色{" "}
          </Tag>
          <Tag color="red" size={this.state.size}>
            {" "}
            红色{" "}
          </Tag>
          <Tag color="green" size={this.state.size}>
            {" "}
            绿色{" "}
          </Tag>
          <Tag color="gray" size={this.state.size}>
            {" "}
            灰色{" "}
          </Tag>
        </div>

        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>可关闭的标签</div>
          <Tag color="blue" closable size={this.state.size}>
            {" "}
            蓝色{" "}
          </Tag>
          <Tag color="yellow" closable size={this.state.size}>
            {" "}
            黄色{" "}
          </Tag>
          <Tag color="orange" closable size={this.state.size}>
            {" "}
            橙色{" "}
          </Tag>
          <Tag color="red" closable size={this.state.size}>
            {" "}
            红色{" "}
          </Tag>
          <Tag color="green" closable size={this.state.size}>
            {" "}
            绿色{" "}
          </Tag>
          <Tag color="gray" closable size={this.state.size}>
            {" "}
            灰色{" "}
          </Tag>
        </div>

        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>带icon的标签</div>
          <Tag color="blue" icon="people" size={this.state.size}>
            {" "}
            蓝色{" "}
          </Tag>
          <Tag color="blue" icon="people" size={this.state.size}>
            {" "}
            蓝色{" "}
          </Tag>
          <Tag color="yellow" icon="people" size={this.state.size}>
            {" "}
            黄色{" "}
          </Tag>
          <Tag color="orange" icon="people" size={this.state.size}>
            {" "}
            橙色{" "}
          </Tag>
          <Tag color="red" icon="people" size={this.state.size}>
            {" "}
            红色{" "}
          </Tag>
          <Tag color="green" icon="people" size={this.state.size}>
            {" "}
            绿色{" "}
          </Tag>
          <Tag color="gray" icon="people" size={this.state.size}>
            {" "}
            灰色{" "}
          </Tag>
        </div>

        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>带icon的标签+可关闭的标签</div>
          <Tag color="blue" icon="people" closable size={this.state.size}>
            {" "}
            蓝色{" "}
          </Tag>
          <Tag color="blue" icon="people" closable size={this.state.size}>
            {" "}
            蓝色{" "}
          </Tag>
          <Tag color="yellow" icon="people" closable size={this.state.size}>
            {" "}
            黄色{" "}
          </Tag>
          <Tag color="orange" icon="people" closable size={this.state.size}>
            {" "}
            橙色{" "}
          </Tag>
          <Tag color="red" icon="people" closable size={this.state.size}>
            {" "}
            红色{" "}
          </Tag>
          <Tag color="green" icon="people" closable size={this.state.size}>
            {" "}
            绿色{" "}
          </Tag>
          <Tag color="gray" icon="people" closable size={this.state.size}>
            {" "}
            灰色{" "}
          </Tag>
        </div>
      </React.Fragment>
    );
  }
}
export default TagDemo;
```
