import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';

import { convertContent, createTagPreview, getVariableReg, keywordTextNameConvert, parseTag, formatContent, parseHTML } from './common/utils';
import { DEFAULT_TYPE_NAME, HTML_ENTITY_CODE, KEYWORD_SIGN, REG_URL_HASH } from './common/constant';

import Preview from './preview';
import Editor from './editor';

export default class Sms extends Component {

	static Editor = ({ ...props }) => <Editor ref={props.editorRef} {...props} />;

	static Preview = ({ ...props }) => <Preview {...props}/>;

	constructor(props) {

		super(props);

		this.tempRef = React.createRef();

		this.editorRef = React.createRef();

		// 考虑到后期对外提供 keyword 前后缀，因此统一处理下
		this.keywordPrefix = KEYWORD_SIGN;
		this.keywordSuffix = KEYWORD_SIGN;

		const { content, keywords, isTrimSpace } = this.props;
		let smsContent = '';

		if (content) {
			const parseTagResult = parseTag(convertContent(content, isTrimSpace), this.keywordPrefix, this.keywordSuffix, keywords);
			smsContent = formatContent(parseTagResult);
		}

		this.state = {
			editorText: '',
			previewText: '',
			smsContent
		};
	}

	componentDidMount() {
		const { smsContent } = this.state;
		this.handleContent(smsContent);
	}

	handleContent = content => {

		const text = parseHTML(content);

		const editorText = this.getEditorText(text);
		const previewText = this.getPreviewText(text);

		this.setState({
			editorText,
			previewText
		});

		// 改变父 text 值
		this.props.onContentChange(editorText);
	}

	getEditorText = text => {

		const { isTrimSpace, keywords } = this.props;
		const inputReg = getVariableReg();

		let data = text
			.replace(inputReg, (result, $1, $2) => {
				if ($1 === DEFAULT_TYPE_NAME) {
					return `${this.keywordPrefix}_${keywordTextNameConvert($2, true, keywords)}_${this.keywordSuffix}`;
				}
				return `${this.keywordPrefix}_[${$1}]${keywordTextNameConvert($2, true, keywords)}_${this.keywordSuffix}`;
			})
			.replace(/<[^>]+>/g, '')
			.replace(/(&nbsp;)|(&lt;)|(&gt;)|(&amp;)/g, result => {
				return HTML_ENTITY_CODE[result];
			});

		if (isTrimSpace) {
			data = data.trim();
		}

		return data;
	}


	getPreviewText = (text) => {

		const { isTrimSpace, keywords } = this.props;

		const inputReg = getVariableReg();

		this.tempRef.current.innerHTML = text
			.replace(inputReg, (result, $1, $2) => {
				return createTagPreview(keywords, $2, $1);
			});

		// 关键字高亮, URL, 手机及固话号码下划线
		return convertContent(this.tempRef.current.textContent, isTrimSpace)
			.replace(/œ([^œ]+)œ/g, (result, $1) => {
				return `<span class="preview-content-tag">${$1.trim()}</span>`;
			})
			.replace(REG_URL_HASH, result => {
				return `<a href="javascript: void(0);">${result.slice(0, result.length - 1)}</a>#`;
			})
			.replace(/(\D|\b)(1[3-9]\d-?\d{4}-?\d{4})(\D|\b)/g, (match, p1, p2, p3) => {
				return `${p1}<a href="javascript: void(0);">${p2}</a>${p3}`;
			})
			.replace(/(\D)((?:[08][1-9]\d{1,2}-?)?[2-9]\d{6,7})(\D)/g, (match, p1, p2, p3) => {
				return `${p1}<a href="javascript: void(0);">${p2}</a>${p3}`;
			});
	}

	insertText(text) {
		this.editorRef.current.handleInsertText(text);
	}

	insertKeyword(keyword) {
		this.editorRef.current.handleInsertKeyword(keyword);
	}

	render() {

		const { smsContent, editorText, previewText } = this.state;
		const { keywords, isTrimSpace } = this.props;

		return (
			<>
				{
					Children.map(this.props.children, child => {

						if (child.type.prototype === Sms.Editor.prototype) {
							return cloneElement(child, {
								smsContent,
								editorText,
								keywords,
								editorRef: this.editorRef,
								onContentChanged: this.handleContent
							});
						}

						if (child.type.prototype === Sms.Preview.prototype) {
							return React.cloneElement(child, {
								editorText,
								previewText,
								isTrimSpace
							});
						}

						return child;
					})
				}
				<div ref={this.tempRef} style={{ display: 'none' }}></div>
			</>
		);
	}
}

Sms.propTypes = {
	content: PropTypes.string,
	keywords: PropTypes.array,
	isTrimSpace: PropTypes.bool,
	onContentChange: PropTypes.func
};

Sms.defaultProps = {
	content: '',
	keywords: [],
	isTrimSpace: false,
	onContentChange: () => {}
};
