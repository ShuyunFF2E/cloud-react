---
order: 3
title: 类型
desc: 有圆形和点状类型，默认是圆形
---

````javascript
import React from 'react';
import { Step } from 'cloud-react';

const title1Style = {
	textAlign: 'center'
}
const title2Style = {
	marginTop: '100px',
	textAlign: 'center'
}

export default function StepDemo() {
	return (
		<>

			<h4 style={title1Style}>把大象装进冰箱分几步</h4>

			<Step current={1} type="circle">
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象放进去" />
				<Step.Item title="把冰箱门关上" />
			</Step>

			<h4 style={title2Style}>把长颈鹿装进冰箱分几步</h4>

			<Step current={2} type="circle">
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象拿出来" />
				<Step.Item title="把长颈鹿放进去" />
				<Step.Item title="把冰箱门关上" />
			</Step>

			<h4 style={title2Style}>把大象装进冰箱分几步</h4>

			<Step current={2} type="dot">
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象放进去" />
				<Step.Item title="把冰箱门关上" />
			</Step>

			<h4 style={title2Style}>把长颈鹿装进冰箱分几步</h4>

			<Step current={2} type="dot">
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象拿出来" />
				<Step.Item title="把长颈鹿放进去" />
				<Step.Item title="把冰箱门关上" />
			</Step>
		</>
	);
}
````
