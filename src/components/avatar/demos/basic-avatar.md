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
import './style.less';

export default class AvatarDemos extends React.Component {
    
    render() {
      return (
                <div className="avatar-basic-demo" >
                  <div>
                    <span>16px</span>
                    <span>24px</span>
                    <span>32px</span>
                    <span>40px</span>
                    <span>48px</span>
                    <span>60px</span>
                  </div>
                  <div>
                    <div><Avatar size={16}/></div>
                    <div><Avatar size={24}/></div>
                    <div><Avatar size={32}/></div>
                    <div><Avatar size={40}/></div>
                    <div><Avatar size={48}/></div>
                    <div><Avatar size={60}/></div>
                  </div>
                  <div>
                    <div><Avatar size={16} shape="square"/></div>
                    <div><Avatar size={24} shape="square"/></div>
                    <div><Avatar size={32} shape="square"/></div>
                    <div><Avatar size={40} shape="square"/></div>
                    <div><Avatar size={48} shape="square"/></div>
                    <div><Avatar size={60} shape="square"/></div>
                  </div>
                  <div>
                    <div><Avatar size="small" shape="square"/></div>
                    <div><Avatar size="default" shape="square"/></div>
                    <div/>
                    <div><Avatar size="large" shape="square"/></div>
                  </div>
                </div>
      
      );
	}
}
```

