import ReactDOM from 'react-dom';
import { wrapperClass, POPUP_WIDTH } from '../constant';

const container = {};

// 根据实例id创建日历面板弹层
export function createWrapper(id, height, style) {
	const { top, marginTop, left, right } = style;
	container[id] = document.createElement('div');
	container[id].id = id;
	container[id].className = wrapperClass;
	container[id].style.position = 'absolute';
	container[id].style.left = left;
	container[id].style.right = right;
	container[id].style.top = top || '100%';
	container[id].style.marginTop = marginTop || '-1px';
	container[id].style.width = `${POPUP_WIDTH}px`;
	container[id].style.height = `${height}px`;
}

// 渲染DOM
export function renderDOM(id, containerEle, component) {
	const wrapper = container[id];
	containerEle.appendChild(wrapper);
	ReactDOM.render(component, wrapper);
}

// 释放DOM
export function destroyDOM(id, containerEle, callback) {
	const wrapper = container[id];
	if (wrapper) {
		ReactDOM.unmountComponentAtNode(wrapper);
		containerEle.removeChild(wrapper);
		delete container[id];
	}
	if (callback) {
		callback();
	}
}
