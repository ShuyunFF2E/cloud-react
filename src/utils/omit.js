const omit = (props, omitFields) => {
	return Object.keys(props).reduce((acc, key) => {
		if (!omitFields.includes(key)) {
			acc[key] = props[key];
		}
		return acc;
	}, {});
};

export default omit;
