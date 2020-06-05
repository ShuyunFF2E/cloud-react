---
title: 基础用法
desc: 将type值复制进行使用
---

```javascript
import React, { Component } from 'react';
import ShunyunUtils from 'shuyun-utils';
import { Icon, Message } from 'cloud-react';

const iconList = [
	'remark',
	'config',
	'view',
	'hide',
	'calendar',
	'plus',
	'upload',
	'export',
	'mail',
	'people',
	'people-solid',
	'rmb',
	'search-file',
	'top-solid',
	'bottom-solid',
	'move-up-solid',
	'move-down-solid',
	'double-left',
	'double-right',
	'up',
	'down',
	'left',
	'right',
	'up-solid',
	'down-solid',
	'left-solid',
	'right-solid',
	'close',
	'close-circle-solid',
	'check-circle-solid',
	'shop',
	'refresh',
	'info-circle',
	'question-circle',
	'question-circle-solid',
	'warning-circle-solid',
	'flag-solid',
	'delete',
	'search',
	'edit',
	'last-solid',
	'first-solid',
	'swap',
	'finish',
	'folder-solid',
	'folder-solid-open'
];
export default class IconDemo extends Component {
	render() {
		const onClickHandler = event => {
			const text = event.currentTarget.innerText;
			ShunyunUtils.copyText(text);
			Message.success(text + ' 已复制');
		};

		const iconStyle = { fontSize: '36px' };
		return (
			<ul className="icon-list">
				{iconList.map((type, index) => {
					return (
						<li key={index} className="icon-li" onClick={onClickHandler}>
							<div className="icon-area">
								<Icon type={type} style={iconStyle}></Icon>
							</div>
							<div className="text-area">{type}</div>
						</li>
					);
				})}
			</ul>
		);
	}
}
```

```less
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
		&:hover {
			color: #00aaf1;
		}
		.icon-area {
			height: 80px;
			line-height: 80px;
		}
		.text-area {
			height: 20px;
			line-height: 20px;
			cursor: pointer;
		}
	}
}
```
