import ReactDOM from 'react-dom';

const container = {};

export function createWrapper(id) {
	container[id] = document.createElement('div');
	container[id].style.position = 'absolute';
	container[id].style.left = 0;
	container[id].style.top = 0;
	container[id].style.width = '100%';
}

export function renderDOM(id, component) {
	const wrapper = container[id];
	document.body.appendChild(wrapper);
	ReactDOM.render(component, wrapper);
}

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

export function isVaild(value) {
	return value !== undefined && value !== null;
}

export const selector = 'datepicker';
export const timeSelector = 'timepicker';
export const rangeSelector = 'rangepicker';

export const datepickerUI = {
	// 年月日视图
	HEIGHT_DEFAULT: 292,
	// 年月日时分秒视图
	HEIGHT_TIME: 354,
	// 年视图
	HEIGHT_YEAR: 264,
	// 月视图
	HEIGHT_MONTH: 227,
	// 月日视图
	HEIGHT_MONTH_DAY: 292
};

export function formatZero(value) {
	return parseInt(value, 10) < 10 ? `0${parseInt(value, 10)}` : value;
}

export function getWinHeight() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
