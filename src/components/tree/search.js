import React, { Component } from 'react';
import classNames from 'classnames';
import Input from '../input';
import Icon from '../icon';

class Search extends Component{

	handleSearch = e => {
		// 回车或鼠标点击则触发搜索
		if (e.keyCode === 13 || e.button === 0) {
			const { onSearchAction } = this.props;
			const searchText = this.searchInputRef.state.value;
			onSearchAction(searchText);
		}
	};

	render() {

		const { supportSearch, searchPlaceholder, searchMaxLength, prefixCls } = this.props;

		return(
			supportSearch && <div className={classNames(`${prefixCls}-search`)}>
				<Input suffix={<Icon type="search" onMouseDown={this.handleSearch}/>}
					   className={classNames(`${prefixCls}-search-input`)}
					   ref={(value) => {this.searchInputRef = value}}
					   onKeyDown={this.handleSearch}
					   maxLength={searchMaxLength}
					   placeholder={searchPlaceholder} />
			</div>
		);
	}
}

export default Search;
