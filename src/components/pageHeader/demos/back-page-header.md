---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx

            /**
             * title: 包含返回按钮的
             * desc: 点击返回按钮，可返回上一层。
             */
import React from 'react';
import { PageHeader, Message } from 'cloud-react';


class AvatarDemos extends React.Component {
    
    onBack = () => {
        Message.success('可以回到上一页了');
    }

    render() {
      return (
        <React.Fragment>
          <div>
            <PageHeader title='标题' subTitle="描述信息" onBack={this.onBack} size="small"/>
            <br/>
            <PageHeader title='标题' subTitle="描述信息" onBack={this.onBack}/>
            <br/>
            <PageHeader title='标题' subTitle="描述信息" onBack={this.onBack} size="large"/>
          </div>
        </React.Fragment>
      );
	}
}

export default AvatarDemos;
```

