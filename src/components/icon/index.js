import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

class Icon extends Component {
	render () {
		const { type, style, className, ...restProps } = this.props;
		return <i className={classNames(className, `cloud-icon cloud-icon-${type}`)} style={style} {...restProps} />;
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
