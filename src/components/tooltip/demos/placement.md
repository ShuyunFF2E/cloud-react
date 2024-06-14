---
title: 位置
desc: Tooltip 组件提供了十二个不同的位置
---

```jsx

            /**
             * title: 位置
             * desc: Tooltip 组件提供了十二个不同的位置
             */
import React from 'react';
import { Button, Tooltip, Radio } from 'cloud-react';

class ToolTipDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '提示文字',
			theme: 'dark',
            trigger: 'click',
		};
	}

	render() {
		const { content, theme, trigger } = this.state;
		const blank = '\u00A0';
		const leftWrap = { float: 'left', width: '60px', wordBreak: 'break-word' };
		const rightWrap = { float: 'right', width: '60px', wordBreak: 'break-word' };
		const bottomWrap = { clear: 'both' };
		const wrap = { width: '400px', margin: '20px auto', textAlign: 'center' };
		return (
			<div style={wrap}>
              <div style={{ marginBottom: 20 }}>
                <Radio.Group value={theme} onChange={v => {
                  this.setState({ theme: v });
                }}>
                  <Radio value="dark">dark 主题</Radio>
                  <Radio value="light">light 主题</Radio>
                  <Radio value="error">error 主题</Radio>
                </Radio.Group>
              </div>
              <div style={{ marginBottom: 20 }}>
                <Radio.Group value={trigger} onChange={v => {
                  this.setState({ trigger: v });
                }}>
                  <Radio value="hover">trigger: hover</Radio>
                  <Radio value="click">trigger: click</Radio>
                </Radio.Group>
              </div>
				<div>
					<Tooltip content={content} placement="top-left" theme={theme} trigger={trigger}>
						<Button type="normal">上左</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="top" theme={theme} trigger={trigger}>
						<Button type="normal">上中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="top-right" theme={theme} trigger={trigger}>
						<Button type="normal">上右</Button>
					</Tooltip>
				</div>
				<div style={rightWrap}>
					<Tooltip content={content} placement="right-top" theme={theme} trigger={trigger}>
						<Button type="normal">右上</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="right" theme={theme} trigger={trigger}>
						<Button type="normal">右中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="right-bottom" theme={theme} trigger={trigger}>
						<Button type="normal">右下</Button>
					</Tooltip>
				</div>
				<div style={leftWrap}>
					<Tooltip content={content} placement="left-top" theme={theme} trigger={trigger}>
						<Button type="normal">左上</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="left" theme={theme} trigger={trigger}>
						<Button type="normal">左中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="left-bottom" theme={theme} trigger={trigger}>
						<Button type="normal">左下</Button>
					</Tooltip>
				</div>
				<div style={bottomWrap}>
					<Tooltip content={content} placement="bottom-left" theme={theme} trigger={trigger}>
						<Button type="normal">下左</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="bottom" theme={theme} trigger={trigger}>
						<Button type="normal">下中</Button>
					</Tooltip>
					{blank}
					<Tooltip content={content} placement="bottom-right" theme={theme} trigger={trigger}>
						<Button type="normal">下右</Button>
					</Tooltip>
				</div>
			</div>
		);
	}
}
export default ToolTipDemo;
```
