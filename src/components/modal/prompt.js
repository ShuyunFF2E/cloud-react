/**
 * prompt.js
 * wangbo
 * 2019-06-26
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Icon from '../icon';
import Notification from './modal';

const containers = {};
function prompt({ type, icon, title, body, onOk, onClose }) {
	// 创建一个关联id
	const id = `prompt${new Date().getTime()}`;
	containers[id]= document.createElement('div');

	let visible = true;

	// 删除节点
	const handleDeleteDOM = () => {
		const unmountContainer = containers[id];
		if (unmountContainer) {
			// 删除react组件节点
			ReactDOM.unmountComponentAtNode(unmountContainer);
			// 删除dom节点
			document.body.removeChild(unmountContainer);
		}
		visible = false;
	};

	// 取消
	const handelClose = () => {
		handleDeleteDOM();
		onClose();
	};
	// 确定
	const handelOk = () => {
		handleDeleteDOM();
		onOk();
	};

	ReactDOM.render(
		<Notification
			visible={visible}
			type={type}
			onClose={handelClose}
			onOk={handelOk}>
			<div>
				<header className='info-area'>
					<Icon type={icon} className={`icon-style ${type}-style` }></Icon>
					<span className='message-info'>{title}</span>
				</header>
				<section className='more-info'>{body}</section>
			</div>
		</Notification>,
		containers[id]
	);
	document.body.appendChild(containers[id]);
}

export default prompt;
