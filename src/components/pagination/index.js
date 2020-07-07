import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop, prefixCls } from '@utils';

import Icon from '../icon';

import './index.less';

class Pagination extends Component {
	static propTypes = {
		current: PropTypes.number,
		pageSize: PropTypes.number,
		pageSizeOptions: PropTypes.array,
		total: PropTypes.number,
		onChange: PropTypes.func,
		showPageSizeOptions: PropTypes.bool,
		showQuickJumper: PropTypes.bool
	};

	static defaultProps = {
		current: 1,
		pageSize: 10,
		pageSizeOptions: [10, 20, 30, 40],
		total: 0,
		onChange: noop,
		showPageSizeOptions: false,
		showQuickJumper: false
	};

	constructor(props) {
		super(props);

		const { pageSize, current, showPageSizeOptions, pageSizeOptions } = props;

		this.state = {
			current,
			pageNum: current,
			pagesLength: 9
		};

		if (showPageSizeOptions) {
			if (pageSizeOptions.indexOf(pageSize) === -1) {
				pageSizeOptions.push(pageSize);
				pageSizeOptions.sort((a, b) => a - b);
			}
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

	/**
	 * 分页总数小于10
	 */
	renderLowerPagesLength = (current, pages) => {
		for (let i = 1; i <= this.totalPage; i += 1) {
			pages.push(
				<li role="presentation" onClick={() => this.goPage(i)} className={current === i ? 'active' : ''} key={i}>
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
				<li role="presentation" key={i} className={current === i ? 'active' : ''} onClick={() => this.goPage(i)}>
					{i}
				</li>
			);
		}

		pages.push(
			<li role="presentation" key="nextMore" className="ellips" onClick={this.nextMore}>
				<span className="dot" />
				<Icon type="double-right" className="moreIcon" onClick={this.nextMore} />
			</li>
		);
		pages.push(
			<li role="presentation" key={this.totalPage} onClick={() => this.goPage(this.totalPage)}>
				{this.totalPage}
			</li>
		);
	};

	/**
	 * 左边显示。。。
	 */
	renderLeftEllipsePages = (offset, pages, current) => {
		pages.push(
			<li role="presentation" key="1" onClick={() => this.goPage(1)}>
				1
			</li>
		);
		pages.push(
			<li role="presentation" key="preMore" className="ellips" onClick={this.preMore}>
				<span className="dot" />
				<Icon type="double-left" className="moreIcon" onClick={this.preMore} />
			</li>
		);

		for (let i = offset; i >= 1; i -= 1) {
			pages.push(
				<li
					role="presentation"
					key={this.totalPage - i}
					className={current === this.totalPage - i ? ' active' : ''}
					onClick={() => this.goPage(this.totalPage - i)}>
					{this.totalPage - i}
				</li>
			);
		}

		pages.push(
			<li role="presentation" key={this.totalPage} className={current === this.totalPage ? ' active' : ''} onClick={() => this.goPage(this.totalPage)}>
				{this.totalPage}
			</li>
		);
	};

	/**
	 * 左右两侧都显示。。。
	 */
	renderBothEllipsePages = (offset, pages, current) => {
		pages.push(
			<li role="presentation" key="1" onClick={() => this.goPage(1)}>
				1
			</li>
		);
		pages.push(
			<li key="preMore" className="ellips">
				<span className="dot" />
				<Icon type="double-left" className="moreIcon" onClick={this.preMore} />
			</li>
		);

		for (let i = offset / 2; i >= 0; i -= 1) {
			pages.push(
				<li role="presentation" key={current - i} className={current === current - i ? ' active' : ''} onClick={() => this.goPage(current - i)}>
					{current - i}
				</li>
			);
		}

		for (let j = 1; j <= offset / 2; j += 1) {
			pages.push(
				<li role="presentation" key={current + j} onClick={() => this.goPage(current + j)}>
					{current + j}
				</li>
			);
		}

		pages.push(
			<li key="nextMore" className="ellips">
				<span className="dot" />
				<Icon type="double-right" className="moreIcon" onClick={this.nextMore} />
			</li>
		);
		pages.push(
			<li role="presentation" key={this.totalPage} onClick={() => this.goPage(this.totalPage)}>
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
		this.props.onChange(current, this.props.pageSize);
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

		this.goPage(current);
	};

	preMore = () => {
		let { current } = this.state;
		if (current > 5) {
			current -= 5;
		} else {
			current = 3;
		}
		this.goPage(current);
	};

	getJumper = () => {
		if (this.props.showQuickJumper) {
			return (
				<div className="quickJumper">
					跳转到
					<input type="text" onKeyPress={this.handlePage} onChange={this.changeInput} value={this.state.pageNum} />页
				</div>
			);
		}
		return null;
	};

	selectPageSize = event => {
		this.props.onChange(1, parseInt(event.target.value, 10));
	};

	getSelectJumper = () => {
		const { showPageSizeOptions, pageSize } = this.props;
		const { pageSizeOptions } = this.state;

		if (showPageSizeOptions) {
			return (
				<div className="change-size">
					<select name="pSizeArea" value={pageSize.toString()} onChange={this.selectPageSize}>
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
			const { current } = this.props;
			let inputPage = event.target.value;

			if (!/^\d+$/.test(inputPage)) {
				this.setState({
					pageNum: current
				});
				return;
			}

			inputPage = parseInt(inputPage, 10);
			if ((inputPage < 1 && this.totalPage > 1) || inputPage > this.totalPage) {
				this.setState({
					pageNum: current
				});
				return;
			}

			this.goPage(inputPage);
		}
	};

	changeInput = event => {
		this.setState({
			pageNum: event.target.value
		});
	};

	render() {
		const classes = classNames(`${prefixCls}-pagination`);

		return (
			<div className={classes} style={this.props.style}>
				<ul>
					<li onClick={this.prevPage} role="presentation" className={this.props.current === 1 ? 'nomore' : ''}>
						<Icon type="left" className="pg-icon"></Icon>
					</li>
					{this.getPages()}
					<li onClick={this.nextPage} role="presentation" className={this.props.current === this.totalPage ? 'nomore' : ''}>
						<Icon type="right" className="pg-icon"></Icon>
					</li>
				</ul>
				{this.getJumper()}
				{this.getSelectJumper()}
			</div>
		);
	}
}

export default Pagination;
