---
title: 基础用法
desc: 将type值复制进行使用
---

````javascript
import React, { Component } from 'react';
import jeasy from 'jeasy';
import Icon from 'ccms-components-react/icon';
import message from 'ccms-components-react/message';

const iconList = ['doubleLeft', 'doubleRight', 'up', 'down', 'left', 'right', 'up-solid', 'down-solid', 'left-solid', 'right-solid', 'close', 'close-circle-solid', 'check-circle-solid', 'shop', 'refresh', 'info-circle', 'question-circle', 'question-circle-solid', 'warning-circle-solid', 'flag-solid', 'delete', 'search', 'edit', 'last-solid', 'first-solid', 'swap', 'finish'];
export default class IconDemo extends Component {

	render() {
		const onClickHandler = event => {
			const text = event.currentTarget.innerText;
            jeasy.copyText(text);
            message.success(text + ' 已复制');
    	};

		const ulStyle = {listStyleType: 'none', margin: '0', paddding: '0'};
		const liStyle = {display: 'inline-block', width: '200px', textAlign: 'center', padding: '5px', margin: '0 0 5px 0'};
		const iconAreaStyle = {height: '80px', lineHeight: '80px'};
		const textAreaStyle = {height: '20px', lineHeight: '20px', cursor: 'pointer'};
		const iconStyle = {fontSize: '36px'};
		return (
			<ul style={ulStyle}>
				{
					iconList.map((type, index) => {
						return (
							<li key={index} style={liStyle} onClick={onClickHandler}>
								<div style={iconAreaStyle}>
									<Icon type={type} style={iconStyle} className='test-class-name'></Icon>
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
