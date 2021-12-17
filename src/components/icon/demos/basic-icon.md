---
title: 基础用法
desc: 将type值复制进行使用
---

```jsx

            /**
             * title: 基础用法
             * desc: 将type值复制进行使用
             */
import React, { Component } from 'react';
import ShunyunUtils from 'shuyun-utils';
import { Icon, Message } from 'cloud-react';
import './styles/basic-icon.less'

const iconList = [
	'user-fill',
	'group-fill',
	'close-fill',
	'close-line',
	'close-fill-1',
	'info-circle1',
	'info_1',
	'success-line',
	'success-fill',
	'info_2',
	'shop',
	'flag-solid',
	'folder-solid',
	'folder-solid-open',
	'swap',
	'search-file',
	'bottom-solid',
	'top-solid',
	'move-down-solid',
	'move-up-solid',
	'last-solid',
	'first-solid',
	'rmb',
	'mail',
	'question-circle',
	'question-circle-solid',
	'people',
	'people-solid',
	'group',
	'group_add',
	'people-add',
	'more',
	'move',
	'calendar',
	'sent',
	'book',
	'list-2',
	'time',
	'list-1',
	'task',
	'tag',
	'remark',
	'pie-chart',
	'vip',
	'table',
	'config',
	'delete',
	'export',
	'upload',
	'view-board',
	'view',
	'hide',
	'menu',
	'filter',
	'search',
	'edit',
	'copy',
	'refresh',
	'plus',
	'subtract',
	'left-solid',
	'up-solid',
	'right-solid',
	'down-solid',
	'sort',
	'sub-solid',
	'plus-solid',
	'radio',
	'radio-button',
	'double-left',
	'double-right',
	'right',
	'left',
	'down',
	'up',
	'finish',
	'close',
	'checkbox',
	'checkbox-indeterminate',
	'checkbox-blank'
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
								<Icon type={type} style={iconStyle}/>
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


