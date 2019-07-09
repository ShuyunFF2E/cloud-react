import React from 'react';
import PropTypes from 'prop-types';

import NowVersion from './version/now';
import PastVersion from './version/past';

const noop = () => {};

class Pagination extends React.Component {

	static propTypes = {
		version: PropTypes.string,
		current: PropTypes.number,
		pageSize: PropTypes.number,
		disabled: PropTypes.bool,
		pageSizeOptions: PropTypes.array,
		total: PropTypes.number,
		onChange: PropTypes.func,
		onShowSizeChange: PropTypes.func,
		showTotal: PropTypes.bool,
		showRefresh: PropTypes.bool,
		showPageSizeOptions: PropTypes.bool,
		showQuickJumper: PropTypes.bool
	};

	static defaultProps = {
		version: 'now',
		current: 1,
		pageSize: 10,
		disabled: false,
		pageSizeOptions: [10, 20, 30, 40],
		total: 0,
		onChange: noop,
		onShowSizeChange: noop,
		showTotal: true,
		showRefresh: true,
		showPageSizeOptions: false,
		showQuickJumper: false
	};

	render() {
		return (
			this.props.version === 'now' ? <NowVersion {...this.props} /> : <PastVersion {...this.props} />
		);
	}
}

export default Pagination;
