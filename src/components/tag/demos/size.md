---
order: 6 title: 小标签 desc: 不同的标签大小
---

```jsx

/**
 * title: 小标签
 * desc: 用带颜色的小标签来区分不同的状态展现
 */
import React, { Component } from 'react';
import { Tag, Radio } from 'cloud-react';

export default class TagDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'normal'
    };
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Radio.Group value={this.state.size} onChange={v => {
            this.setState({ size: v });
          }}>
            <Radio value="large">大尺寸标签</Radio>
            <Radio value="normal">默认尺寸标签</Radio>
            <Radio value="small">小尺寸标签</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>小标签</div>
          <Tag color="blue" size={this.state.size}> 蓝色 </Tag>
          <Tag color="yellow" size={this.state.size}> 黄色 </Tag>
          <Tag color="orange" size={this.state.size}> 橙色 </Tag>
          <Tag color="red" size={this.state.size}> 红色 </Tag>
          <Tag color="green" size={this.state.size}> 绿色 </Tag>
          <Tag color="gray" size={this.state.size}> 灰色 </Tag>
        </div>

        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>圆形小标签</div>
          <Tag color="blue" size={this.state.size} rounded> 蓝色 </Tag>
          <Tag color="yellow" size={this.state.size} rounded> 黄色 </Tag>
          <Tag color="orange" size={this.state.size} rounded> 橙色 </Tag>
          <Tag color="red" size={this.state.size} rounded> 红色 </Tag>
          <Tag color="green" size={this.state.size} rounded> 绿色 </Tag>
          <Tag color="gray" size={this.state.size} rounded> 灰色 </Tag>
        </div>

        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>可关闭的小标签</div>
          <Tag color="blue" size={this.state.size} closable> 蓝色 </Tag>
          <Tag color="yellow" size={this.state.size} closable> 黄色 </Tag>
          <Tag color="orange" size={this.state.size} closable> 橙色 </Tag>
          <Tag color="red" size={this.state.size} closable> 红色 </Tag>
          <Tag color="green" size={this.state.size} closable> 绿色 </Tag>
          <Tag color="gray" size={this.state.size} closable> 灰色 </Tag>
        </div>

        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>带icon的小标签</div>
          <Tag color="blue" size={this.state.size} icon="people"> 蓝色 </Tag>
          <Tag color="yellow" size={this.state.size} icon="people"> 黄色 </Tag>
          <Tag color="orange" size={this.state.size} icon="people"> 橙色 </Tag>
          <Tag color="red" size={this.state.size} icon="people"> 红色 </Tag>
          <Tag color="green" size={this.state.size} icon="people"> 绿色 </Tag>
          <Tag color="gray" size={this.state.size} icon="people"> 灰色 </Tag>
        </div>
        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 5 }}>带icon的标签+可关闭的小标签</div>
          <Tag color="blue" size={this.state.size} icon="people" closable> 蓝色 </Tag>
          <Tag color="yellow" size={this.state.size} icon="people" closable> 黄色 </Tag>
          <Tag color="orange" size={this.state.size} icon="people" closable> 橙色 </Tag>
          <Tag color="red" size={this.state.size} icon="people" closable> 红色 </Tag>
          <Tag color="green" size={this.state.size} icon="people" closable> 绿色 </Tag>
          <Tag color="gray" size={this.state.size} icon="people" closable> 灰色 </Tag>
        </div>
      </React.Fragment>
    );
  }
}
```
