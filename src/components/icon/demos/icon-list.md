---
order: 1
title: 单色图标
desc: 将 type 值复制进行使用
---


```jsx
/**
 * inline: true
 */
import React, { Component } from 'react';
import ShunyunUtils from 'shuyun-utils';
import { Icon, Message, Tabs } from 'cloud-react';
import './styles/index.less';

const { ColorIcon } = Icon;

const iconList = {
	basic: [
		'guanbi',
		'group-fill1',
		'shop-fill',
		'shop-line',
		'thumb-up-fill',
		'thumb-up-line',
		'pause',
		'begin',
		'lock',
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
		'checkbox-blank',
        'arrange-3',
        'arrange-2',  
        'edit-2',  
        'warn'
	],
	color: [
		'mr',
		'P12',
		'a-compass-line',
		'people-line',
		'gift-line',
		'exchange-box-line',
		'risk-line',
		'message-line',
		'tiktok-line',
		'bar-chart-line',
		'chart-line',
		'home-line',
		'group-line',
		'XLS',
		'ZIP',
		'DOC',
		'TXT',
		'PPT',
		'PDF',
		'video',
		'CSV',
	]
}

const titleList = {
	basic: '基础图标',
	color: '彩色图标',
}

const componentList = {
	basic: Icon,
	color: ColorIcon,
}

const iconStyle = { fontSize: '36px' };

export default class IconDemo extends Component {
	handleCopy = event => {
		const text = event.currentTarget.innerText;
		ShunyunUtils.copyText(text);
		Message.success(text + ' 已复制');
	};

	render() {
		return (
			<Tabs defaultActiveKey="basic" type="capsule">
				{Object.keys(iconList).map(key => {
					const Component = componentList[key];
					return (
						<Tabs.Panel tab={titleList[key]} key={key}>
							<ul className="icon-list">
								{iconList[key].map((type, index) => {
									return (
										<li key={type} className="icon-card" onClick={this.handleCopy}>
											<div className="icon-area">
												<Component type={type} style={iconStyle}/>
											</div>
											<div className="text-area">{type}</div>
										</li>
									);
								})}
							</ul>
						</Tabs.Panel>
					);
				})}
			</Tabs>
		);
	}
}
```
