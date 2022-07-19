---
order: 2
title: 级联卡片
desc: 适用于存在级联关系的场景
---

```jsx

            /**
             * title: 级联卡片
             * desc: 适用于存在级联关系的场景
             */
import React, { Component } from 'react';
import { Cascade, Button } from 'cloud-react';

export default class CascadeDemo extends Component{
	constructor(props){
		super(props);
		this.state = {
			container: 'onlyuuid2',
			isShow: false,
			data:[
				{ 
					id: '1',
					title:'一片冰心',
					children:[
						{ 
							id: '2',
							title: '惟将终夜长开眼，报答平生未展眉'
						},
						{ 
							id: '3',
							title: '愿为市鞍马，从此替爷征'
						}
					]
				},
				{ 
					id: '4',
					title:'侠之大者',
					children:[
						{
							title: '功成不必在我',
							id: '5',
						},
						{
							title: '为众人抱薪者，不可使其冻毙于荒野',
							id: '6',
						}
					]
				},
				{ 
					id: '7',
					title:'人生',
					children:[
						{
							title: '风刀霜剑，困厄催逼',
							id: '8',
							children: [{ title: '感谢这世界有剥夺也有馈赠', id: '10'}]
						},
						{
							title: '论迹不论心，论心无完人',
							id: '9',
						}
					]
				}
			]
		}
	}

	onChangeShow = () => {
		const { state:{ isShow } } = this;
		this.setState({
			isShow: !isShow
		})
	}
	render(){
		const { state:{ isShow, data, container }, onChangeShow } = this;
		return (
			<div className={container} style={{ height: 400, position: 'relative' }}>
				<Button onClick={onChangeShow}>多层点击展示</Button>
				<div style={{ position: 'absolute', top: '30px', left: '0px' }}>
					<Cascade
					container={container}
					onClose={onChangeShow}
					isShow={isShow} 
					data={data}
						/>
				</div>
			</div>
		);
	}
}
```
