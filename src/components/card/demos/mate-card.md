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
    
    render() {
      return (
        <div style={{ background: '#F2F2F2', padding: 30, display: 'flex', gap: 30 }}>
          <Card>
            <Card.Mate
              avatar={<Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size="large"/>}
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
          <Card>
            <Card.Mate
              title={<p>标题</p>}
              description={<div>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容</div>}/>
          </Card>
        </div>
      );
	}
}
```

