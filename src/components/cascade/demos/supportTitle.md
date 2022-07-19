---
order: 3
title: 级联卡片
desc: 支持同层级不同title
---

```jsx

            /**
             * title: 级联卡片
             * desc: 支持同层级不同title
             */
import React, { Component } from 'react';
import { Cascade, Button } from 'cloud-react';

export default class CascadeDemo extends Component{
	constructor(props){
		super(props);
		this.state = {
			container: 'onlyuuid3',
			visible: false,
			data:[
				{ 
					id: '1',
					title:'阶段一',
					children:[
						{ 
							pid: '1',
							title: '曾用名',
							id: '2',
							children:[{id: '3', title: '长风'},{id: '4', title: 'feenan'},{id: '5', title: '费南'}]
						}
					]
				},
				{ 
					id: '6',
					title:'阶段二',
					children:[
						{
							pid: '6',
							title: '曾用名',
							id: '7',
							children:[{id: '8', title: '游余'},{id: '9', title: '李白喵'},{id: '10', title: '钟意任'}]}]
				},
				{ 
					id: '11',
					title:'阶段三',
					children:[
						{
							pid: '11',
							title: '曾用名',
							id: '12',
							children:[{id: '13', title: '摘月亮'},{id: '14', title: '小石头要变成星球'}]}]
				}
			]
		}
	}

	onChangeShow = () => {
		const { state:{ visible } } = this;
		this.setState({
			visible: !visible
		})
	}

	onChange = (...a) => {
		console.log(a);
	}

	render(){
		const { state:{ visible, data, container }, onChangeShow, onChange } = this;
		return (
			<div className={container} style={{ height: 320, width: 350, position: 'relative' }}>
				<Button onClick={onChangeShow}>同层级带title点击展示选中隐藏</Button>
				<div style={{ position: 'absolute', top: '30px', left: '0px' }}>
					<Cascade
					container={container}
					width="110px"
					height="270px"
					onChange={onChange}
					onClose={onChangeShow}
					visible={visible} 
					data={data}
						/>
				</div>
			</div>
		);
	}
}
```
