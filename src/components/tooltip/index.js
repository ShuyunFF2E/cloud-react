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
import { CONFIG_PLACE, CONFIG_THEME }  from './config';

const containers = {};
let targetEle = null;
let manualClear = null;
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
const DEFAULT_STYLE = 'position:absolute;top:0;left:0;width:100%';

const mutationObserver = new MutationObserver(mutations => {
	mutations.forEach(mutation => {
  		if (mutation.type === 'childList' && mutation.removedNodes.length > 0 && mutation.removedNodes[0].outerHTML.indexOf(targetEle.id) > -1) {
   			const ele = containers[targetEle.id];
     		if (ele) {
    			delete containers[targetEle.id];
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
	const container = component.props.container();
	if (container && container instanceof window.HTMLElement) {
		container.appendChild(wrapper);
		ReactDOM.render(component, wrapper);
		if (component.props.clear) {
			manualClear = component.props.clear;
			mutationObserver.observe(document.documentElement, {
				childList: true,
				subtree: true,
			});
		}
	} else {
		console.error('渲染节点不对');
	}
}

/**
 * 销毁DOM跟ReactDom
 * @param id: 容器的ID
 */
function destroyDOM(id, container) {
	if (manualClear) {
		mutationObserver.disconnect();
	}
	const containerDom = container()
	if (containerDom && containerDom instanceof window.HTMLElement) {
		const wrapper = containers[id];
		ReactDOM.unmountComponentAtNode(wrapper);
		containerDom.removeChild(wrapper);
		delete containers[id];
	} else {
	 	console.error('销毁节点不对');
	}
}

/**
 * 生成容器元素
 * @param id: 容器的ID
 * @param event: 当前触发的元素
 */
function createWrapper(id, event) {
	targetEle = event.parentNode || event.target.parentNode;
	targetEle.classList.add(id);
	const div = document.createElement('div');
	div.style.cssText = DEFAULT_STYLE;
	containers[id] = div;
}

/**
 * 获取销毁div的className
 * @param classNames: 触发元素的classList
 * @returns {string}: 元素的类名
 */
function getClassName(classNames) {
	let tagClassName = '';
	const findClassName = className => {
		return className.indexOf('tooltip-') > -1
	}
	// 转成一般数组
	const classNamesArr = [...classNames];
	tagClassName = classNamesArr.find(findClassName);

	return tagClassName;
}

class Tooltip extends Component{

	 constructor(props) {
	 	super(props);
	 	this.isShow = false;
	 }

	componentDidMount() {
	 	if (typeof this.props.visible === 'boolean' && this.props.visible) {
			// eslint-disable-next-line react/no-find-dom-node
			this.handleMouseEnter(ReactDOM.findDOMNode(this.triggerDom));
		}
	}

	 // 显示、关闭tooltip
	 componentDidUpdate() {
		const { visible } = this.props;
		if (this.isShow) {
			const id = getClassName(this.triggerDom.parentNode.classList);
			this.handleMouseLeave(id);
		}
		if (!this.props.content) {
			return;
		}
	 	if (typeof visible === 'boolean' && visible) {
			this.handleMouseEnter(this.triggerDom);
		} else {
	 		const id = getClassName(this.triggerDom.parentNode.classList);
			this.handleMouseLeave(id);
		}
	 }

	 // 不影响其他组件的事件
	 onMouseEnter = event => {
		 const { children, trigger, content, visible } = this.props;
		 if (children.props.onMouseEnter) {
			 children.props.onMouseEnter();
		 }
		 if (trigger !== 'hover' || !content || this.isShow || typeof visible === 'boolean') {
			 return;
		 }
		 this.handleMouseEnter(event);
	 };

	 onMouseLeave = ()  => {
		 const { children, visible } = this.props;
		 if (children.props.onMouseLeave) {
			 children.props.onMouseLeave();
		 }
		 if (typeof visible === 'boolean') {
			 return;
		 }
		 this.handleMouseLeave();
	 };

	 onMouseClick = event => {
		 const { children, trigger, content, visible } = this.props;
		 if (children.props.onClick) {
			 children.props.onClick();
		 }
		 if (trigger !== 'click' || !content || typeof visible === 'boolean') {
			 return
		 }
		 this.handleClick(event);
	 };

	 // 鼠标点击
	 handleClick = event => {
		 const { mouseEnterDelay, mouseLeaveDelay, container } = this.props;
		 if (!this.isShow) {
			 const id = `tooltip-${new Date().getTime().toString()}`;
			 this.isShow = true;
		     createWrapper(id, event);
			 const viewProps = {
				 ...this.props,
				 targetEle: event.target
			 };
			 setTimeout(() => {
				 const component = <ToolView  { ...viewProps }/>;
				 renderComponentWithPosition(containers[id], component);
			 }, mouseEnterDelay);
		 } else {
			 this.isShow = false;
			 const id  = getClassName(targetEle.classList);
			 setTimeout(() => {
				 destroyDOM(id, container);
				 targetEle.classList.remove(id);
			 }, mouseLeaveDelay);
		 }
	 };

	 // 鼠标移入
	 handleMouseEnter = event => {
		 const { mouseEnterDelay, visible } = this.props;
		 const id = `tooltip-${new Date().getTime().toString()}`;
		 createWrapper(id, event);
		 this.isShow = true;
		 const viewProps = {
			 ...this.props,
			 targetEle: typeof visible === 'boolean' ? event : event.target
		 };
		 setTimeout(() => {
			 const component = <ToolView  { ...viewProps }/>;
			 renderComponentWithPosition(containers[id], component);
		 }, mouseEnterDelay);
	 };

	 // 鼠标移出
	 handleMouseLeave = deletId => {
		 if (!this.isShow) {
			 return
		 }
		 const { mouseLeaveDelay, container } = this.props;
		 const id  = deletId || getClassName(targetEle.classList);
		 this.isShow = false;
		 setTimeout(() => {
			 destroyDOM(id, container);
			 targetEle.classList.remove(id);
		 }, mouseLeaveDelay);
	 };

	render() {
		const { children } = this.props;
		const props = {
			...children.props,
			onClick: this.onMouseClick,
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseLeave,
			ref: el => {this.triggerDom = el}
		};
		return React.cloneElement(children, props);
	}
 }

Tooltip.propTypes = {
	content: PropTypes.node,
	mouseEnterDelay: PropTypes.number,
	mouseLeaveDelay: PropTypes.number,
	trigger: PropTypes.string,
	visible: PropTypes.bool,
	clear: PropTypes.bool,
	placement: PropTypes.oneOf([CONFIG_PLACE.auto, CONFIG_PLACE.top, `${CONFIG_PLACE.top}-${CONFIG_PLACE.left}`, `${CONFIG_PLACE.top}-${CONFIG_PLACE.right}`,
								CONFIG_PLACE.bottom, `${CONFIG_PLACE.bottom}-${CONFIG_PLACE.left}`, `${CONFIG_PLACE.bottom}-${CONFIG_PLACE.right}`,
								CONFIG_PLACE.left, `${CONFIG_PLACE.left}-${CONFIG_PLACE.top}`, `${CONFIG_PLACE.left}-${CONFIG_PLACE.bottom}`,
								CONFIG_PLACE.right, `${CONFIG_PLACE.right}-${CONFIG_PLACE.top}`, `${CONFIG_PLACE.right}-${CONFIG_PLACE.bottom}`]),
	theme: PropTypes.oneOf([CONFIG_THEME.dark, CONFIG_THEME.light, CONFIG_THEME.error]),
	container: PropTypes.func
};

Tooltip.defaultProps = {
	content: '',
	mouseEnterDelay: 1,
	mouseLeaveDelay: 1,
	trigger: 'hover',
	visible: undefined,
	clear: false,
	placement: CONFIG_PLACE.auto,
	theme: CONFIG_THEME.dark,
	container: () => document.body
};

export default Tooltip;
