import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'cloud-react/icon';
import enumObj from '../util/enum';

const defaultYear = new Date().getFullYear();

function Header(props) {
	const { year, onChange } = props;

	function onArrowChange(params) {
		onChange(params);
	}

	return (
		<div className="header">
			<span className="arrow-left" onClick={() => onArrowChange(enumObj.LEFT)}>
				<Icon type="left" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
			</span>
			<label>{year}年</label>
			<span className="arrow-right" onClick={() => onArrowChange(enumObj.RIGHT)}>
				<Icon type="right" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
			</span>
		</div>
	);
}

Header.propTypes = {
	year: PropTypes.number,
	onChange: PropTypes.func
};

Header.defaultProps = {
	year: defaultYear,
	onChange: () => {}
};

export default Header;
