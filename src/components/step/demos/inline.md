---
order: 2
title: 并排对齐
desc: 图标和内容部分并排显示
---

```jsx

            /**
             * title: 并排对齐
             * desc: 图标和内容部分并排显示
             */
import React from 'react';
import { Step } from 'cloud-react';

const title1Style = {
	textAlign: 'center'
};
const title2Style = {
	marginTop: '100px',
	textAlign: 'center'
};

export default function StepDemo() {
	return (
		<React.Fragment>
			<h4 style={title1Style}>把大象装进冰箱分几步</h4>

			<Step current={1} direction="inline">
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象放进去" />
				<Step.Item title="把冰箱门关上" />
			</Step>

			<h4 style={title2Style}>把长颈鹿装进冰箱分几步</h4>

			<Step current={1} direction="inline">
				<Step.Item title="步骤一" content="把冰箱门打开" />
				<Step.Item title="步骤二" content="把大象拿出来" />
				<Step.Item title="步骤三" content="把长颈鹿放进去" />
				<Step.Item title="步骤四" content="把冰箱门关上" />
			</Step>
		</React.Fragment>
	);
}
```
