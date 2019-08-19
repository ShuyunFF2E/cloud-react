/**
 * index.js
 * runnan
 * 2019-6-28
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.less';
import ToolView from './toolView';

const container = {};
let targetEle = null;
let manualClear = null;
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

const mutationObserver = new MutationObserver(mutations => {
	mutations.forEach(mutation => {
  		if (mutation.type === 'childList' && mutation.removedNodes.length > 0 && mutation.removedNodes[0].innerHTML.indexOf(targetEle.id) > -1) {
   			const ele = container[targetEle.id];
     		if (ele) {
    			delete container[targetEle.id];
    			document.body.removeChild(ele);
   			}
  		}
 	});
});
/**
 * 渲染到节点
 * @param wrapper: 容器
 * @param component: 组件
 */
function renderComponentWithPosition(wrapper, component) {
	document.body.appendChild(wrapper);
	ReactDOM.render(component, wrapper);
	if (component.props.clear) {
		manualClear = component.props.clear;
		mutationObserver.observe(document.documentElement, {
		 	childList: true,
		 	subtree: true,
		});
	}
}

/**
 * 销毁DOM跟ReactDom
 * @param id: 容器的ID
 */
function destroyDOM(id) {
	if (manualClear) {
		mutationObserver.disconnect();
	}
	const wrapper = container[id];
	ReactDOM.unmountComponentAtNode(wrapper);
	document.body.removeChild(wrapper);
	delete container[id];
}

/**
 * 生成容器元素
 * @param id: 容器的ID
 * @param event: 当前触发的元素
 */
function createWrapper(id, event) {
	targetEle = event.target.parentNode;
	container[id] = document.createElement('div');
	targetEle.id = id;
}

class ToolTip extends Component{

	 constructor(props) {
	 	super(props);
	 	this.isShow = false;
	 }

	 // 不影响其他组件的事件
	 onMouseEnter = event => {
		 const { children, trigger, content } = this.props;
		 if (children.props.onMouseEnter) {
			 children.props.onMouseEnter();
		 }
		 if (trigger !== 'hover' || !content || this.isShow) {
			 return;
		 }
		 this.handleMouseEnter(event);
	 };

	 onMouseLeave = event  => {
		 const { children } = this.props;
		 if (children.props.onMouseLeave) {
			 children.props.onMouseLeave();
		 }
		 this.handleMouseLeave(event);
	 };

	 onMouseClick = event => {
		 const { children, trigger, content } = this.props;
		 if (children.props.onClick) {
			 children.props.onClick();
		 }
		 if (trigger !== 'click' || !content) {
			 return
		 }
		 this.handleClick(event);
	 };

	 // 鼠标点击
	 handleClick = event => {
		 const { mouseEnterDelay, mouseLeaveDelay } = this.props;
		 if (!this.isShow) {
			 const id = new Date().getTime().toString();
			 this.isShow = true;
		     createWrapper(id, event);
			 const viewProps = {
				 ...this.props,
				 targetEle: event.target
			 };
			 setTimeout(() => {
				 const component = <ToolView  { ...viewProps }/>;
				 renderComponentWithPosition(container[id], component);
			 }, mouseEnterDelay);
		 } else {
			 this.isShow = false;
			 const { id } = targetEle;
			 setTimeout(() => {
				 destroyDOM(id);
			 }, mouseLeaveDelay);
		 }
	 };

	 // 鼠标移入
	 handleMouseEnter = event => {
		 const { mouseEnterDelay } = this.props;
		 const id = new Date().getTime().toString();
		 createWrapper(id, event);
		 this.isShow = true;
		 const viewProps = {
			 ...this.props,
			 targetEle: event.target
		 };
		 setTimeout(() => {
			 const component = <ToolView  { ...viewProps }/>;
			 renderComponentWithPosition(container[id], component);
		 }, mouseEnterDelay);
	 };

	 // 鼠标移出
	 handleMouseLeave = () => {
		 const { content } = this.props;
		 if (!content || !this.isShow) {
			 return
		 }
		 const { mouseLeaveDelay } = this.props;
		 const { id } = targetEle;
		 this.isShow = false;
		 setTimeout(() => {
			 destroyDOM(id);
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

ToolTip.propTypes = {
	content: PropTypes.node,
	mouseEnterDelay: PropTypes.number,
	mouseLeaveDelay: PropTypes.number,
	trigger: PropTypes.string,
	clear: PropTypes.bool,
	placement: PropTypes.oneOf(['auto', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom']),
	theme: PropTypes.oneOf(['dark', 'light', 'error'])
};

ToolTip.defaultProps = {
	content: '',
	mouseEnterDelay: 1,
	mouseLeaveDelay: 1,
	trigger: 'hover',
	clear: false,
	placement: 'auto',
	theme: 'dark'
};

export default ToolTip;
