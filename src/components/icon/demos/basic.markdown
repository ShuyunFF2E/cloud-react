---
title: 基础用法
desc: 将type值复制进行使用
---

````javascript
import React, { Component } from 'react';
import Icon from 'ccms-components-react/icon';

const iconList = ['up', 'down', 'gantanhao', 'duihao', 'qiehuan', 'x'];
export default class IconDemo extends Component {
	render() {
		const ulStyle = {listStyleType: 'none', margin: '0', paddding: '0'};
		const liStyle = {display: 'inline-block', width: '100px', textAlign: 'center', padding: '5px', margin: '0 0 5px 0'};
		const iconAreaStyle = {height: '80px', lineHeight: '80px'};
		const textAreaStyle = {height: '20px', lineHeight: '20px'};
		const iconStyle = {fontSize: '36px'};
		return (
			<ul style={ulStyle}>
				{
					iconList.map((type, index) => {
						return (
							<li key={index} style={liStyle}>
								<div style={iconAreaStyle}>
									<Icon type={type} style={iconStyle}></Icon>
								</div>
								<div style={textAreaStyle}>
									{type}
								</div>
							</li>
						);
					})
				}
			</ul>
		);
	}
}

````
