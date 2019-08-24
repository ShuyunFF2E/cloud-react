import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Tips extends Component {

	render() {
		const { msg, type, style } = this.props;

		return (
			<div className={`${type} tips-container`} style={style}>
				<p>{msg}</p>
			</div>
		)
	}
}

Tips.defaultProps = {
	type: 'normal',
	style: {}
};

Tips.propTypes = {
	msg: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	type: PropTypes.oneOf([
		'normal',
		'warning',
		'major'
	]),
	style: PropTypes.object
};

export default Tips;
