/**
 * 搜索
 * index.js
 * wangbo
 * 2019-07-02
 */

import React, { Component } from 'react';
import Input from "../../input";
import Icon from "../../icon";

class Search extends Component{
	constructor(props) {
		super(props);
		this.searchValue = '';
	}

	/**
	 * 输入搜索信息
	 * @param e
	 */
	handleSearch = e => {
		// 回车或鼠标点击则触发搜索
		if (e.keyCode === 13 || e.button === 0) {
			const { onSearchAction } = this.props;
			const searchText = this.searchValue.state.value;
			onSearchAction(searchText);
		}
	};

	render() {
		const { supportSearch, searchPlaceholder, searchMaxLength } = this.props;
		if (!supportSearch) {
			return null;
		}
		return(
			<div className='tree-search'>
				<Input suffix={<Icon type="search" onMouseDown={this.handleSearch}/>}
					   className='tree-search-input'
					   ref={(value) => {this.searchValue = value}}
					   onKeyDown={this.handleSearch}
					   maxLength={searchMaxLength}
					   placeholder={searchPlaceholder} />
			</div>
		);
	}
}

export default Search;
