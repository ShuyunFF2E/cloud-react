---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx

            /**
             * title: 面包屑
             * desc: 可切换大小的面包屑
             */
import React from 'react';
import { BreadCrumbs, Button, Icon } from 'cloud-react';

export default class BreadCrumbsDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'small'
        };
    }

    onChangeSize = size => {
        this.setState({ size });
    }

    onClickBreadCrumbs = item => {
        console.log(item);
    };

    getButtonType = size => {
        return this.state.size === size ? 'primary' : 'normal';
    }
    render() {
        const { size } = this.state;
        const { onChangeSize, onClickBreadCrumbs, getButtonType } = this;
        const list = [
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
        ];

		return (
			<React.Fragment>
                <div className="basic-action">
                    <Button type={getButtonType('large')} onClick={() => {onChangeSize('large')}}>large</Button>
                    <Button type={getButtonType('default')} onClick={() => {onChangeSize('default')}}>default</Button>
                    <Button type={getButtonType('small')} onClick={() => {onChangeSize('small')}}>small</Button>
                    <Button type="link" disabled>
                        current: {size}
                    </Button>
                </div>
                <div style={{ marginTop: 20 }}>
                    <BreadCrumbs list={list} size={size} onClick={onClickBreadCrumbs.bind(this)}/>
                </div>
            </React.Fragment>
		);
	}
}
```

