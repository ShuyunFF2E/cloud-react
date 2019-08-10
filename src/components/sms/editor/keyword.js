import React, { Component, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SmsContext from '../SmsContext';

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
    
    const { keywords } = useContext(SmsContext);

	const { contentWidth, handleClick } = props;

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
    const { keywords } = useContext(SmsContext);
    const { currentType, contentWidth, onInsertKeyword } = props;

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
			<Toggle contentWidth={contentWidth} handleClick={handleClick} />
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
						})} onClick={handleClick.bind(null, item)}>
						{ item }
						</span>
					)
				}
			</div>
	);
}

class Keyword extends Component {


	handleChangeType = type => {
		this.setState({
			currentType: type
		});
	}

	render() {
        const { keywords } = this.context;

        const _keywordTypes = initKeywords(keywords);
        const _currentType = _keywordTypes[0];
        
        this.state = {
            keywordTypes: _keywordTypes,
            currentType: _currentType
        };

        const { onInsertKeyword, contentWidth } = this.props;
        const { currentType, keywordTypes } = this.state;

		return (
			<div className="editor-keywords">
				<KeywordTypeSelector currentType={currentType} keywordTypes={keywordTypes} onChangeType={this.handleChangeType} />
				<Keywords currentType={currentType} onInsertKeyword={onInsertKeyword} contentWidth={contentWidth} />
			</div>
		);
	}
}

Keyword.contextType = SmsContext;

export default Keyword;

Keyword.propTypes = {
	contentWidth: PropTypes.number,
	onInsertKeyword: PropTypes.func
};

Keyword.defaultProps = {
	contentWidth: 200,
	onInsertKeyword: () => {}
};
