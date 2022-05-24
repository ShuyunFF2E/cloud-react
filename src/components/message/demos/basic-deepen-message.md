---
title: 全局重提示
desc: ''
---

```jsx

/**
 * title: 全局重提示
 * desc: 适合重度提示的场景
 */
import React, { Component } from 'react';
import { Button, Message } from 'cloud-react';

const blank = '\u00A0';

export default class MessageDemo extends Component {
  onSuccessClick() {
    Message.success('操作成功', { isDeepen: true });
  }
  onErrorClick() {
    Message.error('危险信息', { isDeepen: true });
  }
  onInfoClick() {
    Message.info('提示信息', { isDeepen: true });
  }
  onWarnClick() {
    Message.warning('警告信息', { isDeepen: true });
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
