import { Children } from 'react';

export const LAYOUT_TYPES = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
	INLINE: 'inline'
};

export const LABEL_ALIGN = {
	LEFT: 'left',
	RIGHT: 'right'
};

export const DATA_FIELD = 'data-field';

export const findFieldsName = (children = []) => {
	const result = [];

	Children.toArray(children).forEach(child => {
		const { props } = child;

		if (props) {
			if (props[DATA_FIELD]) {
				result.push(props[DATA_FIELD]);
			} else if (props.children && Children.count(props.children || [])) {
				result.push(...findFieldsName(props.children));
			}
		}
	});

	return result;
};

export const getNamesByNode = parentNode => {
	const children = parentNode.querySelectorAll(`[${DATA_FIELD}]`);

	return [...children].map(child => child.getAttribute(DATA_FIELD));
};

export const findDestroyedFields = (prevNames, names) => {
	return prevNames.reduce((acc, n) => {
		if (!names.includes(n)) acc.push(n);

		return acc;
	}, []);
};

export const getParentFormClassName = (ele, className) => {
	if (!ele) return null;

	if (ele.classList.contains(className)) {
		return ele;
	}

	return getParentFormClassName(ele.parentNode, className);
};
