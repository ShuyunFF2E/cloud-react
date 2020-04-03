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
