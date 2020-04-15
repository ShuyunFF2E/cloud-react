import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop, prefixCls } from '@utils';

import Icon from '../icon';
import './index.less';

class TablePagination extends Component {
	static propTypes = {
		current: PropTypes.number,
		pageSize: PropTypes.number,
		pageSizeOptions: PropTypes.array,
		total: PropTypes.number,
		onChange: PropTypes.func,
		showTotal: PropTypes.bool,
		showRefresh: PropTypes.bool,
		showPageSizeOptions: PropTypes.bool,
		checkedTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element])
	};

	static defaultProps = {
		current: 1,
		pageSize: 10,
		pageSizeOptions: [10, 20, 30, 40],
		total: 0,
		onChange: noop,
		showTotal: false,
		showRefresh: false,
		showPageSizeOptions: false,
		checkedTotal: undefined
	};

	constructor(props) {
		super(props);
		const { current, pageSize, showPageSizeOptions, pageSizeOptions } = props;

		this.state = {
			current,
			pageNum: current
		};

		if (showPageSizeOptions && pageSizeOptions.indexOf(pageSize) === -1) {
			pageSizeOptions.push();
			pageSizeOptions.sort((a, b) => a - b);
			this.state.pageSizeOptions = pageSizeOptions;
		}
	}

	static getDerivedStateFromProps(props, prevState) {
		const newState = {};
		if (props.current !== prevState.current) {
			newState.pageNum = props.current;
			newState.current = props.current;
		}
		return newState;
	}

	get totalPage() {
		const { total } = this.props;
		return Math.ceil(total / this.props.pageSize);
	}

	renderTotal = () => {
		return (
			<span className="total-count">
				共<span>{this.props.total}</span>条
			</span>
		);
	};

	renderRefresh = () => {
		return (
			<div className="refresh-action" onClick={() => this.goPage(this.props.current)}>
				<Icon type="refresh" />
				<span className="refresh-label">刷新</span>
			</div>
		);
	};

	renderPageSizeOptions = () => {
		const { pageSizeOptions } = this.state;
		return (
			<div className="change-size">
				<select name="selectPageSize" value={(this.props.pageSize || pageSizeOptions[0]).toString()} onChange={this.selectPageSize}>
					{pageSizeOptions.map(item => {
						return (
							<option value={item} key={item}>
								{item}
							</option>
						);
					})}
				</select>
			</div>
		);
	};

	renderActionGroup = () => {
		const { pageNum } = this.state;
		const { current } = this.props;

		return (
			<div className="action-group">
				<div className="icon-group">
					<Icon className={current === 1 ? 'disabled' : ''} type="first-solid" onClick={this.firstPage} />
					<Icon className={current === 1 ? 'disabled' : ''} type="left-solid" onClick={this.prevPage} />
				</div>
				<div className="goto-page">
					<input type="text" className="gp-input" value={pageNum} onChange={this.onChange} onKeyPress={this.handlePage} />
					/共<span>{this.totalPage}</span>页
				</div>
				<div className="icon-group">
					<Icon className={current === this.totalPage ? 'disabled' : ''} type="right-solid" onClick={this.nextPage} />
					<Icon className={current === this.totalPage ? 'disabled' : ''} type="last-solid" onClick={this.lastPage} />
				</div>
			</div>
		);
	};

	renderCheckedTotal = () => {
		const { checkedTotal } = this.props;
		if (!checkedTotal) {
			return null;
		}

		if (typeof checkedTotal === 'string' || typeof checkedTotal === 'number') {
			return <div className="checked-info">已选{checkedTotal}条</div>;
		}

		return <div className="checked-info">{checkedTotal}</div>;
	};

	goPage = current => {
		this.props.onChange(current, this.props.pageSize);
	};

	prevPage = () => {
		const { current } = this.props;
		if (current === 1) return;
		this.goPage(current - 1);
	};

	nextPage = () => {
		const { current } = this.props;
		if (current + 1 > this.totalPage) return;
		this.goPage(current + 1);
	};

	firstPage = () => {
		this.goPage(1);
	};

	lastPage = () => {
		this.goPage(this.totalPage);
	};

	handlePage = event => {
		if (event.nativeEvent.keyCode === 13) {
			const { current } = this.props;
			const inputPage = event.target.value;

			if (!/^\d+$/.test(inputPage)) {
				this.setState({
					pageNum: current
				});
				return;
			}

			if ((inputPage < 1 && this.totalPage > 1) || inputPage > this.totalPage) {
				this.setState({
					pageNum: current
				});
				return;
			}

			this.goPage(Number(inputPage));
		}
	};

	onChange = event => {
		this.setState({
			pageNum: event.target.value
		});
	};

	selectPageSize = event => {
		this.props.onChange(1, Number(event.target.value));
	};

	render() {
		const { showTotal, showRefresh, showPageSizeOptions } = this.props;
		const classes = classNames(`${prefixCls}-table-pagination`);

		return (
			<div className={classes}>
				<div className="left-tools">
					{showRefresh ? this.renderRefresh() : null}
					{this.renderCheckedTotal()}
					{showTotal ? this.renderTotal() : null}
				</div>
				<div className="right-pagination-option">
					{this.renderActionGroup()}
					{showPageSizeOptions ? this.renderPageSizeOptions() : null}
				</div>
			</div>
		);
	}
}

export default TablePagination;
