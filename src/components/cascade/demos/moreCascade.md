---
order: 2
title: 级联卡片
desc: 存在级联关系、纯展示
---

```jsx

            /**
             * title: 级联卡片
             * desc: 存在级联关系、纯展示
             */
import React, { Component } from 'react';
import { Cascade, Button } from 'cloud-react';

class CascadeDemo extends Component{
	constructor(props){
		super(props);
		this.state = {
			container: 'onlyuuid2',
			visible: true,
			data:[
				{ 
					id: '1',
					title:'一片冰心',
					children:[
						{ 
							id: '2',
							title: '豫章故郡'
						},
						{ 
							id: '3',
							title: '洪都新府'
						}
					]
				},
				{ 
					id: '4',
					title:'侠之大者',
					children:[
						{
							title: '星分翼轸',
							id: '5',
						},
						{
							title: '地接衡庐',
							id: '6',
						}
					]
				},
				{ 
					id: '7',
					title:'人生逆旅',
					children:[
						{
							title: '物华天宝',
							id: '8',
							children: [{ title: '龙光射牛斗之墟', id: '10'}]
						},
						{
							title: '人杰地灵',
							id: '9',
						}
					]
				}
			]
		}
	}

	onChange = (...a) => {
		console.log(a);
	}

	render(){
		const { state:{ visible, data, container }, onChange } = this;
		return (
			<div className={container} style={{ height: 400, position: 'relative' }}>
				<div style={{ position: 'absolute', top: '30px', left: '0px' }}>
					<Cascade
					width="208px"
					height="270px"
					isOnlyShow
					supportCopy
					onChange={onChange}
					container={container}
					visible={visible} 
					data={data}
						/>
				</div>
			</div>
		);
	}
}
export default CascadeDemo
```
