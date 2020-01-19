import jeasy from 'jeasy';

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
	return options.reduce((acc, child) => {
		const { value: childValue, children } = child.props;
		const value = typeof childValue === 'number' ? String(childValue) : childValue;
		const label = Array.isArray(children) ? children.find(v => typeof v === 'string') : children;
		if (value === null || value === undefined) {
			if (!filter) acc.push(child);
		} else if (value.indexOf(filter) > -1 || label.indexOf(filter) > -1) {
			acc.push(child);
		}
		return acc;
	}, []);
}
