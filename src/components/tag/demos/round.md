---
order: 1
title: 基本使用
desc: 普通标签、link标签
---

```jsx
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

class TagDemo extends Component {
	render() {
		return (
			<React.Fragment>
				<div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 15 }}>圆形标签</div>
          <Tag color="blue" rounded closable icon="people"> 蓝色 </Tag>
          <Tag color="yellow" rounded closable> 黄色 </Tag>
          <Tag color="orange" rounded closable icon="people"> 橙色 </Tag>
          <Tag color="red" rounded closable> 红色 </Tag>
          <Tag color="green" rounded closable icon="people"> 绿色 </Tag>
          <Tag color="gray" rounded closable> 灰色 </Tag>
        </div>

        <div style={{ marginBottom: 15, fontSize: 14 }}>
          <div style={{ marginBottom: 15 }}>自定义圆角标签</div>
          <Tag color="blue" style={{ borderRadius: '3px' }}> 圆角：3px </Tag>
          <Tag color="yellow" style={{ borderRadius: '6px' }}> 圆角：6px </Tag>
          <Tag color="orange" style={{ borderRadius: '12px' }}> 圆角：12px </Tag>
        </div>
			</React.Fragment>
		);
	}
}
export default TagDemo;
```
