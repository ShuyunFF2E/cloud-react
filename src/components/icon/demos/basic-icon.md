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

const iconList = [
	'remark',
	'config',
	'view',
	'hide',
	'calendar',
	'plus',
	'plus-solid',
	'sub-solid',
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
	'folder-solid-open',
    'copy'
];
class IconDemo extends Component {
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
export default IconDemo
```

