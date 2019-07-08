import React, { Component } from 'react';
import Icon from 'ccms-components-react/icon';

import './index.less';

export default class NewVision extends Component {
	constructor(props) {
		super(props);
		this.inputPages = React.createRef()
		const { total, pageSize, current, showPageSizeOptions, pageSizeOptions } = props;
		if (showPageSizeOptions) {
			this.state = {
				current,
				pagesLength: 9,
				totalPage: Math.ceil(total / pageSizeOptions[0])
			}
		} else {
			this.state = {
				current,
				pagesLength: 9,
				totalPage: Math.ceil(total / pageSize)
			}
		}
	}

	getPages = () => {
		const { current, totalPage } = this.state;
		const pages = []
		if (totalPage <= this.state.pagesLength){
			for (let i = 1; i <= totalPage; i += 1) {
				pages.push(<li role="presentation" onClick={() => this.goPage(i)} className={current === i ? "active" : ""} key={i}>{i}</li>)
			}
		} else {
			const offset = (this.state.pagesLength - 1) / 2;
			// 右边有。。。
			if (this.state.current <= offset) {
				for (let i = 1; i <= offset + 1; i+=1) {
					pages.push(<li role="presentation" key={i} className={current === i ? "active" : ""} onClick={() => this.goPage(i)}>{i}</li>);
				}
				pages.push(<li key="nextMore" className="ellips" ><span className="dot"></span><Icon type="doubleRight" className="moreIcon" onClick={ () => this.nextMore()}></Icon></li>);
				pages.push(<li role="presentation"  key={totalPage} className={current === totalPage ? "active" : ""} onClick={() => this.goPage(totalPage)}>{totalPage}</li>);
			} else if (this.state.current > totalPage - offset) {
			// 左边有。。。
				pages.push(<li role="presentation" key="1" className={current === 1 ? " active" : ""} onClick={() => this.goPage(1)}>1</li>);
				pages.push(<li key="preMore" className="ellips"><span className="dot"></span><Icon type="doubleLeft" className="moreIcon" onClick={() => this.preMore()}></Icon></li>);
				for (let i = offset; i >= 1; i-=1) {
					pages.push(<li role="presentation" key={totalPage - i} className={current === totalPage - i ? " active" : ""} onClick={() => this.goPage(totalPage - i)}>{totalPage - i}</li>);
				}
				pages.push(<li role="presentation" key={totalPage} className={current === totalPage ? " active" : ""} onClick={() => this.goPage(totalPage)}>{totalPage}</li>);
			} else {
			// 两边都有。。。
				pages.push(<li role="presentation" key="1" className={current === 1 ? " active" : ""} onClick={() => this.goPage(1)}>1</li>);
				pages.push(<li key="preMore" className="ellips"><span className="dot"></span><Icon type="doubleLeft" className="moreIcon" onClick={() => this.preMore()}></Icon></li>);
				for (let i = offset / 2; i >= 0; i-=1) {
					pages.push(<li role="presentation" key={current - i} className={current === current - i ? " active" : ""} onClick={() => this.goPage(current - i)}>{current - i}</li>);
				}
				for (let j = 1; j <= offset / 2; j+=1) {
					pages.push(<li role="presentation" key={current + j} className={current === current + j ? " active" : ""} onClick={() => this.goPage(current + j)}>{current + j}</li>);
				}
				pages.push(<li key="nextMore" className="ellips" ><span className="dot"></span><Icon type="doubleRight" className="moreIcon" onClick={() => this.nextMore()}></Icon></li>);
				pages.push(<li role="presentation" key={totalPage} className={current === totalPage ? "active" : ""} onClick={() => this.goPage(totalPage)}>{totalPage}</li>);
			}
		}
		return pages
	}

	goPage = (current) => {
		this.setState({
			current
		})
		if (this.props.showQuickJumper) {
			this.inputPages.current.value = current;
		}
		this.props.onChange(current)
		this.props.onShowSizeChange(this.state.pageSize)
	}

	prevPage = () => {
		let { current } = this.state;
		if (current - 1 === 0) {
			return
		}
		this.goPage(current-=1);
	}

	nextPage = () => {
		let  { current } = this.state;
		if (current + 1 > this.state.totalPage) {
			return
		}
		this.goPage(current += 1);
	}

	nextMore = () => {
		let { current } = this.state;
		if (this.state.totalPage - current > 5) {
			current += 5;
		} else {
			current = this.state.totalPage - 2;
		}
		this.setState({
			current
		})
		this.goPage(current)
	}

	preMore = ()=> {
		let  { current } = this.state;
		if (current > 5) {
			current -= 5;
		} else {
			current = 3;
		}
		this.setState({
			current
		})
		this.goPage(current)
	};

	getJumper = () => {
		if (this.props.showQuickJumper) {
			return <div className="quickJumper">跳转到<input type="text" onKeyPress={this.handlePage} ref={this.inputPages} defaultValue={this.state.current}/>页</div>
		}
		return null;
	}

	selectPageSize = (event) => {
		this.setState({
			pageSize: parseInt(event.target.value, 10),
			totalPage: Math.ceil(this.props.total / event.target.value)
		}, () => {
			this.goPage(1);
		})
	}

	getSelectJumper = () => {
		if (this.props.showPageSizeOptions) {
			return <div className="change-size">
				<select name="pSizeArea" onChange={this.selectPageSize}>
					{this.props.pageSizeOptions.map(item => {
						return <option value={item} key={item}>{item}</option>
					})}
				</select>
			</div>
		}
		return null;
	}

	handlePage = (event) => {
		if (event.nativeEvent.keyCode === 13) {
			const { current, totalPage } = this.state;
			let inputPage = this.inputPages.current.value;

			if (!/^(\d)+$/.test(inputPage)) {
				this.inputPages.current.value = current;
				return;
			}

			inputPage = parseInt(inputPage, 10);
			if (inputPage < 1 && totalPage > 1) {
				this.inputPages.current.value = 1;
				return;
			}
			if (inputPage > totalPage) {
				this.inputPages.current.value = totalPage;
				return;
			}
			if (inputPage === current) {
				return;
			}
			this.goPage(inputPage);
		}
	}


	render() {
		return (
			<div className="now">
				<ul>
					<li onClick={this.prevPage} role="presentation" className={this.state.current === 1 ? 'nomore' : ''}><Icon type="left" className="pg-icon"></Icon></li>
					{this.getPages()}
					<li onClick={this.nextPage} role="presentation" className={this.state.current === this.state.totalPage ? 'nomore' : ''}><Icon type="right" className="pg-icon"></Icon></li>
				</ul>
				{this.getJumper()}
				{this.getSelectJumper()}
			</div>
		)
	}
}
