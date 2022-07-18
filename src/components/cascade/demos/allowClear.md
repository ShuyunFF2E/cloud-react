---
order: 2
title: 单层级卡片
desc: 支持同层级不同title
---

```jsx

            /**
             * title: 单层级卡片
             * desc: 支持同层级不同title
             */
import React, { Component } from 'react';
import { Cascade, Button } from 'cloud-react';

export default class CascadeDemo extends Component{
	constructor(props){
		super(props);
		this.state = {
			isShow: false
		}
	}

	onChangeShow = () => {
		const { state:{ isShow } } = this;
		this.setState({
			isShow: !isShow
		})
	}
	render(){
		const { state:{ isShow }, onChangeShow } = this;
		return (
			<div style={{ height: 400 }}>
			<Button onClick={onChangeShow}>点击展示</Button>
				<Cascade
				onClose={onChangeShow}
				isShow={isShow} 
				data={[{ 
					id: '2',
					title:'公众号',
					children:[ {  pid: '2', title: '用户任悦', id: '3', children:[{id: '4', title: '用户任悦12岁', children: undefined}]}] },
					{ 
					id: '6',
					title:'小程序',
					children:[ { pid: '6', title: '用户上帝', id: '7', children:[{id: '8', title: '用户上帝12岁', children: undefined}]}] }]}
					/>
			</div>
		);
	}
}
```
