import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Icon extends Component {
	render () {
		const { type, style, ...restProps } = this.props;
		const className = `shuyunicon icon-${type}`;
		return <i className={className} style={style} {...restProps} />;
	}
}
Icon.propTypes = {
	type: PropTypes.string.isRequired,
	style: PropTypes.object
};

Icon.defaultProps = {
	style: {}
};

export default Icon;
