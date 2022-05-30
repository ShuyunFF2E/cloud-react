---
order: 2
title: 面包屑自定义分隔符
desc: 自定义分隔符
---

```jsx

            /**
             * title: 面包屑自定义分隔符
             * desc: 自定义分隔符
             */
import React from 'react';
import { BreadCrumbs, Button, Icon } from 'cloud-react';
import './styles/basic-bread-crumbs.less'

export default class BreadCrumbsDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          list: [
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
              key: 'forth',
              title: '四级页面',
              iconTpl: <Icon type='search-file' />
            },
            {
              key: 'a3',
              title: '查看详情'
            }
          ]
        };
    }

    onClickBreadCrumbs = item => {
        console.log(item);
        const targetIndex = this.state.list.findIndex(i => i.key === item.key);
        this.setState({ list: this.state.list.slice(0, targetIndex + 1) });
    };

    render() {
        const { size } = this.state;
        const {onClickBreadCrumbs } = this;

		return (
			<React.Fragment>
                <div style={{ marginTop: 20 }}>
                    <BreadCrumbs list={this.state.list} size={size} onClick={onClickBreadCrumbs.bind(this)} split="@"/>
                </div>
            </React.Fragment>
		);
	}
}
```

