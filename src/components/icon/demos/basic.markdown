---
title: 基础用法
desc: 将type值复制进行使用
---

````javascript
import React, { Component } from 'react';
import jeasy from 'jeasy';
import Icon from 'cloud-react/icon';
import message from 'cloud-react/message';

const iconList = ['mail', 'people', 'people-solid', 'electrocardiogram', 'rmb', 'search-file', 'top-solid', 'bottom-solid', 'move-up-solid', 'move-down-solid', 'doubleLeft', 'doubleRight', 'up', 'down', 'left', 'right', 'up-solid', 'down-solid', 'left-solid', 'right-solid', 'close', 'close-circle-solid', 'check-circle-solid', 'shop', 'refresh', 'info-circle', 'question-circle', 'question-circle-solid', 'warning-circle-solid', 'flag-solid', 'delete', 'search', 'edit', 'last-solid', 'first-solid', 'swap', 'finish', 'folder-solid', 'openFolder-solid'];
export default class IconDemo extends Component {

	render() {
		const onClickHandler = event => {
			const text = event.currentTarget.innerText;
            jeasy.copyText(text);
            message.success(text + ' 已复制');
    	};

		const iconStyle = {fontSize: '36px'};
		return (
			<ul className="icon-list">
				{
					iconList.map((type, index) => {
						return (
							<li key={index} className="icon-li" onClick={onClickHandler}>
								<div className="icon-area">
									<Icon type={type} style={iconStyle}></Icon>
								</div>
								<div className="text-area">
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

````less
.icon-list {
	list-style-type: none;
	margin: 0;
	paddding: 0;
	.icon-li {
		display: inline-block;
		width: 200px;
		text-align: center;
		padding: 5px;
		margin: 0 0 5px 0;
		cursor: pointer;
		&:hover{
			color: #00AAF1;
		}
		.icon-area{
			height: 80px;
			line-height: 80px;
		}
		.text-area{
			height: 20px;
			line-height: 20px;
			cursor: pointer;
		}
	}
}
````
