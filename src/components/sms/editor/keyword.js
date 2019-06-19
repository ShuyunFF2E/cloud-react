import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import './index.less';

function initKeywords(data) {

	return data.reduce((types, item) => {

		const { type } = item;

		if (type && types.indexOf(type) === -1) {
			types.push(type);
		}

		return types;

	}, []);
}

// 变量过多展示下拉显示更多箭头
const Toggle = (props) => {

	const { keywords, contentWidth, handleClick } = props;

	const HASH_WIDTH = 7;
	const PADDING = 20;
	const MARGIN = 5;
	const ARROW_PADDING = 45;

	const keywordLength = keywords.reduce((result, keyword) => {
		return result + keyword.text.length * 12 + HASH_WIDTH + PADDING + MARGIN;
	}, 0);

	const isShow = keywordLength > contentWidth - ARROW_PADDING;

	return isShow && <span className="editor-keywords-toggle" onClick={handleClick}></span>;
}

// 当前平台下的关键字
const Keywords = (props) => {

	const [isShowAll, setIsShowAll] = useState(false);
	const { currentType, keywords, contentWidth, onInsertKeyword } = props;

	const data = keywords.filter(item => item.type === currentType);

	function handleClick() {
		setIsShowAll(!isShowAll);
	}

	function handleInsertKeyword(item) {
		if (item.disabled) return;
		onInsertKeyword(item);
	}

	return (
		<div className="editor-keywords-wrapper">
			<ul className={ classNames('editor-keywords-list', { 'expanded': isShowAll }) }>
				{
					data.map(item =>
						<li role="presentation" className={classNames('editor-keywords-item', { 'disabled': item.disabled })} key={item.name} onClick={handleInsertKeyword.bind(null, item)}>
							#{item.text}
						</li>
					)
				}
			</ul>
			<Toggle contentWidth={contentWidth} keywords={data} handleClick={handleClick}/>
		</div>
	);
}

// 平台类型选择，如果只有一个平台的话则不显示切换平台的选项
const KeywordTypeSelector = (props) => {

	const { currentType, keywordTypes, onChangeType } = props;

	function handleClick(type) {
		onChangeType(type);
	}

	return (

		keywordTypes.length > 1 &&
			<div>
				{
					keywordTypes.map(item =>
						<span key={item} className={classNames('editor-keywords-type', {
							'active': item === currentType
						})} onClick={handleClick.bind(null, item)} onKeyUp={() => {}}>
						{ item }
						</span>
					)
				}
			</div>
	);
}

export default class Keyword extends Component {

	constructor(props) {

		super(props);

		const { keywords } = this.props;

		const keywordTypes = initKeywords(keywords);
		const currentType = keywordTypes[0];

		this.state = {
			currentType,
			keywordTypes,
			keywords
		};

	}

	handleChangeType = type => {
		this.setState({
			currentType: type
		});
	}

	render() {

		const { currentType, keywordTypes, keywords } = this.state;
		const { onInsertKeyword, contentWidth } = this.props;

		return (
			<div className="editor-keywords">
				<KeywordTypeSelector currentType={currentType} keywordTypes={keywordTypes} onChangeType={this.handleChangeType} />
				<Keywords currentType={currentType} keywords={keywords} onInsertKeyword={onInsertKeyword} contentWidth={contentWidth} />
			</div>
		);
	}
}

Keyword.propTypes = {
	keywords: PropTypes.array,
	contentWidth: PropTypes.number,
	onInsertKeyword: PropTypes.func
};

Keyword.defaultProps = {
	keywords: [],
	contentWidth: 200,
	onInsertKeyword: () => {}
};
