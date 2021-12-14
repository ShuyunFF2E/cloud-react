---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx

            /**
             * title: 基础
             * desc: 头像有六种尺寸，两种形态
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
                  <Avatar size={16}/>
                  <Avatar size={24}/>
                  <Avatar size={32}/>
                  <Avatar size={40}/>
                  <Avatar size={48}/>
                  <Avatar size={60}/>
                </div>
                <br/>
                <div style={styles}>
                  <Avatar size={16} shape="square"/>
                  <Avatar size={24} shape="square"/>
                  <Avatar size={32} shape="square"/>
                  <Avatar size={40} shape="square"/>
                  <Avatar size={48} shape="square"/>
                  <Avatar size={60} shape="square"/>        
                  </div>
                <br/>
                <br/>
                <div style={styles}>
                  <Avatar size="small" shape="square"/>
                  <Avatar size="default" shape="square"/>
                  <Avatar size="large" shape="square"/>
                </div>
              </React.Fragment>
      );
	}
}
```

