---
order: 1
title: 单层级卡片
desc: 适用于单层场景
---

```jsx

            /**
             * title: 单层级卡片
             * desc: 适用于单层场景
             */
import React, { Component } from 'react';
import { Cascade, Button } from 'cloud-react';

export default class CascadeDemo extends Component{
	constructor(props){
		super(props);
		this.state = {
			container: 'onlyuuid',
			visible: false,
			data:[{ 
					id: '1',
					title:'你进这扇门是为了让国家看到真理',
					},
					{ 
					id: '2',
					title:'唯独不敢怠慢真心',
					},
					{ 
					id: '3',
					title:'狭隘的爱情留不住雄鹰',
					},
					{ 
					id: '4',
					title:'麻雀也会好奇老鹰会飞多高',
					},
					{ 
					id: '5',
					title:'人生当如蜡烛，从头燃到尾，始终光明',
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
	render(){
		const { state:{ visible, data, container }, onChangeShow } = this;
		return (
			<div className={container} style={{ height: 400, position:'relative' }}>
			<Button onClick={onChangeShow}>单层点击展示</Button>
			<div style={{ position:'absolute',top: '30px', left: '0px' }}>
				<Cascade
				container={container}
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
