/**
 * index.js
 * runnan
 * 2019-6-28
 */

import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import jeasy from 'jeasy';
import './index.less';
import Toolview from "./view";

const container = {};
let targetEle = null;

/**
 * 元素插入到兄弟节点
 * @param newElement: 新元素
 * @param targetElement: 目标元素
 */

function insertAfter(newElement, targetElement) {
	const parent = targetElement.parentNode;
	if (parent.lastChild === targetElement) {
		// 如果最后的节点是目标元素，则直接添加。因为默认是最后
		parent.appendChild(newElement);
	} else {
		// 如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

/**
 * 渲染到 body or 兄弟节点
 * @param isBody: 是否渲染到body
 * @param wrapper: 容器
 * @param props: 属性
 * @param targetElement: 目标元素
 */
function renderComponentWithPosition(isBody, wrapper, props, targetElement) {
	if (isBody) {
		document.body.appendChild(wrapper);
		ReactDOM.render(props, wrapper);
	} else {
		insertAfter(wrapper, targetElement);
		targetElement.appendChild(wrapper);
		ReactDOM.render(props, wrapper);
	}
}

/**
 * 销毁DOM跟ReactDom
 * @param isBody: 是否渲染到body
 * @param wrapper: 容器
 * @param targetElement: 目标元素
 */
function destroyDOM(isBody, wrapper, targetElement) {
	if (isBody) {
		ReactDOM.unmountComponentAtNode(wrapper);
		document.body.removeChild(wrapper);
	} else {
		ReactDOM.unmountComponentAtNode(wrapper);
		targetElement.removeChild(wrapper);
	}
}



class ToolTip extends Component{

	 constructor(props) {
	 	super(props);
	 	// TODO markdown会触发mouseEnter两次,等这个问题解决了移入可删除这个变量
	 	this.isShow = false;
	 }

	 // 不影响其他组件的事件
	 onMouseEnter = (event) => {
		 const { children, trigger, content } = this.props;
		 if (children.props.onMouseEnter) {
			 children.props.onMouseEnter();
		 }
		 if (trigger !== 'hover' || !jeasy.trim(content) || this.isShow) {
			 return;
		 }
		 this.handleMouseEnter(event);
	 };

	 onMouseLeave = (event)  => {
		 const { children } = this.props;
		 if (children.props.onMouseLeave) {
			 children.props.onMouseLeave();
		 }
		 this.handleMouseLeave(event);
	 };

	 onMouseClick = (event) => {
		 const { children, trigger, content } = this.props;
		 if (children.props.onClick) {
			 children.props.onClick();
		 }
		 if (trigger !== 'click' || !jeasy.trim(content)) {
			 return
		 }
		 this.handleClick(event);
	 };

	 // 鼠标点击
	 handleClick = (event) => {
		 const { mouseEnterDelay, mouseLeaveDelay, appendToBody } = this.props;
		 if (!this.isShow) {
			 this.isShow = true;
			 targetEle = event.target.parentNode;
			 const id = new Date().getTime().toString();
			 container[id] = document.createElement('div');
			 targetEle.id = id;
			 const viewProps = {
				 ...this.props,
				 targetEle: event.target
			 };
			 setTimeout(() => {
				 const component = <Toolview  { ...viewProps }/>;
				 renderComponentWithPosition(appendToBody, container[id], component, targetEle);
			 }, mouseEnterDelay);
		 } else {
			 this.isShow = false;
			 const { id } = targetEle;
			 setTimeout(() => {
				 destroyDOM(appendToBody, container[id], targetEle);
			 }, mouseLeaveDelay);
		 }
	 };

	 // 鼠标移入
	 handleMouseEnter = (event) => {

		 const { mouseEnterDelay, appendToBody } = this.props;
		 targetEle = event.target.parentNode;
		 const id = new Date().getTime().toString();
		 container[id] = document.createElement('div');
		 targetEle.id = id;
		 const viewProps = {
			 ...this.props,
			 targetEle: event.target
		 };
		 this.isShow = true;
		 setTimeout(() => {
			 const component = <Toolview  { ...viewProps }/>;
			 renderComponentWithPosition(appendToBody, container[id], component, targetEle);
		 }, mouseEnterDelay);
	 };

	 // 鼠标移出
	 handleMouseLeave = () => {
		 const { content } = this.props;
		 if (!jeasy.trim(content)) {
			 return
		 }
		 const { mouseLeaveDelay, appendToBody } = this.props;
		 const { id } = targetEle;
		 this.isShow = false;
		 setTimeout(() => {
			 if (!container[id].hasChildNodes()) {
				 return
			 }
			 destroyDOM(appendToBody, container[id], targetEle);
		 }, mouseLeaveDelay);
	 };


	render() {
		const { children } = this.props;
		const props = {
			...children.props,
			onClick: this.onMouseClick,
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseLeave
		};

		return React.cloneElement(children, props);
	}
 }

export default ToolTip;

ToolTip.propTypes = {
	content: PropTypes.node,
	mouseEnterDelay: PropTypes.number,
	mouseLeaveDelay: PropTypes.number,
	trigger: PropTypes.string,
	placement: PropTypes.oneOf(['auto', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom']),
	theme: PropTypes.string,
	appendToBody: PropTypes.bool
};

ToolTip.defaultProps = {
	content: '',
	mouseEnterDelay: 1,
	mouseLeaveDelay: 1,
	trigger: 'hover',
	placement: 'auto',
	theme: 'dark',
	appendToBody: true
};
