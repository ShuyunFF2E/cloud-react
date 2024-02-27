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
import { BreadCrumbs, Button } from 'cloud-react';

class BreadCrumbsDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'default'
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
                title: '首页'
            },
            {
                key: 'bread-crumbs',
                title: '面包屑'
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
                <div>
                    <BreadCrumbs list={list} size={size} onClick={onClickBreadCrumbs.bind(this)}/>
                </div>
            </React.Fragment>
		);
	}
}
export default BreadCrumbsDemo
```

