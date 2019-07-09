import React, { Component } from 'react'
import Icon from 'ccms-components-react/icon';
import './index.less';


export default class PastVersion extends Component {
	constructor(props) {
		super(props);
		const { current, total, pageSize, pageSizeOptions, showPageSizeOptions } = props;
		this.state = {
			current,
			inputNum: current,
			pageSize,
			totalPage: Math.ceil(total / pageSize)
		}
		if (showPageSizeOptions) {
			this.state.total = Math.ceil(total / pageSizeOptions[0])
		}
	}

	showTotal = () => {
		return <span className="totals-count">
					共<span>{this.props.total}</span>条
    			</span>
	}

	showRefresh = () => {
		return <span className="refresh-action">
			<Icon className="shuyunicon" type='refresh'></Icon>
			<span className="refresh-label" onClick={ () => this.goPage(this.state.current)}>刷新</span>
		</span>
	}

	showPageSizeOptions = () => {
		return <div className="change-size">
			<select name="pSizeArea" onChange={this.selectPageSize}>
				{this.props.pageSizeOptions.map(item => {
					return <option value={item} key={item}>{item}</option>
				})}
			</select>
		</div>
	}

	goPage = (current) => {
		this.setState({
			current,
			inputNum: current
		})
		this.props.onChange(current)
		this.props.onShowSizeChange(this.state.pageSize)

	}

	prevPage = () => {
		let { current } = this.state;
		if (current - 1 === 0) {
			return
		}
		this.goPage(current -= 1);

	}

	nextPage = () => {
		let { current } = this.state;
		if (current + 1 > this.state.totalPage) {
			return
		}
		this.goPage(current += 1);
	}

	firstPage = () => {
		this.goPage(1);
	}

	lastPage = () => {
		this.goPage(this.state.totalPage);
	}

	handlePage = event => {
		if (event.nativeEvent.keyCode === 13) {
			const { current, totalPage } = this.state;
			let inputPage = event.target.value;

			if (!/^(\d)+$/.test(inputPage)) {
				this.setState({
					inputNum: current
				})
				return;
			}

			inputPage = parseInt(inputPage, 10);
			if (inputPage < 1 && totalPage > 1) {
				this.setState({
					current: 1,
					inputNum: 1
				})
				return;
			}
			if (inputPage > totalPage) {
				this.setState({
					current: totalPage,
					inputNum: totalPage
				})
				return;
			}
			this.goPage(inputPage);
		}
	}

	onChange = event => {
		this.setState({
			inputNum: event.target.value
		})
	}

	selectPageSize = (event) => {
		this.setState({
			pageSize: parseInt(event.target.value, 10),
			totalPage: Math.ceil(this.props.total / event.target.value)
		}, () => {
			this.goPage(1);
		})
	}

	render() {
		return (
			<div className="past">
				{this.props.showTotal ? this.showTotal() : null}
				{this.props.showRefresh ? this.showRefresh() : null}
				{this.props.showPageSizeOptions ? this.showPageSizeOptions() : null}
				<div className="ajax-page">
					<ul className="pagination">
						<li className={this.state.current === 1 ? 'disabled': '' }>
							<Icon className="shuyunicon" type="first-solid" onClick={() => this.firstPage()}></Icon>
						</li>
						<li className={this.state.current === 1 ? 'disabled' : ''}>
							<Icon className="shuyunicon" type="left-solid" onClick={() => this.prevPage()}></Icon>
						</li>
					</ul>
					<div className="goto-page">
						<input type="text" className="gp-input" value={this.state.inputNum} onChange={this.onChange} onKeyPress={this.handlePage}/>/共<span>{this.state.totalPage}</span>页
					</div>
					<ul className="pagination">
						<li className={this.state.current === this.state.totalPage ? 'disabled' : ''}>
							<Icon className="shuyunicon" type="right-solid" onClick={() => this.nextPage()}></Icon>
						</li>
						<li className={this.state.current === this.state.totalPage ? 'disabled' : ''}>
							<Icon className="shuyunicon" type="last-solid" onClick={() => this.lastPage()}></Icon>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}
