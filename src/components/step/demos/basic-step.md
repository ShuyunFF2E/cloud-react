---
order: 1
title: 基本用法
desc: 简单的步骤条。
---

```jsx

            /**
             * title: 基本用法
             * desc: 简单的步骤条。
             */
import React from 'react';
import { Step, Icon } from 'cloud-react';

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

			<Step current={0}>
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象放进去" />
				<Step.Item title="把冰箱门关上" />
			</Step>

			<h4 style={title2Style}>把长颈鹿装进冰箱分几步</h4>

			<Step current={3}>
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象拿出来" />
				<Step.Item title="把长颈鹿放进去" />
				<Step.Item title="把冰箱门关上" />
			</Step>

      <h4 style={title2Style}>节点为icon</h4>
      <Step current={2}>
				<Step.Item title="把冰箱门打开" icon={<Icon type="search-file"/>} />
				<Step.Item title="把大象拿出来" icon={<Icon type="config"/>} />
				<Step.Item title="把长颈鹿放进去" icon={<Icon type="view"/>} />
				<Step.Item title="把冰箱门关上" icon={<Icon type="people-solid"/>} />
			</Step>

			<h4 style={title2Style}>把大象装进冰箱分几步-小尺寸</h4>

			<Step current={2} size="small">
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象拿出来" />
				<Step.Item title="把长颈鹿放进去" />
				<Step.Item title="把冰箱门关上" />
			</Step>

      <h4 style={title2Style}>节点为icon-小尺寸</h4>
      <Step current={2} size="small">
				<Step.Item title="把冰箱门打开" icon={<Icon type="search-file"/>} />
				<Step.Item title="把大象拿出来" icon={<Icon type="config"/>} />
				<Step.Item title="把长颈鹿放进去" icon={<Icon type="view"/>} />
				<Step.Item title="把冰箱门关上" icon={<Icon type="people-solid"/>} />
			</Step>
		</React.Fragment>
	);
}
```
