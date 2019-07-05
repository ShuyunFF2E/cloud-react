import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Tips extends Component {

	render() {
		const { msg, type, style } = this.props;

		return (
			<div className={`${type} tips-container`} style={style}>
				<p dangerouslySetInnerHTML={{ __html: msg }}></p>
			</div>
		)
	}
}

Tips.defaultProps = {
	type: 'normal',
	style: {}
};

Tips.propTypes = {
	msg: PropTypes.string.isRequired,
	type: PropTypes.oneOf([
		"normal",
		"warning",
		"major"
	]),
	style: PropTypes.object
};

export default Tips;
