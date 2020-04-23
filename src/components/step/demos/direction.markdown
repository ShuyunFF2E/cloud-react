---
order: 4
title: 纵向
desc: 纵向方向的步骤
---

```javascript
import React from 'react';
import { Step } from 'cloud-react';

const title1Style = {};
const title2Style = { marginTop: '50px' };

export default function StepDemo() {
	return (
		<>
			<div className="step-demo-direction">
				<div>
					<h4 style={title1Style}>把大象装进冰箱分几步</h4>

					<Step current={1} direction="vertical">
						<Step.Item title="步骤一" content="把冰箱门打开" />
						<Step.Item title="步骤二" content="把大象放进去" />
						<Step.Item title="步骤三" content="把冰箱门关上" />
					</Step>
				</div>

				<div>
					<h4 style={title1Style}>把长颈鹿装进冰箱分几步</h4>

					<Step current={1} direction="vertical">
						<Step.Item title="步骤一" content="把冰箱门打开" />
						<Step.Item title="步骤二" content="把大象拿出来" />
						<Step.Item title="步骤三" content="把长颈鹿放进去" />
						<Step.Item title="步骤四" content="把冰箱门关上" />
					</Step>
				</div>
			</div>

			<div className="step-demo-direction">
				<div>
					<h4 style={title2Style}>把大象装进冰箱分几步</h4>

					<Step current={1} type="dot" direction="vertical">
						<Step.Item title="把冰箱门打开" content="123132" />
						<Step.Item title="把大象放进去" />
						<Step.Item title="把冰箱门关上" />
					</Step>
				</div>

				<div>
					<h4 style={title2Style}>把长颈鹿装进冰箱分几步</h4>

					<Step current={1} type="dot" direction="vertical">
						<Step.Item title="把冰箱门打开" />
						<Step.Item title="把大象拿出来" />
						<Step.Item title="把长颈鹿放进去" />
						<Step.Item title="把冰箱门关上" />
					</Step>
				</div>
			</div>
		</>
	);
}
```

```less
.step-demo-direction {
	display: flex;

	> * {
		width: 50%;
	}
}
```
