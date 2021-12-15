---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx

            /**
             * title: 典型卡片
             * desc: 包含标题、内容、操作区域
             */
import React from 'react';
import { Card, Avatar, Button } from 'cloud-react';

export default class CardDemos extends React.Component {
    actionOne = (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <Button type="link">创建活动</Button>
        <Button type="link">创建活动</Button>
      </div>
    );
    render() {
      return (
        <div style={{ background: '#F2F2F2', padding: 30, display: 'flex', gap: 30 }}>
          <Card
            cover={<img src="https://brand-guide.shuyun.com/IAM/0c2841aceba9.jpeg" />}>
            <Card.Mate
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
           <Card
            action={this.actionOne}
            cover={<img src="https://brand-guide.shuyun.com/IAM/0c2841aceba9.jpeg" />}>
            <Card.Mate
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
          <Card
            action={this.actionOne}
            cover={<img src="https://brand-guide.shuyun.com/IAM/0c2841aceba9.jpeg" />}
            coverShape="square">
            <Card.Mate
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
        </div>
      );
	}
}
```

