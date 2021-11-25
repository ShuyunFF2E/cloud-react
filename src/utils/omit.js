const omit = (props, omitFields) => Object.keys(props).reduce((acc, key) => {
		if (!omitFields.includes(key)) {
			acc[key] = props[key];
		}
		return acc;
	}, {});

export default omit;
