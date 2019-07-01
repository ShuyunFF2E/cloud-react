import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Tips extends React.Component {

	render() {
		const {msg, type, style} = this.props;

		return (
			<div className={`${type} tips-container`} style={style}>
				<p dangerouslySetInnerHTML={{__html: msg}}></p>
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
	type: PropTypes.string,
	style: PropTypes.object
};

export default Tips;
