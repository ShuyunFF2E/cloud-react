import ReactDOM from 'react-dom';
import { wrapperClass, containerClass } from '../constant';

const container = {};

// 根据实例id创建日历面板弹层
export function createWrapper(id, height) {
	container[id] = document.createElement('div');
	container[id].id = id;
	container[id].className = wrapperClass;
	container[id].style.position = 'absolute';
	container[id].style.left = 0;
	container[id].style.top = '100%';
	container[id].style.marginTop = '-1px';
	container[id].style.width = '100%';
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

export function destroyAllDOM() {
	const ele = document.getElementsByClassName(wrapperClass)[0];
	const containerList = document.getElementsByClassName(containerClass);
	const len = containerList.length;

	for (let i = 0; i < len; i += 1) {
		if (containerList[i].contains(ele)) {
			destroyDOM(ele.id, containerList[i]);
		}
	}
}
