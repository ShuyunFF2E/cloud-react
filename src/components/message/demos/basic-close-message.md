---
title: 全局提示+关闭
desc: ''
---

```jsx

/**
 * title: 全局提示+关闭
 * desc: 适合重度提示且需要用户手动关闭的场景
 */
import React, { Component } from 'react';
import { Button, Message } from 'cloud-react';

const blank = '\u00A0';

export default class MessageDemo extends Component {
  onSuccessClick() {
    Message.success('操作成功', { showClose: true, duration: 0, onClose: () => {
      console.log('成功信息关闭触发onClose');
    } });
  }
  onErrorClick() {
    Message.error('危险信息', { showClose: true, duration: 0, onClose: () => {
      console.log('危险信息关闭触发onClose');
    } });
  }
  onInfoClick() {
    Message.info('提示信息', { showClose: true, duration: 0, onClose: () => {
     console.log('提示信息关闭触发onClose');
    } });
  }
  onWarnClick() {
    Message.warning('警告信息', { showClose: true, duration: 0, onClose: () => {
      console.log('警告信息关闭触发onClose');
    } });
  }
  
	render() {
		return (
			<div className="app-contain">
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
			</div>
		);
	}
}
```
