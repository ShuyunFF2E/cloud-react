import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ToolView from './toolView';
import { CONFIG_PLACE, CONFIG_THEME }  from './config';
import './index.less';

const containers = {};
let targetEle = null;
let manualClear = null;
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
const DEFAULT_STYLE = 'position:absolute;top:0;left:0;width:100%';

/**
 * 获取销毁div的className
 * @param classNames: 触发元素的classList
 * @returns {string}: 元素的类名
 */
function getClassName(classNames) {
	const findClassName = className => {
		return className.indexOf('tooltip-') > -1
	}
	// 转成一般数组
	const classNamesArr = [...classNames];
	const tagClassName = classNamesArr.find(findClassName);

	return tagClassName;
}

const mutationObserver = new MutationObserver(mutations => {
	mutations.forEach(mutation => {
		const targetClassName = getClassName(targetEle.classList);
  		if (mutation.type === 'childList' && mutation.removedNodes.length > 0 && mutation.removedNodes[0].outerHTML && mutation.removedNodes[0].outerHTML.indexOf(targetClassName) > -1) {
   			const ele = containers[targetClassName];
			if (ele) {
    			delete containers[targetClassName];
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
function createWrapper(id, targetDom) {
	targetEle = targetDom;
	targetEle.classList.add(id);
	const div = document.createElement('div');
	div.style.cssText = DEFAULT_STYLE;
	containers[id] = div;
}


class Tooltip extends Component{

	constructor(props) {
		super(props);
		this.isShow = false;
		this.currentEle = null;
	}

	getChildren() {
		const { children } = this.props;
		const __children = createElement('span', null, [children]);
		return __children;
	}

	componentDidMount() {
		if (this.props.visible && typeof this.props.visible === 'boolean' ) {
			// eslint-disable-next-line react/no-find-dom-node
			this.handleMouseEnter(ReactDOM.findDOMNode(this.triggerDom));
		}
	}

	 // 显示、关闭tooltip
	componentDidUpdate() {
		const { visible } = this.props;
		targetEle = typeof visible === 'boolean' ? this.triggerDom.parentElement : targetEle;
		const element = this.triggerDom;
		if (this.isShow && element instanceof window.HTMLElement) {
			this.handleMouseLeave();
			return;
		}
		if (!this.props.content) {
			return;
		}
		if (typeof visible === 'boolean' && visible) {
			this.handleMouseEnter(this.triggerDom);
		} else if (element instanceof window.HTMLElement) {
			this.handleMouseLeave();
		}
	}

	 // 鼠标点击
	handleClick = event => {
		const { mouseEnterDelay, mouseLeaveDelay, container, trigger, content } = this.props;
		if (trigger !== 'click' || !content || typeof visible === 'boolean') {
			return
		}
		if (!this.isShow) {
			const id = `tooltip-${new Date().getTime().toString()}`;
			this.isShow = true;
			createWrapper(id, targetEle);
			const viewProps = {
				...this.props,
				targetEle: event.target
			};
			this.currentEle = targetEle;
			setTimeout(() => {
				const component = <ToolView  {...viewProps} />;
				renderComponentWithPosition(containers[id], component);
			}, mouseEnterDelay);
		} else {
			this.isShow = false;
			const id = getClassName(this.currentEle.classList);
			setTimeout(() => {
				destroyDOM(id, container);
				this.currentEle.classList.remove(id);
			}, mouseLeaveDelay);
		}
	};

	 // 鼠标移入
	 handleMouseEnter = event => {
		 const { mouseEnterDelay, visible, content, trigger } = this.props;
		 if (trigger !== 'hover' || !content || this.isShow || visible === false) {
			 return;
		 }
		 const id = `tooltip-${new Date().getTime().toString()}`;
		 createWrapper(id, this.triggerDom);
		 this.isShow = true;
		 // eslint-disable-next-line react/no-find-dom-node
		 const dom = ReactDOM.findDOMNode(this.triggerDom);
		 const viewProps = {
			 ...this.props,
			 targetEle: typeof visible === 'boolean' ? event.children[0] : dom.children[0]
		 };
		 this.currentEle = targetEle;
		 setTimeout(() => {
			 const component = <ToolView  { ...viewProps }/>;
			 renderComponentWithPosition(containers[id], component)
		 }, mouseEnterDelay);
	 };

	 // 鼠标移出
	 handleMouseLeave = () => {
		 const { mouseLeaveDelay, container, visible } = this.props;
		 if (!this.isShow || visible) {
			 return
		 }
		const id  = getClassName(this.currentEle.classList);
		this.isShow = false;
		setTimeout(() => {
			destroyDOM(id, container);
			this.currentEle.classList.remove(id);
		 }, mouseLeaveDelay);
	 };

	render() {
		let { children } = this.props;
		if (typeof children === 'string') {
			children = this.getChildren(children);
		}
		return (
			<div style={{ display: 'contents' }}
				 onClick={this.handleClick}
				 onMouseEnter={this.handleMouseEnter}
				 onMouseLeave={this.handleMouseLeave}
				 ref={el => {this.triggerDom = el}}>
				{ children }
			</div>
		)
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
