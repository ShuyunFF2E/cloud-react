---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx

            /**
             * title: 包含面包屑的页头
             */
import React from 'react';
import { PageHeader, BreadCrumbs } from 'cloud-react';


export default class AvatarDemos extends React.Component {
    list = [
        {
            key: 'home',
            title: '首页',
            icon: 'search-file'
        },
        {
            key: 'first',
            title: '一级页面',
            icon: 'search-file'
        },
        {
            key: 'second',
            title: '二级页面'
        },
        {
            key: 'third',
            title: '三级页面'
        },
        {
            key: 'a3',
            title: '查看详情'
        }
    ];

    onClickBreadCrumbs = item => {
        console.log(item);
    };

    render() {
      return (
        <React.Fragment>
          <div>
            <PageHeader
                title='标题'
                subTitle="描述信息"
                breadcrumb={
                    <BreadCrumbs list={this.list} onClick={this.onClickBreadCrumbs.bind(this)}/>}/>
          </div>
        </React.Fragment>
      );
	}
}
```

