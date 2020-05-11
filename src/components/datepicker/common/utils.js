import ReactDOM from 'react-dom';
import { enumObj, containerClass } from '../constant';

const container = {};

// 根据实例id创建日历面板弹层
export function createWrapper(id) {
	container[id] = document.createElement('div');
	container[id].id = id;
	container[id].className = containerClass;
	container[id].style.position = 'absolute';
	container[id].style.left = 0;
	container[id].style.top = 0;
	container[id].style.width = '100%';
}
// 渲染DOM
export function renderDOM(id, component) {
	const wrapper = container[id];
	document.body.appendChild(wrapper);
	ReactDOM.render(component, wrapper);
}
// 释放DOM
export function destroyDOM(id, callback) {
	const wrapper = container[id];
	if (wrapper) {
		ReactDOM.unmountComponentAtNode(wrapper);
		document.body.removeChild(wrapper);
		delete container[id];
	}
	if (callback) {
		callback();
	}
}

export function destroyAllDOM() {
	const dpArr = document.getElementsByClassName(containerClass);
	const len = dpArr.length;
	for (let i = 0; i < len; ) {
		destroyDOM(dpArr[i].id);
		i += 1;
	}
}

// 根据位置计算坐标
export function getPositionByComp({ left, bottom, top }, position, HEIGHT) {
	let _top = 0;
	const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

	switch (position) {
		case enumObj.AUTO:
			_top = document.body.clientHeight - bottom > HEIGHT ? bottom + scrollTop : top + scrollTop - HEIGHT;
			break;
		case enumObj.UP:
			_top = top + scrollTop - HEIGHT;
			break;
		case enumObj.DOWN:
		default:
			_top = bottom + scrollTop;
			break;
	}

	return {
		left,
		top: _top
	};
}
