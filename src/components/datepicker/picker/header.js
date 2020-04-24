import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight } from '../common/arrow';

const Header = props => {
	const { year, onChange } = props;

	return (
		<div className="header">
			<ArrowLeft onClick={onChange} />
			<label>{year}年</label>
			<ArrowRight onClick={onChange} />
		</div>
	);
};

Header.propTypes = {
	year: PropTypes.number,
	onChange: PropTypes.func
};

Header.defaultProps = {
	year: new Date().getFullYear(),
	onChange: () => {}
};

export default Header;
