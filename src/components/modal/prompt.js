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
function entity({ type, icon, message, body, onOk, onClose }) {
	// 创建一个关联id
	const id = `prompt${new Date().getTime()}`;
	containers[id]= document.createElement('div');

	let visible = true;

	// 删除节点
	const handleDeleteDOM = () => {
		const unmountContainer = containers[id];
		if (unmountContainer) {
			ReactDOM.unmountComponentAtNode(unmountContainer);
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
					<span className='message-info'>{message}</span>
				</header>
				<section className='more-info'>{body}</section>
			</div>
		</Notification>,
		containers[id]
	);
	document.body.appendChild(containers[id]);
}

export default entity;
