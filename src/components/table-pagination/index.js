import React, { Component } from "react";
import PropTypes from "prop-types";

import TablePagination from "./tablePagination";

const noop = () => {};

class Pagination extends Component {
	static propTypes = {
		current: PropTypes.number,
		pageSize: PropTypes.number,
		defaultCurrent: PropTypes.number,
		defaultPageSize: PropTypes.number,
		pageSizeOptions: PropTypes.array,
		total: PropTypes.number,
		onChange: PropTypes.func,
		onShowSizeChange: PropTypes.func,
		showTotal: PropTypes.bool,
		showRefresh: PropTypes.bool,
		showPageSizeOptions: PropTypes.bool
	};

	static defaultProps = {
		current: undefined,
		pageSize: undefined,
		defaultCurrent: 1,
		defaultPageSize: 10,
		pageSizeOptions: [10, 20, 30, 40],
		total: 0,
		onChange: noop,
		onShowSizeChange: noop,
		showTotal: false,
		showRefresh: false,
		showPageSizeOptions: false
	};

	render() {
		return <TablePagination {...this.props} />;
	}
}

export default Pagination;
