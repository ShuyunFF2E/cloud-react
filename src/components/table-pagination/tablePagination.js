import React, { Component } from "react";
import Icon from "ccms-components-react/icon";
import "./index.less";

function calculatePage(p, state, props) {
	let pageSize = p;
	const { pageSize: statePageSize } = state;
	if (typeof pageSize === "undefined") {
		pageSize = statePageSize;
	}
	return Math.floor((props.total - 1) / pageSize) + 1;
}

export default class TablePagination extends Component {
	constructor(props) {
		super(props);
		const {
			current,
			pageSize,
			defaultCurrent,
			defaultPageSize,
			showPageSizeOptions,
			pageSizeOptions
		} = props;

		this.state = {
			current: current === undefined ? defaultCurrent : current,
			inputNum: current === undefined ? defaultCurrent : current,
			pageSize: pageSize === undefined ? defaultPageSize : pageSize
		};

		if (showPageSizeOptions) {
			if (
				pageSize !== undefined &&
				pageSizeOptions.indexOf(pageSize) === -1
			) {
				pageSizeOptions.push(pageSize);
				pageSizeOptions.sort((a, b) => a - b);
			}
			this.state.pageSizeOptions = pageSizeOptions;
		}
	}

	static getDerivedStateFromProps(props, prevState) {
		const newState = {};
		if (
			props.current !== undefined &&
			props.current !== prevState.current
		) {
			newState.current = props.current;
			newState.inputNum = props.current;
		}

		if (
			props.pageSize !== undefined &&
			props.pageSize !== prevState.pageSize
		) {
			const { current } = prevState;
			const newCurrent = calculatePage(props.pageSize, prevState, props);
			newState.current = current > newCurrent ? newCurrent : current;
			newState.pageSize = props.pageSize;
		}

		return newState;
	}

	get totalPage() {
		const { total } = this.props;
		return Math.ceil(total / this.state.pageSize);
	}

	renderTotal = () => {
		return (
			<span className="totals-count">
				共<span>{this.props.total}</span>条
			</span>
		);
	};

	renderRefresh = () => {
		return (
			<span className="refresh-action">
				<Icon className="shuyunicon" type="refresh"></Icon>
				<span
					className="refresh-label"
					onClick={() => this.goPage(this.state.current)}
				>
					刷新
				</span>
			</span>
		);
	};

	renderPageSizeOptions = () => {
		const { showPageSizeOptions, pageSize } = this.props;
		const { pageSizeOptions } = this.state;

		if (showPageSizeOptions) {
			return (
				<div className="change-size">
					<select
						name="pSizeArea"
						value={(pageSize || pageSizeOptions[0]).toString()}
						onChange={this.selectPageSize}
					>
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
		}
		return null;
	};

	goPage = current => {
		if (this.props.current === undefined) {
			this.setState({
				current,
				inputNum: current
			});
		}
		this.props.onChange(current, this.state.pageSize);
	};

	prevPage = () => {
		let { current } = this.state;
		if (current - 1 === 0) {
			return;
		}
		this.goPage((current -= 1));
	};

	nextPage = () => {
		let { current } = this.state;
		if (current + 1 > this.totalPage) {
			return;
		}
		this.goPage((current += 1));
	};

	firstPage = () => {
		this.goPage(1);
	};

	lastPage = () => {
		this.goPage(this.totalPage);
	};

	handlePage = event => {
		if (event.nativeEvent.keyCode === 13) {
			const { current } = this.state;
			let inputPage = event.target.value;

			if (!/^\d+$/.test(inputPage)) {
				this.setState({
					inputNum: current
				});
				return;
			}

			inputPage = parseInt(inputPage, 10);
			if (inputPage < 1 && this.totalPage > 1) {
				this.setState({
					current: 1,
					inputNum: 1
				});
				return;
			}
			if (inputPage > this.totalPage) {
				this.setState({
					current: this.totalPage,
					inputNum: this.totalPage
				});
				return;
			}
			this.goPage(inputPage);
		}
	};

	onChange = event => {
		this.setState({
			inputNum: event.target.value
		});
	};

	selectPageSize = event => {
		if (this.props.pageSize === undefined) {
			this.setState(
				{
					pageSize: parseInt(event.target.value, 10),
					current: 1,
					inputNum: 1
				},
				() => {
					this.props.onShowSizeChange(1, this.state.pageSize);
				}
			);
		} else {
			this.props.onShowSizeChange(1, parseInt(event.target.value, 10));
		}
	};

	render() {
		const { current, inputNum } = this.state;

		const { showTotal, showRefresh, showPageSizeOptions } = this.props;
		return (
			<div className="table-pagination">
				{showTotal ? this.renderTotal() : null}
				{showRefresh ? this.renderRefresh() : null}
				<div className="ajax-page">
					<div className="page-group">
						<div
							className={
								current === this.totalPage ? "disabled" : ""
							}
						>
							<Icon
								className="shuyunicon"
								type="right-solid"
								onClick={this.nextPage}
							></Icon>
						</div>
						<div
							className={
								current === this.totalPage ? "disabled" : ""
							}
						>
							<Icon
								className="shuyunicon"
								type="last-solid"
								onClick={this.lastPage}
							></Icon>
						</div>
					</div>
					<div className="goto-page">
						<input
							type="text"
							className="gp-input"
							value={inputNum}
							onChange={this.onChange}
							onKeyPress={this.handlePage}
						/>
						/共<span>{this.totalPage}</span>页
					</div>
					<div className="page-group">
						<div className={current === 1 ? "disabled" : ""}>
							<Icon
								className="shuyunicon"
								type="first-solid"
								onClick={this.firstPage}
							></Icon>
						</div>
						<div className={current === 1 ? "disabled" : ""}>
							<Icon
								className="shuyunicon"
								type="left-solid"
								onClick={this.prevPage}
							></Icon>
						</div>
					</div>
				</div>
				{showPageSizeOptions ? this.renderPageSizeOptions() : null}
			</div>
		);
	}
}
