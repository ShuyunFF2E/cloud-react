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

class AvatarDemos extends React.Component {
    
    render() {
      return (
                <div className="avatar-basic-demo" >
                  <div>
                    <h5>24px</h5>
                    <div>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={24}/>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={24} shape="square"/>
                      <Avatar size={24} icon={<Icon type="user-fill"/>} />
                      <Avatar size={24} icon={<Icon type="user-fill"/>} shape="square" />
                      <Avatar size={24}>A</Avatar>
                      <Avatar size={24} group shape="square">A</Avatar>
                    </div>
                  </div>
                  <div>
                    <h5>32px</h5>
                    <div>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={32}/>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={32} shape="square"/>
                      <Avatar size={32} icon={<Icon type="user-fill"/>} />
                      <Avatar size={32} icon={<Icon type="user-fill"/>} shape="square" />
                      <Avatar size={32}>A</Avatar>
                      <Avatar size={32} group shape="square">A</Avatar>
                    </div>
                  </div>
                  <div>
                    <h5>40px</h5>
                    <div>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={40}/>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={40} shape="square"/>
                      <Avatar size={40} icon={<Icon type="user-fill"/>} />
                      <Avatar size={40} icon={<Icon type="user-fill"/>} shape="square" />
                      <Avatar size={40}>A</Avatar>
                      <Avatar size={40} group shape="square">A</Avatar>
                    </div>
                  </div>
                  <div>
                    <h5>48px</h5>
                    <div>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={48}/>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={48} shape="square"/>
                      <Avatar size={48} icon={<Icon type="user-fill"/>} />
                      <Avatar size={48} icon={<Icon type="user-fill"/>} shape="square" />
                      <Avatar size={48}>A</Avatar>
                      <Avatar size={48} group shape="square">A</Avatar>
                    </div>
                  </div>
                  <div>
                    <h5>60px</h5>
                    <div>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={60}/>
                      <Avatar src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png" size={60} shape="square"/>
                      <Avatar size={60} icon={<Icon type="user-fill"/>} />
                      <Avatar size={60} icon={<Icon type="user-fill"/>} shape="square" />
                      <Avatar size={60}>A</Avatar>
                      <Avatar size={60} group shape="square">A</Avatar>
                    </div>
                  </div>
                  <div>
                    <h6>size 非数字</h6>
                    <div>
                      <Avatar size="small" shape="square"/>
                      <Avatar size="default" shape="square"/>
                      <Avatar size="large" shape="square"/>
                    </div>
                  </div>
                </div>
      
      );
	}
}

export default AvatarDemos;
```

