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
        <div style={{ background: '#F2F2F2', padding: 30 }}>
          <Card>
             <p>这里是内容</p>
             <p>这里是内容</p>
          </Card>
          <br/>
          <br/>
          <br/>
          <Card title="标题" extra="更多操作">
            <p>这里是内容</p>
            <p>这里是内容</p>
            <p>这里是内容</p>
            <p>这里是内容</p>
            <p>这里是内容</p>
          </Card>
          <br/>
          <br/>
          <br/>
          <Card >
            <Card.Mate
              avatar={<Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size="large"/>}
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
          <br/>
          <br/>
          <br/>
          <Card >
            <Card.Mate
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
          <br/>
          <br/>
          <br/>
          <Card action={this.actionOne}>
            <Card.Mate
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
          <br/>
          <br/>
          <br/>
          <Card cover={<img src="https://brand-guide.shuyun.com/IAM/0c2841aceba9.jpeg" />}>
            <Card.Mate
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
        </div>
      );
	}
}
```

