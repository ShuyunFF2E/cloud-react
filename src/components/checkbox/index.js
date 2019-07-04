import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Group from './group';
import CommonCheckbox from './checkbox';

function Checkbox({ indeterminate, ...props }) {

	const ref = useRef(null);

	useEffect(() => {
		ref.current.indeterminate = indeterminate;
	});

	return <CommonCheckbox ref={ref} classSelector='checkbox' {...props} />
}

function Card(props) {

	const { style, width, height, ...other } = props;
	const getPx = px => Number.isNaN(Number(px)) ? px : `${px}px`;
	const styles = { ...style, width: getPx(width), height: getPx(height) };

	return <CommonCheckbox classSelector='checkbox-card' {...other} style={styles}/>
}

Checkbox.propTypes = {
	indeterminate: PropTypes.bool
};

Checkbox.defaultProps = {
	indeterminate: false
};

Card.propTypes = {
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	style: PropTypes.object
};

Card.defaultProps = {
	width: '',
	height: '',
	style: {}
};

Checkbox.Card = Card;
Checkbox.Group = Group;

export default Checkbox;
