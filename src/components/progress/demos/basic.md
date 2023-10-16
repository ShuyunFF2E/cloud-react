---
order: 1
title: 进度条
desc: 进度条
---

```jsx

/**
 * title: Progress
 * desc: 进度条
 */
import React from 'react';
import { Progress, Icon, InputNumber } from 'cloud-react';

class ProgressDemo extends React.Component {
    state = { percent: 50 };

    render() {
		return (
			<div>
                <InputNumber min={0} max={100} precision={0} step={10} value={this.state.percent} onChange={value => {
                    this.setState({ percent: value })
                }}/>
 
                <h4>条形进度条</h4>

                <span>small：</span>
                <Progress type="line" size="small" percent={this.state.percent} />

                <div style={{ marginBottom: 10 }}/>

                <span>middle：</span>
                <Progress type="line" showPercent size="middle" percent={this.state.percent} />

                <div style={{ marginBottom: 10 }}/>

                <span>large：</span>
                <Progress type="line" color="#00b33c" showPercent size="large" percent={this.state.percent} />

                <div style={{ marginBottom: 10 }}/>

                <span>fail：</span>
                <Progress type="line" size="large" color="#E74949" iconTpl={<Icon type="close-circle-solid"/>} percent={this.state.percent} />

                <h4>环形进度条</h4>

                <span>small：</span>
                <Progress type="circle" size="small" percent={this.state.percent} />

                <div style={{ marginBottom: 20 }}/>

                <span>middle：</span>
                <Progress type="circle" size="middle" showPercent percent={this.state.percent} />

                <div style={{ marginBottom: 20 }}/>

                <span>large：</span>
                <Progress type="circle" size="large" color="#E74949" iconTpl={<Icon type="close"/>} percent={this.state.percent} />
            </div>
		);
	}
}

export default ProgressDemo;
```
