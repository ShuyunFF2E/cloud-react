import React, { Component } from 'react';
import classNames from 'classnames';
import Input from '../input';
import Icon from '../icon';

class Search extends Component{

	handleSearch = e => {
		const { supportImmediatelySearch, onSearchAction } = this.props;
		// 回车或实时触发搜索
		if (e.keyCode === 13 || supportImmediatelySearch) {
			onSearchAction(e.target.value);
		}
	};

	render() {
		const { supportSearch, searchPlaceholder, searchMaxLength, prefixCls } = this.props;
		return(
			supportSearch && <div className={classNames(`${prefixCls}-search`)}>
				<Input suffix={<Icon type="search"/>}
					   className={classNames(`${prefixCls}-search-input`)}
					   onEnter={this.handleSearch}
					   onChange={this.handleSearch}
					   maxLength={searchMaxLength}
					   placeholder={searchPlaceholder} />
			</div>
		);
	}
}

export default Search;
