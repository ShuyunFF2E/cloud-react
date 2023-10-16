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
import { Button, Message } from 'cloud-react';

const blank = '\u00A0';

class MessageDemo extends Component {
  onSuccessClick() {
		Message.success('操作成功！');
	}
	onErrorClick() {
		Message.error('更新失败！');
	}
	onInfoClick() {
	  Message.info('提示信息！');
	}
	onWarnClick() {
		Message.warning('警告信息！');
	}
	onSuccessLinkClick() {
	  Message.success(<span>操作成功！<a href="https://ui.shuyun.com">有链接</a></span>);
  }
  onErrorLinkClick() {
    Message.error(<span>更新失败！<a href="https://ui.shuyun.com">有链接</a></span>);
  }
  onInfoLinkClick() {
    Message.info(<span>提示文字！<a href="https://ui.shuyun.com">有链接</a></span>);
  }
  onWarnLinkClick() {
    Message.warning(<span>警告信息！<a href="https://ui.shuyun.com">有链接</a></span>);
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
