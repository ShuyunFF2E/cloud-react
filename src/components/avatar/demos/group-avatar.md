---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx

            /**
             * title: 类型
             * desc: 支持两种人像， 图片、Icon、字符（其中图标和字符可自定义图标颜色以及背景）
             */
import React from 'react';
import { Avatar, Icon } from 'cloud-react';

const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20
  };
export default class AvatarDemos extends React.Component {
    
    render() {
      return (
        <React.Fragment>
                <div style={styles}>
                  <Avatar size="large"/>
                  <Avatar size="large" group/>
                  <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size="large"/>
                  <Avatar src="https://brand-guide.shuyun.com/IAM/af74a819da58.jpg" size="large" shape="square"/>
                  <Avatar icon={<Icon type="people-add" style={{ color: '#ffffff' }}/>} size="large"/>
                  <Avatar style={{ background: '#5280FF', fontSize: 10 }} size="large">
                    <span>User</span>
                  </Avatar>
                </div>
              </React.Fragment>
      );
	}
}
```

