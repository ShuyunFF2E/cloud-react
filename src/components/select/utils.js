import jeasy from 'jeasy';
import { Children } from 'react';

// 将组件children转换成带label|value的对象数组
export const formatOptionSource = (data) => {
	const result = [];
	if (jeasy.type(data) === 'object') {
		result.push({
			label: data.children,
			value: data.value
		});
	}
	return result;
}

export const filterOptions = (options, filter) => {
	const result = [];
	Children.forEach(options, child => {
		const { value: childValue, children } = child.props;
		const value = typeof childValue === 'number' ? String(childValue) : childValue;
		if (value.indexOf(filter) > -1 || children.indexOf(filter) > -1) result.push(child);
	})
	return result;
}
