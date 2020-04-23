const omit = (props, omitFields) => {
	return Object.fromEntries(Object.entries(props).filter(item => omitFields.indexOf(item[0]) === -1));
};

export default omit;
