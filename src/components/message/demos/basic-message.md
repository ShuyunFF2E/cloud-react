---
title: 全局提示
desc: ''
---

```jsx

/**
 * title: 基础用法
 * desc: 提示内容支持ReactNode
 */
import React, { Component } from 'react';
import { Button, Message, Radio } from 'cloud-react';

const blank = '\u00A0';

class MessageDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        duration: 3 * 1000,
        borderRadiusSize: 'default',
      }
    };
  }

  onSuccessClick = () => {
    Message.success('操作成功！', this.state.option);
  }

  onErrorClick = () => {
    Message.error('更新失败！', this.state.option);
  }

  onInfoClick = () => {
    Message.info('提示信息！', this.state.option);
  }

  onWarnClick = () => {
    Message.warning('警告信息！', this.state.option);
  }

  onSuccessLinkClick = () => {
    Message.success(<span>操作成功！<a href="https://ui.shuyun.com">有链接</a></span>, this.state.option);
  }

  onErrorLinkClick = () => {
    Message.error(<span>更新失败！<a href="https://ui.shuyun.com">有链接</a></span>, this.state.option);
  }

  onInfoLinkClick = () => {
    Message.info(<span>提示文字！<a href="https://ui.shuyun.com">有链接</a></span>, this.state.option);
  }

  onWarnLinkClick = () => {
    Message.warning(<span>警告信息！<a href="https://ui.shuyun.com">有链接</a></span>, this.state.option);
  }

  render() {
    return (
      <div className="app-contain">
        <div style={{ marginBottom: 15 }}>
          <Radio.Group value={this.state.option.duration} onChange={v => {
            this.setState({
              option: {
                ...this.state.option,
                duration: v
              }
            });
          }}>
            <Radio value={0}>不自动关闭</Radio>
            <Radio value={3000}>默认值3s后关闭</Radio>
            <Radio value={10000}>默认值10s后关闭</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: 15 }}>
          <Radio.Group value={this.state.option.borderRadiusSize} onChange={v => {
            this.setState({
              option: {
                ...this.state.option,
                borderRadiusSize: v
              }
            });
          }}>
            <Radio value="small">圆角(small)：3px</Radio>
            <Radio value="default">圆角(default)：6px</Radio>
            <Radio value="large">圆角(large)：12px</Radio>
          </Radio.Group>
        </div>
        <Button type="normal" onClick={this.onInfoClick}>
          提示
        </Button>
        {blank}
        <Button type="normal" onClick={this.onSuccessClick}>
          成功
        </Button>
        {blank}
        <Button type="normal" onClick={this.onWarnClick}>
          警告
        </Button>
        {blank}
        <Button type="normal" onClick={this.onErrorClick}>
          危险
        </Button>
        <div style={{ padding: '5px' }} />
        <Button type="normal" onClick={this.onInfoLinkClick}>
          提示
        </Button>
        {blank}
        <Button type="normal" onClick={this.onSuccessLinkClick}>
          成功
        </Button>
        {blank}
        <Button type="normal" onClick={this.onWarnLinkClick}>
          警告
        </Button>
        {blank}
        <Button type="normal" onClick={this.onErrorLinkClick}>
          危险
        </Button>
      </div>
    );
  }
}

export default MessageDemo;
```
