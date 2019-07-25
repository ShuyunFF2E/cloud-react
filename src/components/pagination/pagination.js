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

export default class PaginationItem extends Component {
	constructor(props) {
		super(props);

		const {
			pageSize,
			current,
			defaultCurrent,
			defaultPageSize,
			showPageSizeOptions,
			pageSizeOptions
		} = props;

		this.state = {
			current: current === undefined ? defaultCurrent : current,
			inputNum: current === undefined ? defaultCurrent : current,
			pagesLength: 9,
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

	/**
	 * 分页总数小于10
	 */
	renderLowerPagesLength = (current, pages) => {
		for (let i = 1; i <= this.totalPage; i += 1) {
			pages.push(
				<li
					role="presentation"
					onClick={() => this.goPage(i)}
					className={current === i ? "active" : ""}
					key={i}
				>
					{i}
				</li>
			);
		}
	};

	/**
	 * 右边显示。。。
	 */
	renderRightEllipsePages = (offset, pages, current) => {
		for (let i = 1; i <= offset + 1; i += 1) {
			pages.push(
				<li
					role="presentation"
					key={i}
					className={current === i ? "active" : ""}
					onClick={() => this.goPage(i)}
				>
					{i}
				</li>
			);
		}

		pages.push(
			<li key="nextMore" className="ellips">
				<span className="dot"></span>
				<Icon
					type="doubleRight"
					className="moreIcon"
					onClick={this.nextMore}
				></Icon>
			</li>
		);
		pages.push(
			<li
				role="presentation"
				key={this.totalPage}
				className={current === this.totalPage ? "active" : ""}
				onClick={() => this.goPage(this.totalPage)}
			>
				{this.totalPage}
			</li>
		);
	};

	/**
	 * 左边显示。。。
	 */
	renderLeftEllipsePages = (offset, pages, current) => {
		pages.push(
			<li
				role="presentation"
				key="1"
				className={current === 1 ? " active" : ""}
				onClick={() => this.goPage(1)}
			>
				1
			</li>
		);
		pages.push(
			<li key="preMore" className="ellips">
				<span className="dot"></span>
				<Icon
					type="doubleLeft"
					className="moreIcon"
					onClick={this.preMore}
				></Icon>
			</li>
		);

		for (let i = offset; i >= 1; i -= 1) {
			pages.push(
				<li
					role="presentation"
					key={this.totalPage - i}
					className={current === this.totalPage - i ? " active" : ""}
					onClick={() => this.goPage(this.totalPage - i)}
				>
					{this.totalPage - i}
				</li>
			);
		}

		pages.push(
			<li
				role="presentation"
				key={this.totalPage}
				className={current === this.totalPage ? " active" : ""}
				onClick={() => this.goPage(this.totalPage)}
			>
				{this.totalPage}
			</li>
		);
	};

	/**
	 * 左右两侧都显示。。。
	 */
	renderBothEllipsePages = (offset, pages, current) => {
		pages.push(
			<li
				role="presentation"
				key="1"
				className={current === 1 ? " active" : ""}
				onClick={() => this.goPage(1)}
			>
				1
			</li>
		);
		pages.push(
			<li key="preMore" className="ellips">
				<span className="dot"></span>
				<Icon
					type="doubleLeft"
					className="moreIcon"
					onClick={this.preMore}
				></Icon>
			</li>
		);

		for (let i = offset / 2; i >= 0; i -= 1) {
			pages.push(
				<li
					role="presentation"
					key={current - i}
					className={current === current - i ? " active" : ""}
					onClick={() => this.goPage(current - i)}
				>
					{current - i}
				</li>
			);
		}

		for (let j = 1; j <= offset / 2; j += 1) {
			pages.push(
				<li
					role="presentation"
					key={current + j}
					className={current === current + j ? " active" : ""}
					onClick={() => this.goPage(current + j)}
				>
					{current + j}
				</li>
			);
		}

		pages.push(
			<li key="nextMore" className="ellips">
				<span className="dot"></span>
				<Icon
					type="doubleRight"
					className="moreIcon"
					onClick={this.nextMore}
				></Icon>
			</li>
		);
		pages.push(
			<li
				role="presentation"
				key={this.totalPage}
				className={current === this.totalPage ? "active" : ""}
				onClick={() => this.goPage(this.totalPage)}
			>
				{this.totalPage}
			</li>
		);
	};

	/**
	 * 分页总数大于10
	 */
	renderUpperPagesLength = (offset, pages, current) => {
		if (current <= offset) {
			this.renderRightEllipsePages(offset, pages, current);
		} else if (current > this.totalPage - offset) {
			this.renderLeftEllipsePages(offset, pages, current);
		} else {
			this.renderBothEllipsePages(offset, pages, current);
		}
	};

	getPages = () => {
		const { current, pagesLength } = this.state;
		const pages = [];

		if (this.totalPage <= pagesLength) {
			this.renderLowerPagesLength(current, pages);
		} else {
			const offset = (pagesLength - 1) / 2;
			this.renderUpperPagesLength(offset, pages, current);
		}
		return pages;
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
		if (current === 1) return;
		this.goPage((current -= 1));
	};

	nextPage = () => {
		let { current } = this.state;
		if (current + 1 > this.totalPage) return;
		this.goPage((current += 1));
	};

	nextMore = () => {
		let { current } = this.state;
		if (this.totalPage - current > 5) {
			current += 5;
		} else {
			current = this.totalPage - 2;
		}
		this.setState({
			current
		});
		this.goPage(current);
	};

	preMore = () => {
		let { current } = this.state;
		if (current > 5) {
			current -= 5;
		} else {
			current = 3;
		}
		this.setState({
			current
		});
		this.goPage(current);
	};

	getJumper = () => {
		if (this.props.showQuickJumper) {
			return (
				<div className="quickJumper">
					跳转到
					<input
						type="text"
						onKeyPress={this.handlePage}
						onChange={this.changeInput}
						value={this.state.inputNum}
					/>
					页
				</div>
			);
		}
		return null;
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

	getSelectJumper = () => {
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
					inputNum: 1,
					current: 1
				});
				return;
			}
			if (inputPage > this.totalPage) {
				this.setState({
					inputNum: this.totalPage,
					current: this.totalPage
				});
				return;
			}

			this.goPage(inputPage);
		}
	};

	changeInput = event => {
		this.setState({
			inputNum: event.target.value
		});
	};

	render() {
		return (
			<div className="pagination">
				<ul>
					<li
						onClick={this.prevPage}
						role="presentation"
						className={this.state.current === 1 ? "nomore" : ""}
					>
						<Icon type="left" className="pg-icon"></Icon>
					</li>
					{this.getPages()}
					<li
						onClick={this.nextPage}
						role="presentation"
						className={
							this.state.current === this.totalPage
								? "nomore"
								: ""
						}
					>
						<Icon type="right" className="pg-icon"></Icon>
					</li>
				</ul>
				{this.getJumper()}
				{this.getSelectJumper()}
			</div>
		);
	}
}
